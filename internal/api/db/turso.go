package db

import (
	"log"
	"os"
	"path/filepath"

	_ "github.com/joho/godotenv/autoload"
	"go.nirbar.in/nala/internal/api/env"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var dsn string

	if env.ENV == "prod" {
		dsn = env.DB
	} else {
		homeDir, err := os.UserHomeDir()
		if err != nil {
			log.Fatal("failed to get user home dir :", err)
		}

		dbDir := filepath.Join(homeDir, ".nirbar/.nala")
		dbPath := filepath.Join(dbDir, "nala.db")

		if err := os.MkdirAll(dbDir, 0755); err != nil {
			log.Fatal("failed to create db directory :", err)
		}

		dsn = "file:" + dbPath
	}

	var err error

	DB, err = gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect to database :", err)
	}

	if err := DB.AutoMigrate(&User{}, &Session{}); err != nil {
		log.Fatal("failed to migrate schema :", err)
	}
}
