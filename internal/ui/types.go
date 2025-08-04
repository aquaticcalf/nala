package ui

import (
	"time"

	"github.com/charmbracelet/bubbles/textarea"
	"github.com/charmbracelet/bubbles/viewport"
	"github.com/charmbracelet/lipgloss"

	"go.nirbar.in/nala/internal/db"
	"go.nirbar.in/nala/internal/tools"
)

type errMsg error

type toolResultMsg struct {
	toolName    string
	text        string
	err         error
	msgIndex    int
	dbMessageID uint
}

type model struct {
	viewport      viewport.Model
	messages      []string
	textarea      textarea.Model
	senderStyle   lipgloss.Style
	err           error
	ctrlCPressed  bool
	ctrlCMsgIndex int

	nalaStyle        lipgloss.Style
	nalaReverseStyle lipgloss.Style
	errorStyle       lipgloss.Style
	badgeStyle       lipgloss.Style
	youLabelStyle    lipgloss.Style
	nalaLabelStyle   lipgloss.Style
	errorLabelStyle  lipgloss.Style

	history             []string
	historyIndex        int
	draft               string
	pendingToolMsgIndex int
	pendingDbMessageID  uint

	tools           map[string]tools.Tool
	currentSession  *db.Session
	viewportFocused bool

	isScrolling    bool
	lastScrollTime time.Time
}
