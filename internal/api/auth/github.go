package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"go.nirbar.in/nala/internal/api/db"
	"go.nirbar.in/nala/internal/api/env"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

var GitHubOAuthConfig = &oauth2.Config{
	ClientID:     env.GitHubClientID,
	ClientSecret: env.GitHubClientSecret,
	Scopes:       []string{"read:user", "user:email"},
	Endpoint:     github.Endpoint,
	RedirectURL:  env.GitHubRedirectURL,
}

type GitHubUser struct {
	ID        int64  `json:"id"`
	Login     string `json:"login"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	AvatarURL string `json:"avatar_url"`
	HTMLURL   string `json:"html_url"`
}

func HandleGitHubCallback(ctx context.Context, code string) (string, error) {
	token, err := GitHubOAuthConfig.Exchange(ctx, code)
	if err != nil {
		return "", fmt.Errorf("token exchange failed : %w", err)
	}

	client := GitHubOAuthConfig.Client(ctx, token)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		return "", fmt.Errorf("GitHub user fetch failed : %w", err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var gh GitHubUser
	if err := json.Unmarshal(body, &gh); err != nil {
		return "", fmt.Errorf("invalid user response : %w", err)
	}

	if gh.Email == "" {
		gh.Email = fetchPrimaryEmail(client)
	}

	user := &db.User{
		GithubID:       gh.ID,
		Username:       gh.Login,
		Name:           gh.Name,
		Email:          gh.Email,
		AvatarURL:      gh.AvatarURL,
		GithubURL:      gh.HTMLURL,
		RefreshToken:   &token.RefreshToken,
		TokenExpiresAt: &token.Expiry,
	}
	if err := db.CreateOrUpdateUser(user); err != nil {
		return "", err
	}

	session := &db.Session{
		UserID:         user.ID,
		SessionToken:   generateSessionToken(),
		AccessToken:    token.AccessToken,
		RefreshToken:   &token.RefreshToken,
		TokenExpiresAt: &token.Expiry,
		LastUsedAt:     time.Now(),
	}
	if err := db.DB.Create(session).Error; err != nil {
		return "", err
	}

	return session.SessionToken, nil
}

func fetchPrimaryEmail(client *http.Client) string {
	resp, _ := client.Get("https://api.github.com/user/emails")
	defer resp.Body.Close()

	var emails []struct {
		Email    string `json:"email"`
		Primary  bool   `json:"primary"`
		Verified bool   `json:"verified"`
	}
	_ = json.NewDecoder(resp.Body).Decode(&emails)
	for _, e := range emails {
		if e.Primary && e.Verified {
			return e.Email
		}
	}
	if len(emails) > 0 {
		return emails[0].Email
	}
	return ""
}
