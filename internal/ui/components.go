package ui

import (
	"fmt"
	"os"
	"strings"

	"github.com/charmbracelet/bubbles/textarea"
	"github.com/charmbracelet/bubbles/viewport"
	"github.com/charmbracelet/lipgloss"
	"go.nirbar.in/nala/internal/db"
	"golang.org/x/term"
)

func getTerminalSize() (int, int) {
	termWidth := 80
	termHeight := 24

	if w, h, err := term.GetSize(int(os.Stdout.Fd())); err == nil {
		termWidth = w
		termHeight = h
	}

	return termWidth, termHeight
}

func initTextArea(termWidth int) textarea.Model {
	ta := textarea.New()
	ta.Placeholder = "talk with nala"
	ta.Focus()
	ta.CharLimit = 280
	ta.SetWidth(termWidth)
	ta.SetHeight(3)
	ta.Prompt = ""

	ta.FocusedStyle.Base = ta.FocusedStyle.Base.
		BorderStyle(lipgloss.NormalBorder()).
		BorderForeground(lipgloss.Color("240")).
		Padding(0, 1)

	ta.FocusedStyle.CursorLine = lipgloss.NewStyle()
	ta.ShowLineNumbers = false

	ta.KeyMap.InsertNewline.SetEnabled(false)

	return ta
}

func initViewport(termWidth, termHeight, textareaHeight int) viewport.Model {
	vp := viewport.New(termWidth, termHeight-textareaHeight-lipgloss.Height(gap))
	vp.Style = lipgloss.NewStyle().
		BorderStyle(lipgloss.NormalBorder()).
		BorderForeground(lipgloss.Color("241")).
		Padding(1, 2)

	return vp
}

func setupInitialContent(vp *viewport.Model, nalaLabelStyle, badgeStyle lipgloss.Style, termWidth int, session *db.Session) []string {
	welcomeMsg := nalaLabelStyle.Render("nala") + " " + "hello! i'm Nala and i love to chat"

	var sessionMsg string
	if session != nil {
		sessionMsg = badgeStyle.Render(fmt.Sprintf("session id: %d", session.ID))
	}

	var initialMessages []string
	if sessionMsg != "" {
		initialMessages = append(initialMessages, sessionMsg)
	}
	initialMessages = append(initialMessages, welcomeMsg)

	initialContent := lipgloss.NewStyle().Width(termWidth).Render(strings.Join(initialMessages, gap))
	vp.SetContent(initialContent)
	if session != nil {
		dbMessage := &db.Message{
			Author:    "nala",
			Content:   "hello! i'm Nala and i love to chat",
			SessionID: session.ID,
		}
		db.CreateMessage(dbMessage)
	}

	return initialMessages
}
