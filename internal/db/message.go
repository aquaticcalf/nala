package db

import (
	"errors"

	"gorm.io/gorm"
)

func CreateMessage(message *Message) error {
	result := DB.Create(message)
	return result.Error
}

func GetMessage(id uint) (*Message, error) {
	var message Message
	result := DB.First(&message, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("message not found")
		}
		return nil, result.Error
	}
	return &message, nil
}

func GetMessageWithTool(id uint) (*Message, error) {
	var message Message
	result := DB.Preload("ToolCall").First(&message, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("message not found")
		}
		return nil, result.Error
	}
	return &message, nil
}

func GetMessagesBySessionID(sessionID uint) ([]Message, error) {
	var messages []Message
	result := DB.Where("session_id = ?", sessionID).Find(&messages)
	if result.Error != nil {
		return nil, result.Error
	}
	return messages, nil
}

func GetMessagesBySessionIDWithTools(sessionID uint) ([]Message, error) {
	var messages []Message
	result := DB.Where("session_id = ?", sessionID).Preload("ToolCall").Find(&messages)
	if result.Error != nil {
		return nil, result.Error
	}
	return messages, nil
}

func UpdateMessage(message *Message) error {
	result := DB.Save(message)
	return result.Error
}

func DeleteMessage(id uint) error {
	result := DB.Delete(&Message{}, id)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return errors.New("message not found")
	}
	return nil
}

func DeleteMessagesBySessionID(sessionID uint) error {
	result := DB.Where("session_id = ?", sessionID).Delete(&Message{})
	return result.Error
}
