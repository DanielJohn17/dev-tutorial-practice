package list

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ListRepositoryInt interface {
	Create(cxt context.Context, list *List) (*List, error)
	GetLists(cxt context.Context, id uuid.UUID) ([]List, error)
	GetListById(cxt context.Context, id uuid.UUID) (*List, error)
	Update(cxt context.Context, id uuid.UUID, fields map[string]any) error
	Delete(cxt context.Context, id uuid.UUID) error
}

type ListRepository struct {
	db *gorm.DB
}

func NewListRepository(db *gorm.DB) *ListRepository {
	return &ListRepository{db: db}
}

func (r *ListRepository) Create(cxt context.Context, list *List) (*List, error) {
	err := gorm.G[List](r.db).Create(cxt, list)
	if err != nil {
		return nil, fmt.Errorf("Error Creating List")
	}

	return list, nil
}

func (r *ListRepository) GetLists(cxt context.Context, id uuid.UUID) ([]List, error) {
	lists, err := gorm.G[List](r.db).Where("user_id = ?", id).Find(cxt)
	if err != nil {
		return nil, fmt.Errorf("Invalid user Id")
	}

	return lists, nil
}

func (r *ListRepository) GetListById(cxt context.Context, id uuid.UUID) (*List, error) {

	list, err := gorm.G[List](r.db).Where("id = ?", id).First(cxt)
	if err != nil {
		return nil, fmt.Errorf("List not found")
	}

	return &list, nil
}

func (r *ListRepository) Update(cxt context.Context, id uuid.UUID, fields map[string]any) error {
	_, err := gorm.G[map[string]any](r.db).Table("lists").Where("id = ?", id).Updates(cxt, fields)
	if err != nil {
		return fmt.Errorf("Failed to update list")
	}

	return nil
}

func (r *ListRepository) Delete(cxt context.Context, id uuid.UUID) error {

	rowsAffected, err := gorm.G[List](r.db).Where("id = ?", id).Delete(cxt)
	if err != nil {
		return fmt.Errorf("Failed to delete list")
	}

	if rowsAffected == 0 {
		return fmt.Errorf("List does not exist")
	}

	return nil
}
