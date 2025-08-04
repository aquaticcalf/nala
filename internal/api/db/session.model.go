package db

import (
	"time"

	"gorm.io/gorm"
)

type Session struct {
	gorm.Model
	UserID         uint   `gorm:"index"`
	SessionToken   string `gorm:"uniqueIndex"`
	AccessToken    string
	RefreshToken   *string
	TokenExpiresAt *time.Time
	LastUsedAt     time.Time
	User           User `gorm:"foreignKey:UserID"`
}

func FindSessionByToken(token string) (*Session, error) {
	var session Session
	if err := DB.Where("session_token = ?", token).First(&session).Error; err != nil {
		return nil, err
	}
	return &session, nil
}

func DeleteExpiredSessions() error {
	return DB.Where("token_expires_at <= ?", time.Now()).Delete(&Session{}).Error
}
