package db

import (
	"errors"

	"gorm.io/gorm"
)

func CreateTool(tool *Tool) error {
	result := DB.Create(tool)
	return result.Error
}

func GetTool(id uint) (*Tool, error) {
	var tool Tool
	result := DB.First(&tool, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("tool not found")
		}
		return nil, result.Error
	}
	return &tool, nil
}

func GetToolByName(name string) (*Tool, error) {
	var tool Tool
	result := DB.Where("name = ?", name).First(&tool)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("tool not found")
		}
		return nil, result.Error
	}
	return &tool, nil
}

func GetAllTools() ([]Tool, error) {
	var tools []Tool
	result := DB.Find(&tools)
	if result.Error != nil {
		return nil, result.Error
	}
	return tools, nil
}

func UpdateTool(tool *Tool) error {
	result := DB.Save(tool)
	return result.Error
}

func DeleteTool(id uint) error {
	var count int64
	DB.Model(&Message{}).Where("tool_call_id = ?", id).Count(&count)
	if count > 0 {
		return errors.New("cannot delete tool with existing message references")
	}

	result := DB.Delete(&Tool{}, id)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return errors.New("tool not found")
	}
	return nil
}
