package tools

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

type MultiplyTool struct {
	name          string
	processingMsg string
}

func NewMultiplyTool() *MultiplyTool {
	return &MultiplyTool{
		name:          "multiply",
		processingMsg: "calling tool multiply..",
	}
}

func (mt *MultiplyTool) Name() string {
	return mt.name
}

func (mt *MultiplyTool) ProcessingMessage() string {
	return mt.processingMsg
}

func (mt *MultiplyTool) Execute(args string) (string, error) {
	time.Sleep(600 * time.Millisecond)

	fields := strings.Fields(args)
	if len(fields) != 2 {
		return "", fmt.Errorf("usage: /multiply <a> <b>")
	}

	aStr, bStr := fields[0], fields[1]

	if aInt, errAInt := strconv.ParseInt(aStr, 10, 64); errAInt == nil {
		if bInt, errBInt := strconv.ParseInt(bStr, 10, 64); errBInt == nil {
			return fmt.Sprintf("%s × %s = %d", aStr, bStr, aInt*bInt), nil
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

	product := aFlt * bFlt
	var productStr string
	if product == float64(int64(product)) {
		productStr = fmt.Sprintf("%d", int64(product))
	} else {
		productStr = fmt.Sprintf("%g", product)
	}
	return fmt.Sprintf("%s × %s = %s", aStr, bStr, productStr), nil
}
