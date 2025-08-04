package auth

import (
	"crypto/rand"
	"encoding/hex"
)

func generateSessionToken() string {
	b := make([]byte, 32) // 256 bits
	if _, err := rand.Read(b); err != nil {
		panic("failed to generate secure token")
	}
	return hex.EncodeToString(b)
}
