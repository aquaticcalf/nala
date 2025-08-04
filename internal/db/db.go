package db

import (
	"errors"
	"log"
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

type Session struct {
	gorm.Model
	Messages []Message `gorm:"constraint:OnDelete:CASCADE"`
}

type Message struct {
	gorm.Model
	Author  string
	Content string

	IsToolCall bool `gorm:"check:is_tool_call IN (0, 1)"`
	ToolCallID *uint
	ToolCall   *Tool `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`

	SessionID uint
	Session   *Session
}

type Tool struct {
	gorm.Model
	Name   string
	Input  *string
	Output *string
}

func (m *Message) BeforeSave(tx *gorm.DB) error {
	if m.IsToolCall && m.ToolCallID == nil {
		return errors.New("ToolCallID required when IsToolCall is true")
	}
	if !m.IsToolCall && m.ToolCallID != nil {
		return errors.New("ToolCallID must be nil when IsToolCall is false")
	}
	return nil
}

func InitDB() {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatal("failed to get user home dir: ", err)
	}

	dbDir := homeDir + "/.nala"
	dbPath := dbDir + "/nala.db"

	if err := os.MkdirAll(dbDir, 0755); err != nil {
		log.Fatal("failed to create db directory: ", err)
	}

	_, statErr := os.Stat(dbPath)
	dbExists := !os.IsNotExist(statErr)

	DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database: ", err)
	}

	if !dbExists {
		err = DB.AutoMigrate(&Tool{}, &Session{}, &Message{})
		if err != nil {
			log.Fatal("failed to migrate database: ", err)
		}
	} else {
		log.Println("database already exists, skipping migration")
	}
}
