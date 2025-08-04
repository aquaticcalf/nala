package main

import (
	"go.nirbar.in/nala/internal/api/db"
	"go.nirbar.in/nala/internal/api/echo"
)

func main() {
	db.InitDB()
	e := echo.New()
	echo.Run(e)
}
