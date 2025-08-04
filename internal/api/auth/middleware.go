package auth

import (
	"net/http"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"go.nirbar.in/nala/internal/api/db"
)

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var token string

		authHeader := c.Request().Header.Get("Authorization")
		if strings.HasPrefix(authHeader, "Bearer ") {
			token = strings.TrimPrefix(authHeader, "Bearer ")
		} else {
			cookie, err := c.Cookie("session")
			if err != nil || cookie.Value == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "missing token")
			}
			token = cookie.Value
		}

		var session db.Session
		if err := db.DB.Preload("User").Where("session_token = ?", token).First(&session).Error; err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "invalid session")
		}

		if session.TokenExpiresAt.Before(time.Now()) {
			return echo.NewHTTPError(http.StatusUnauthorized, "session expired")
		}

		session.LastUsedAt = time.Now()
		db.DB.Save(&session)

		c.Set("user", session.User)
		return next(c)
	}
}
