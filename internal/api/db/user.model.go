package db

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	GithubID       int64  `gorm:"uniqueIndex"`
	Username       string `gorm:"uniqueIndex"`
	Name           string
	Email          string
	AvatarURL      string
	GithubURL      string
	AccessToken    string `gorm:"-"` // not stored in db, transient field
	RefreshToken   *string
	TokenExpiresAt *time.Time
}

func FindUserByGithubID(githubID int64) (*User, error) {
	var user User
	result := DB.Where("github_id = ?", githubID).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

func FindUserByUsername(username string) (*User, error) {
	var user User
	result := DB.Where("username = ?", username).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

func CreateOrUpdateUser(user *User) error {
	var existing User
	result := DB.Where("github_id = ?", user.GithubID).First(&existing)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return DB.Create(user).Error
	}

	user.ID = existing.ID
	return DB.Save(user).Error
}
