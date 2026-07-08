package auth

import "github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/user"

// UserRegister represents the request body for user registration
type UserRegister struct {
	Name     string `json:"name"     validate:"required,min=3,max=155" example:"John"`
	Email    string `json:"email"    validate:"required,email" example:"john@email.com"`
	Age      uint   `json:"age"      validate:"omitempty,number,gte=5,lte=100" example:"25"`
	Password string `json:"password" validate:"required,containsany=0123456789,containsany=ABCDEFGHIJKLMNOPQRSTUVWXYZ" example:"Secret123"`
}

// UserLogin represents the request body for user login
type UserLogin struct {
	Email    string `json:"email"    validate:"required,email" example:"john@email.com"`
	Password string `json:"password" validate:"required,containsany=0123456789,containsany=ABCDEFGHIJKLMNOPQRSTUVWXYZ" example:"Secret123"`
}

// AuthUserResponse represents the authentication response with JWT token
type AuthUserResponse struct {
	user.UserResponse
	Token string `json:"token"`
}
