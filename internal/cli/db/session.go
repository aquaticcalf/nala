package db

import (
	"errors"

	"gorm.io/gorm"
)

func CreateSession() (*Session, error) {
	session := &Session{}
	result := DB.Create(session)
	if result.Error != nil {
		return nil, result.Error
	}
	return session, nil
}

func GetSession(id uint) (*Session, error) {
	var session Session
	result := DB.First(&session, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("session not found")
		}
		return nil, result.Error
	}
	return &session, nil
}

func GetSessionWithMessages(id uint) (*Session, error) {
	var session Session
	result := DB.Preload("Messages").First(&session, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("session not found")
		}
		return nil, result.Error
	}
	return &session, nil
}

func GetAllSessions() ([]Session, error) {
	var sessions []Session
	result := DB.Find(&sessions)
	if result.Error != nil {
		return nil, result.Error
	}
	return sessions, nil
}

func UpdateSession(session *Session) error {
	result := DB.Save(session)
	return result.Error
}

func DeleteSession(id uint) error {
	result := DB.Delete(&Session{}, id)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return errors.New("session not found")
	}
	return nil
}
