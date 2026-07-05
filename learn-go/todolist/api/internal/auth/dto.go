package auth

import "github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/user"

type UserRegister struct {
	Name     string `json:"name"     validate:"required,min=3,max=155"`
	Email    string `json:"email"    validate:"required,email"`
	Age      uint   `json:"age"      validate:"omitempty,number,gte=5,lte=100"`
	Password string `json:"password" validate:"required,containsany=0123456789,containsany=ABCDEFGHIJKLMNOPQRSTUVWXYZ"`
}

type UserLogin struct {
	Email    string `json:"email"    validate:"required,email"`
	Password string `json:"password" validate:"required,containsany=0123456789,containsany=ABCDEFGHIJKLMNOPQRSTUVWXYZ"`
}

type AuthUserResponse struct {
	user.UserResponse
	Token string `json:"token"`
}
