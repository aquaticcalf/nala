package env

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
)

var (
	ENV = os.Getenv("ENV")

	GitHubClientID     = os.Getenv("GITHUB_CLIENT_ID")
	GitHubClientSecret = os.Getenv("GITHUB_CLIENT_SECRET")
	GitHubRedirectURL  = os.Getenv("GITHUB_REDIRECT_URL")

	DB = os.Getenv("DB")

	Port = os.Getenv("PORT")
)
