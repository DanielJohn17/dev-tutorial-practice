package user

import (
	"context"
	"time"

	"github.com/google/uuid"
)

type UserServiceInt interface {
	GetUserById(ctx context.Context, userId uuid.UUID) (*UserResponse, error)
}

type UserService struct {
	repo *UserRepository
}

func NewUserService(r *UserRepository) *UserService {
	return &UserService{repo: r}
}

func (s *UserService) GetUserById(ctx context.Context, userId uuid.UUID) (*UserResponse, error) {

	user, err := s.repo.GetUserById(ctx, userId)
	if err != nil {
		return &UserResponse{}, err
	}

	return &UserResponse{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Age:       user.Age,
		CreatedAt: user.createdAt.Format(time.RFC3339),
		UpdatedAt: user.updatedAt.Format(time.RFC3339),
	}, nil
}
