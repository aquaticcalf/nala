package ui

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/charmbracelet/bubbles/textarea"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"go.nirbar.in/nala/internal/db"
)

type scrollMsg struct {
	direction string
	lines     int
}

func scrollViewport(direction string, lines int) tea.Cmd {
	return func() tea.Msg {
		return scrollMsg{direction: direction, lines: lines}
	}
}

func Chat() {
	p := tea.NewProgram(
		initialModel(),
		tea.WithMouseAllMotion(),
		tea.WithAltScreen(),
	)

	if _, err := p.Run(); err != nil {
		log.Fatal(err)
	}

	fmt.Fprint(os.Stdout, "\033[H\033[2J")
}

func initialModel() model {
	termWidth, termHeight := getTerminalSize()

	ta := initTextArea(termWidth)
	vp := initViewport(termWidth, termHeight, ta.Height())

	nalaStyle, nalaReverseStyle, errorStyle, badgeStyle, youLabelStyle, nalaLabelStyle, errorLabelStyle := initStyles()

	session, err := db.CreateSession()
	if err != nil {
		log.Fatalf("failed to create session : %v", err)
	}

	initialMessages := setupInitialContent(&vp, nalaLabelStyle, badgeStyle, termWidth, session)

	toolMap := initTools()

	return model{
		textarea:      ta,
		messages:      initialMessages,
		viewport:      vp,
		senderStyle:   lipgloss.NewStyle().Foreground(lipgloss.Color("5")),
		err:           nil,
		ctrlCPressed:  false,
		ctrlCMsgIndex: -1,

		nalaStyle:        nalaStyle,
		nalaReverseStyle: nalaReverseStyle,
		errorStyle:       errorStyle,
		badgeStyle:       badgeStyle,
		youLabelStyle:    youLabelStyle,
		nalaLabelStyle:   nalaLabelStyle,
		errorLabelStyle:  errorLabelStyle,

		history:             []string{},
		historyIndex:        -1,
		draft:               "",
		pendingToolMsgIndex: -1,

		tools:           toolMap,
		currentSession:  session,
		viewportFocused: false,
		isScrolling:     false,
		lastScrollTime:  time.Now(),
	}
}

func (m model) Init() tea.Cmd {
	return textarea.Blink
}

func (m model) View() string {
	m.viewport.Style = lipgloss.NewStyle().
		BorderStyle(lipgloss.NormalBorder()).
		BorderForeground(lipgloss.Color("241")).
		Padding(1, 2)

	return fmt.Sprintf("%s%s%s", m.viewport.View(), gap, m.textarea.View())
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var (
		tiCmd tea.Cmd
		vpCmd tea.Cmd
	)

	if scroll, ok := msg.(scrollMsg); ok {
		switch scroll.direction {
		case "up":
			m.viewport.ScrollUp(scroll.lines)
		case "down":
			m.viewport.ScrollDown(scroll.lines)
		}
		m.viewport, vpCmd = m.viewport.Update(msg)
		return m, vpCmd
	}

	if mouseMsg, ok := msg.(tea.MouseMsg); ok {
		m.isScrolling = true
		m.lastScrollTime = time.Now()

		vpHeight := m.viewport.Height + lipgloss.Height(gap)
		if mouseMsg.Y <= vpHeight {
			switch mouseMsg.Type {
			case tea.MouseWheelUp:
				return m, scrollViewport("up", 3)
			case tea.MouseWheelDown:
				return m, scrollViewport("down", 3)
			}
		}

		m.viewport, vpCmd = m.viewport.Update(mouseMsg)
		return m, vpCmd
	}

	if m.isScrolling && time.Since(m.lastScrollTime) > 100*time.Millisecond {
		m.isScrolling = false
	}

	if !m.isScrolling {
		m.textarea, tiCmd = m.textarea.Update(msg)
	}

	if keyMsg, ok := msg.(tea.KeyMsg); ok && (keyMsg.String() == "up" || keyMsg.String() == "down") {
		vpCmd = nil
	} else {
		m.viewport, vpCmd = m.viewport.Update(msg)
	}

	if !m.textarea.Focused() {
		m.textarea.Focus()
	}

	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		handleWindowSizeMsg(&m, msg)

	case tea.KeyMsg:
		if cmd := handleKeyMsg(&m, msg); cmd != nil {
			return m, tea.Batch(tiCmd, vpCmd, cmd)
		}

	case toolResultMsg:
		handleToolResult(&m, msg)

	case errMsg:
		m.err = msg
		return m, nil
	}

	return m, tea.Batch(tiCmd, vpCmd)
}
