package user

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type UserServiceInt interface {
	CreateUser(ctx context.Context, input UserCreate) error
	GetUserById(ctx context.Context, userId uuid.UUID) (*UserResponse, error)
}

type UserService struct {
	repo *UserRepository
}

func NewUserService(r *UserRepository) *UserService {
	return &UserService{repo: r}
}

func (s *UserService) CreateUser(ctx context.Context, input UserCreate) error {

	if user, _ := s.repo.GetUserByEmail(ctx, input.Email); user != nil {
		return fmt.Errorf("User already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("Passowrd error: %w", err)
	}

	err = s.repo.Create(
		ctx,
		&User{
			Name:     input.Name,
			Email:    input.Email,
			Age:      input.Age,
			Password: string(hashedPassword),
		},
	)
	if err != nil {
		return err
	}

	return nil
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
