package user

import (
	"github.com/google/uuid"
)

// UserUpdate represents the request body for updating a user
type UserUpdate struct {
	Name  *string `json:"name" example:"John"`
	Email *string `json:"email" example:"john@email.com"`
	Age   *string `json:"age" example:"25"`
}

// UserResponse represents the user data returned in responses
type UserResponse struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Age       uint      `json:"age"`
	CreatedAt string    `json:"created_at"`
	UpdatedAt string    `json:"updated_at"`
}
