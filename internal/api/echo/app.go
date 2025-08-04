package echo

import (
	"fmt"
	"log"

	"github.com/labstack/echo/v4"
	"go.nirbar.in/nala/internal/api/env"
)

func New() *echo.Echo {
	e := echo.New()

	RegisterAuthRoutes(e)

	return e
}

func Run(e *echo.Echo) {
	port := env.Port
	if port == "" {
		port = "3000"
	}
	address := fmt.Sprintf(":%s", port)

	log.Printf("starting server on %s", address)
	if err := e.Start(address); err != nil {
		log.Fatalf("failed to start server : %v", err)
	}
}
