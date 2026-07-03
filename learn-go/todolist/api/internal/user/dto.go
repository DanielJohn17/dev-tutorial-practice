package user

import (
	"github.com/google/uuid"
)

type UserCreate struct {
	Name     string `json:"name"     validate:"required,min=3,max=155"`
	Email    string `json:"email"    validate:"required,email"`
	Age      uint   `json:"age"      validate:"omitempty,number,gte=5,lte=100"`
	Password string `json:"password" validate:"required,containsany=0123456789,containsany=ABCDEFGHIJKLMNOPQRSTUVWXYZ"`
}

type UserResponse struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Age       uint      `json:"age"`
	CreatedAt string    `json:"created_at"`
	UpdatedAt string    `json:"updated_at"`
}
