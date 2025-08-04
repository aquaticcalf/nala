package ui

import (
	tea "github.com/charmbracelet/bubbletea"
	"go.nirbar.in/nala/internal/cli/tools"
)

const gap = "\n\n"

func callToolCmd(tool tools.Tool, args string, msgIndex int) tea.Cmd {
	return func() tea.Msg {
		result, err := tool.Execute(args)
		return toolResultMsg{
			toolName: tool.Name(),
			text:     result,
			err:      err,
			msgIndex: msgIndex,
		}
	}
}

func (m *model) removeCtrlCWarning() {
	if m.ctrlCMsgIndex >= 0 && m.ctrlCMsgIndex < len(m.messages) {
		m.messages = append(m.messages[:m.ctrlCMsgIndex], m.messages[m.ctrlCMsgIndex+1:]...)
	}
	m.ctrlCMsgIndex = -1
}

func (m *model) historyUp() {
	if len(m.history) == 0 {
		return
	}
	if m.historyIndex == -1 {
		m.draft = m.textarea.Value()
		m.historyIndex = len(m.history) - 1
	} else {
		m.historyIndex--
		if m.historyIndex < 0 {
			m.historyIndex = 0
		}
	}
	m.textarea.SetValue(m.history[m.historyIndex])
	m.textarea.CursorEnd()
}

func (m *model) historyDown() {
	if len(m.history) == 0 {
		return
	}
	if m.historyIndex == -1 {
		return
	}
	m.historyIndex++
	if m.historyIndex >= len(m.history) {
		m.historyIndex = -1
		m.textarea.SetValue(m.draft)
	} else {
		m.textarea.SetValue(m.history[m.historyIndex])
	}
	m.textarea.CursorEnd()
}

func (m model) callNala(text string) string {
	return m.nalaLabelStyle.Render("nala") + " " + text
}

func (m model) callNalaReverse(text string) string {
	return m.nalaReverseStyle.Render(" nala " + text + " ")
}

func (m model) callError(text string) string {
	return m.errorLabelStyle.Render("error") + " " + text
}

func (m model) callBadge(text string) string {
	return m.badgeStyle.Render(text)
}
