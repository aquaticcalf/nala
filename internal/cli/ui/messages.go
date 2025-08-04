package ui

import (
	"strings"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"go.nirbar.in/nala/internal/cli/db"
)

func updateMessages(m *model) {
	if len(m.messages) == 0 {
		welcomeMsg := m.nalaLabelStyle.Render("nala") + " " + "hello! i'm nala and i love to chat"
		m.messages = append(m.messages, welcomeMsg)
	}

	atBottom := m.viewport.AtBottom()

	m.viewport.SetContent(lipgloss.NewStyle().Width(m.viewport.Width).Render(strings.Join(m.messages, gap)))

	if atBottom {
		m.viewport.GotoBottom()
	}
}

func processInputMessage(m *model, input string) tea.Cmd {
	if input != "" {
		if len(m.history) == 0 || m.history[len(m.history)-1] != input {
			m.history = append(m.history, input)
		}
	}
	m.historyIndex = -1
	m.draft = ""

	var asyncCmd tea.Cmd

	switch {
	case strings.HasPrefix(input, "/nala "):
		text := strings.TrimPrefix(input, "/nala ")
		nalaMsg := m.callNala(text)
		m.messages = append(m.messages, nalaMsg)

		if m.currentSession != nil {
			dbMessage := &db.Message{
				Author:    "nala",
				Content:   text,
				SessionID: m.currentSession.ID,
			}
			db.CreateMessage(dbMessage)
		}

	case strings.HasPrefix(input, "/error "):
		text := strings.TrimPrefix(input, "/error ")
		errorMsg := m.callError(text)
		m.messages = append(m.messages, errorMsg)

		if m.currentSession != nil {
			dbMessage := &db.Message{
				Author:    "error",
				Content:   text,
				SessionID: m.currentSession.ID,
			}
			db.CreateMessage(dbMessage)
		}

	case strings.HasPrefix(input, "/"):
		asyncCmd = handleToolCommand(m, input)

	default:
		userMsg := m.youLabelStyle.Render("me") + " " + input
		m.messages = append(m.messages, userMsg)

		if m.currentSession != nil {
			dbMessage := &db.Message{
				Author:    "me",
				Content:   input,
				SessionID: m.currentSession.ID,
			}
			db.CreateMessage(dbMessage)
		}
	}

	return asyncCmd
}
