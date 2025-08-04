package ui

import (
	"github.com/charmbracelet/lipgloss"
)

func initStyles() (lipgloss.Style, lipgloss.Style, lipgloss.Style, lipgloss.Style, lipgloss.Style, lipgloss.Style, lipgloss.Style) {
	nalaStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("#ff79c6")).Bold(true)
	nalaReverseStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("#000000")).Background(lipgloss.Color("#ff79c6")).Bold(true)
	errorStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("#ff5555")).Italic(true)
	badgeStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("#000000")).Background(lipgloss.Color("#ffd166")).Bold(true).Padding(0, 1)
	youLabelStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("#000000")).Background(lipgloss.Color("#a3be8c")).Bold(true).Padding(0, 1)
	nalaLabelStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("#000000")).Background(lipgloss.Color("#88c0d0")).Bold(true).Padding(0, 1)
	errorLabelStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("#000000ff")).Background(lipgloss.Color("#fb2525")).Bold(true).Padding(0, 1)

	return nalaStyle, nalaReverseStyle, errorStyle, badgeStyle, youLabelStyle, nalaLabelStyle, errorLabelStyle
}

func getWarnStyle() lipgloss.Style {
	return lipgloss.NewStyle().
		Foreground(lipgloss.Color("#000000")).
		Background(lipgloss.Color("#ffaa00")).
		Bold(true).
		Padding(0, 1)
}
