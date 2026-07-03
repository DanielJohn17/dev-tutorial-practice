package user

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRepositoryInt interface {
	Create(ctx context.Context, user *User) error
	Update(ctx context.Context, user *User) error
	GetUserById(ctx context.Context, id uuid.UUID) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)
}

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (r *UserRepository) Create(ctx context.Context, user *User) error {
	result := gorm.WithResult()

	err := gorm.G[User](r.db, result).Create(ctx, user)
	if err != nil {
		return fmt.Errorf("Failed to create user: %w", err)
	}

	return nil
}

// func (r *UserRepository) Update(ctx context.Context, user *User) error {
//
// }

func (r *UserRepository) GetUserById(ctx context.Context, id uuid.UUID) (*User, error) {
	user, err := gorm.G[User](r.db).Where("id = ?", id).First(ctx)
	if err != nil {
		return nil, fmt.Errorf("User not found with id: %s", id)
	}

	return &user, nil
}

func (r *UserRepository) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	user, err := gorm.G[User](r.db).Where("email = ?", email).First(ctx)
	if err != nil {
		return nil, fmt.Errorf("User not found with email: %s", email)
	}

	return &user, nil
}
