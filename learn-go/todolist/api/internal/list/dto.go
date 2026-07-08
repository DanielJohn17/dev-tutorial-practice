package list

import "github.com/google/uuid"

// ListCreate represents the request body for creating a list
type ListCreate struct {
	Title       string  `json:"title"       validate:"required,min=3,max=150" example:"My Todo List"`
	Description *string `json:"description" validate:"omitempty,min=3,max=500" example:"Things to do today"`
}

// ListUpdate represents the request body for updating a list
type ListUpdate struct {
	Title       *string `json:"title"       validate:"omitempty,min=3,max=150" example:"Updated Title"`
	Description *string `json:"description" validate:"omitempty,min=3,max=500" example:"Updated description"`
}

// ListResponse represents a list returned in responses
type ListResponse struct {
	ID          uuid.UUID `json:"id"`
	Title       string    `json:"title"`
	Description *string   `json:"description"`
	UserId      uuid.UUID `json:"user_id"`
	CreatedAt   string    `json:"created_at"`
	UpdatedAt   string    `json:"updated_at"`
}
