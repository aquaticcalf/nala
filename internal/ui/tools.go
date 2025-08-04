package ui

import (
	"fmt"
	"strings"

	tea "github.com/charmbracelet/bubbletea"
	"go.nirbar.in/nala/internal/db"
	"go.nirbar.in/nala/internal/tools"
)

func initTools() map[string]tools.Tool {
	toolMap := make(map[string]tools.Tool)
	toolMap["add"] = tools.NewAddTool()
	toolMap["multiply"] = tools.NewMultiplyTool()

	return toolMap
}

func handleToolCommand(m *model, input string) tea.Cmd {
	parts := strings.SplitN(input[1:], " ", 2)
	toolName := parts[0]
	args := ""
	if len(parts) > 1 {
		args = parts[1]
	}

	if tool, exists := m.tools[toolName]; exists {
		userToolCallMsg := m.youLabelStyle.Render("me") + " " + input
		m.messages = append(m.messages, userToolCallMsg)

		processingMsg := m.callNalaReverse(tool.ProcessingMessage())
		m.messages = append(m.messages, processingMsg)
		m.pendingToolMsgIndex = len(m.messages) - 1

		m.pendingDbMessageID = 0

		if m.currentSession != nil {
			userDbMessage := &db.Message{
				Author:    "me",
				Content:   input,
				SessionID: m.currentSession.ID,
			}
			db.CreateMessage(userDbMessage)

			toolRecord := &db.Tool{
				Name: toolName,
			}
			if args != "" {
				toolRecord.Input = &args
			}

			err := db.CreateTool(toolRecord)
			if err == nil {
				toolID := toolRecord.ID

				dbMessage := &db.Message{
					Author:     "nala",
					Content:    tool.ProcessingMessage(),
					IsToolCall: true,
					ToolCallID: &toolID,
					SessionID:  m.currentSession.ID,
				}
				err := db.CreateMessage(dbMessage)
				if err == nil {
					m.pendingDbMessageID = dbMessage.ID
				}
			}
		}

		return callToolCmd(tool, args, m.pendingToolMsgIndex)
	} else {
		errorMsg := m.callError(fmt.Sprintf("unknown command : /%s", toolName))
		m.messages = append(m.messages, errorMsg)

		if m.currentSession != nil {
			errorText := fmt.Sprintf("unknown command : /%s", toolName)
			dbMessage := &db.Message{
				Author:    "error",
				Content:   errorText,
				SessionID: m.currentSession.ID,
			}
			db.CreateMessage(dbMessage)
		}
	}

	return nil
}

func handleToolResult(m *model, msg toolResultMsg) {
	msg.dbMessageID = m.pendingDbMessageID

	if m.pendingToolMsgIndex >= 0 && m.pendingToolMsgIndex < len(m.messages) {
		m.messages = append(m.messages[:m.pendingToolMsgIndex], m.messages[m.pendingToolMsgIndex+1:]...)
	}
	m.pendingToolMsgIndex = -1

	if msg.err != nil {
		errMsg := m.callError(msg.err.Error())
		m.messages = append(m.messages, errMsg)

		if m.currentSession != nil && msg.dbMessageID > 0 {
			existingMessage, err := db.GetMessage(msg.dbMessageID)
			if err == nil {
				existingMessage.Author = "error"
				existingMessage.Content = msg.err.Error()
				db.UpdateMessage(existingMessage)
			} else {
				dbMessage := &db.Message{
					Author:    "error",
					Content:   msg.err.Error(),
					SessionID: m.currentSession.ID,
				}
				db.CreateMessage(dbMessage)
			}
		} else if m.currentSession != nil {
			dbMessage := &db.Message{
				Author:    "error",
				Content:   msg.err.Error(),
				SessionID: m.currentSession.ID,
			}
			db.CreateMessage(dbMessage)
		}
	} else {
		m.messages = append(m.messages, m.callNala(msg.text))

		badgeMsg := m.callBadge(fmt.Sprintf("produced via %s tool", msg.toolName))
		m.messages = append(m.messages, badgeMsg)

		if m.currentSession != nil && msg.dbMessageID > 0 {
			existingMessage, err := db.GetMessageWithTool(msg.dbMessageID)
			if err == nil && existingMessage.ToolCall != nil {
				existingMessage.Content = msg.text

				existingMessage.ToolCall.Output = &msg.text

				db.UpdateTool(existingMessage.ToolCall)
				db.UpdateMessage(existingMessage)

			}
		} else if m.currentSession != nil {
			toolRecord := &db.Tool{
				Name: msg.toolName,
			}
			if msg.text != "" {
				toolRecord.Output = &msg.text
			}

			err := db.CreateTool(toolRecord)
			if err == nil {
				toolID := toolRecord.ID

				dbMessage := &db.Message{
					Author:     "nala",
					Content:    msg.text,
					IsToolCall: true,
					ToolCallID: &toolID,
					SessionID:  m.currentSession.ID,
				}
				db.CreateMessage(dbMessage)
			}
		}
	}

	m.pendingDbMessageID = 0

	updateMessages(m)
}
