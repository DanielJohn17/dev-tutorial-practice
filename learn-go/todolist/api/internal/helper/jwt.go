package helper

import (
	"fmt"
	"time"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/config"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type UserToken struct {
	ID    uuid.UUID
	Email string
}

var secretKey = config.Env.JWTSecretKey

func CreateToken(user UserToken) (string, error) {
	jwtExp := config.Env.JWTExpirationInSeconds

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": user.ID,
		"email":  user.Email,
		"exp":    time.Now().Add(time.Second * time.Duration(jwtExp)).Unix(),
	})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", fmt.Errorf("Failed to create token: %w", err)
	}

	return tokenString, nil
}

func VerifyToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		return secretKey, nil
	})

	if err != nil {
		return fmt.Errorf("Error parsing token: %w", err)
	}

	if !token.Valid {
		return fmt.Errorf("Invalid token")
	}

	return nil
}
