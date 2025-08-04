package tools

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

type AddTool struct {
	name          string
	processingMsg string
}

func NewAddTool() *AddTool {
	return &AddTool{
		name:          "add",
		processingMsg: "calling tool add..",
	}
}

func (at *AddTool) Name() string {
	return at.name
}

func (at *AddTool) ProcessingMessage() string {
	return at.processingMsg
}

func (at *AddTool) Execute(args string) (string, error) {
	time.Sleep(600 * time.Millisecond)
	fields := strings.Fields(args)
	if len(fields) != 2 {
		return "", fmt.Errorf("usage: /add <a> <b>")
	}

	aStr, bStr := fields[0], fields[1]

	if aInt, errAInt := strconv.ParseInt(aStr, 10, 64); errAInt == nil {
		if bInt, errBInt := strconv.ParseInt(bStr, 10, 64); errBInt == nil {
			return fmt.Sprintf("%s + %s = %d", aStr, bStr, aInt+bInt), nil
		}
	}

	aFlt, errAF := strconv.ParseFloat(aStr, 64)
	if errAF != nil {
		return "", fmt.Errorf("invalid number: %q", aStr)
	}
	bFlt, errBF := strconv.ParseFloat(bStr, 64)
	if errBF != nil {
		return "", fmt.Errorf("invalid number: %q", bStr)
	}

	sum := aFlt + bFlt
	var sumStr string
	if sum == float64(int64(sum)) {
		sumStr = fmt.Sprintf("%d", int64(sum))
	} else {
		sumStr = fmt.Sprintf("%g", sum)
	}
	return fmt.Sprintf("%s + %s = %s", aStr, bStr, sumStr), nil
}
