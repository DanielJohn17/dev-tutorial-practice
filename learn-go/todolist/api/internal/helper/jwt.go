package helper

import (
	"fmt"
	"time"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/config"
	"github.com/golang-jwt/jwt/v5"
)

type UserToken struct {
	jwt.RegisteredClaims
	ID    string
	Email string
}

var secretKey = []byte(config.Env.JWTSecretKey)

func CreateToken(user UserToken) (string, error) {
	jwtExp := config.Env.JWTExpirationInSeconds

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    user.ID,
		"email": user.Email,
		"exp":   time.Now().Add(time.Second * time.Duration(jwtExp)).Unix(),
	})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", fmt.Errorf("Failed to create token: %w", err)
	}

	return tokenString, nil
}

func VerifyToken(tokenString string) (*UserToken, error) {
	userToken := new(UserToken)

	token, err := jwt.ParseWithClaims(
		tokenString,
		&UserToken{},
		func(token *jwt.Token) (any, error) {
			return secretKey, nil
		},
	)

	if err != nil {
		return nil, fmt.Errorf("Error parsing token")
	}

	if !token.Valid {
		return nil, fmt.Errorf("Invalid token")
	}

	if claims, ok := token.Claims.(*UserToken); ok {
		userToken.ID = claims.ID
		userToken.Email = claims.Email
	}

	return userToken, nil
}
