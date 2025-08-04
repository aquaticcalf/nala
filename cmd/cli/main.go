package main

// =^_^=

import (
	"go.nirbar.in/nala/internal/cli/db"
	"go.nirbar.in/nala/internal/cli/ui"
)

func main() {
	db.InitDB()
	ui.Chat()
}
