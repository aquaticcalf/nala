package echo

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"go.nirbar.in/nala/internal/api/auth"
	"go.nirbar.in/nala/internal/api/db"
	"go.nirbar.in/nala/internal/api/env"
	"golang.org/x/oauth2"
)

func RegisterAuthRoutes(e *echo.Echo) {
	e.GET("/login", func(c echo.Context) error {
		url := auth.GitHubOAuthConfig.AuthCodeURL("state", oauth2.AccessTypeOffline)
		return c.Redirect(http.StatusTemporaryRedirect, url)
	})

	e.GET("/callback", func(c echo.Context) error {
		code := c.QueryParam("code")
		if code == "" {
			return echo.NewHTTPError(http.StatusBadRequest, "code not found in callback")
		}

		sessionToken, err := auth.HandleGitHubCallback(c.Request().Context(), code)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}

		c.SetCookie(&http.Cookie{
			Name:     "session",
			Value:    sessionToken,
			Path:     "/",
			HttpOnly: true,
			Secure:   env.ENV == "prod",
			SameSite: http.SameSiteLaxMode,
			Expires:  time.Now().Add(30 * 24 * time.Hour),
		})

		return c.Redirect(http.StatusTemporaryRedirect, "/")
	})

	e.GET("/me", func(c echo.Context) error {
		_, err := c.Cookie("session")
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "no session cookie")
		}
		user := c.Get("user")
		if user == nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "user not found in context")
		}
		return c.JSON(http.StatusOK, user)
	}, auth.AuthMiddleware)

	e.GET("/logout", func(c echo.Context) error {
		cookie, err := c.Cookie("session")
		if err == nil && cookie.Value != "" {
			db.DB.Where("session_token = ?", cookie.Value).Delete(&db.Session{})
		}

		c.SetCookie(&http.Cookie{
			Name:     "session",
			Value:    "",
			Path:     "/",
			HttpOnly: true,
			Secure:   env.ENV == "prod",
			SameSite: http.SameSiteLaxMode,
			MaxAge:   -1,
		})

		return c.Redirect(http.StatusTemporaryRedirect, "/")
	})
}
