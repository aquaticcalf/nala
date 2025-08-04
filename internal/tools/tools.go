package tools

type Tool interface {
	Name() string
	Execute(args string) (string, error)
	ProcessingMessage() string
}
