package ui

import (
	"strings"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

func handleWindowSizeMsg(m *model, msg tea.WindowSizeMsg) {
	if m.ctrlCPressed {
		m.ctrlCPressed = false
		m.removeCtrlCWarning()
	}

	m.viewport.Width = msg.Width
	m.textarea.SetWidth(msg.Width)
	m.viewport.Height = msg.Height - m.textarea.Height() - lipgloss.Height(gap)

	if len(m.messages) > 0 {
		m.viewport.SetContent(lipgloss.NewStyle().Width(m.viewport.Width).Render(strings.Join(m.messages, gap)))
	}
	m.viewport.GotoBottom()
}

func handleKeyMsg(m *model, msg tea.KeyMsg) tea.Cmd {
	switch msg.Type {
	case tea.KeyCtrlC:
		return handleCtrlC(m)

	case tea.KeyEsc:
		return tea.Quit

	case tea.KeyUp:
		m.historyUp()
		return nil

	case tea.KeyDown:
		m.historyDown()
		return nil

	case tea.KeyEnter:
		return handleEnter(m)

	default:
		if m.ctrlCPressed {
			m.ctrlCPressed = false
			m.removeCtrlCWarning()
			m.viewport.SetContent(lipgloss.NewStyle().Width(m.viewport.Width).Render(strings.Join(m.messages, gap)))
		}
		return nil
	}
}

func handleCtrlC(m *model) tea.Cmd {
	if m.ctrlCPressed {
		return tea.Quit
	}

	m.ctrlCPressed = true
	warnStyle := getWarnStyle()

	m.messages = append(m.messages, warnStyle.Render("Press Ctrl+C again to exit"))
	m.ctrlCMsgIndex = len(m.messages) - 1

	m.viewport.SetContent(lipgloss.NewStyle().Width(m.viewport.Width).Render(strings.Join(m.messages, gap)))
	m.viewport.GotoBottom()
	return nil
}
func handleEnter(m *model) tea.Cmd {
	if m.ctrlCPressed {
		m.ctrlCPressed = false
		m.removeCtrlCWarning()
	}

	input := strings.TrimSpace(m.textarea.Value())
	asyncCmd := processInputMessage(m, input)

	updateMessages(m)
	m.textarea.Reset()

	if asyncCmd != nil {
		return asyncCmd
	}
	return nil
}
