package auth

import (
	"context"
	"fmt"
	"time"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/user"
	"golang.org/x/crypto/bcrypt"
)

type AuthServiceInt interface {
	RegisterUser(ctx context.Context, input UserRegister) error
	LoginUser(ctx context.Context, input UserLogin) (*user.UserResponse, error)
}

type AuthService struct {
	repo *user.UserRepository
}

func NewAuthService(r *user.UserRepository) *AuthService {
	return &AuthService{
		repo: r,
	}
}

func (s *AuthService) RegisterUser(
	ctx context.Context,
	input UserRegister,
) (*user.UserResponse, error) {

	if existingUser, _ := s.repo.GetUserByEmail(ctx, input.Email); existingUser != nil {
		return nil, fmt.Errorf("User already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("Password error: %w", err)
	}

	userCreated, err := s.repo.Create(
		ctx,
		&user.User{
			Name:     input.Name,
			Email:    input.Email,
			Age:      input.Age,
			Password: string(hashedPassword),
		},
	)
	if err != nil {
		return nil, err
	}

	return &user.UserResponse{
		ID:        userCreated.ID,
		Name:      userCreated.Name,
		Email:     userCreated.Email,
		Age:       userCreated.Age,
		CreatedAt: userCreated.CreatedAt.Format(time.RFC3339),
		UpdatedAt: userCreated.UpdatedAt.Format(time.RFC3339),
	}, nil
}

func (s *AuthService) LoginUser(ctx context.Context, input UserLogin) (*user.UserResponse, error) {

	userInDB, err := s.repo.GetUserByEmail(ctx, input.Email)
	if err != nil {
		return nil, fmt.Errorf("Email or Password is not correct")
	}

	err = bcrypt.CompareHashAndPassword([]byte(userInDB.Password), []byte(input.Password))
	if err != nil {
		return nil, fmt.Errorf("Email or Password is not correct")
	}

	return &user.UserResponse{
		ID:        userInDB.ID,
		Name:      userInDB.Name,
		Email:     userInDB.Email,
		Age:       userInDB.Age,
		CreatedAt: userInDB.CreatedAt.Format(time.RFC3339),
		UpdatedAt: userInDB.UpdatedAt.Format(time.RFC3339),
	}, nil
}
