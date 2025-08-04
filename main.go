package main

// =^_^=

import (
	"go.nirbar.in/nala/internal/db"
	"go.nirbar.in/nala/internal/ui"
)

func main() {
	db.InitDB()
	ui.Chat()
}
