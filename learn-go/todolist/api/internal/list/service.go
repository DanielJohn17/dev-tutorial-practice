package list

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

type ListServiceInt interface {
	CreateList(cxt context.Context, input ListCreate, id string) (*List, error)
	UpdateList(cxt context.Context, input ListUpdate, id string) (*List, error)
	GetListById(cxt context.Context, id string) (*List, error)
	DeleteList(cxt context.Context, id string) error
}

type ListService struct {
	repo *ListRepository
}

func NewListService(r *ListRepository) *ListService {
	return &ListService{repo: r}
}

func (s *ListService) CreateList(cxt context.Context, input ListCreate, id string) (*List, error) {

	userId, err := uuid.Parse(id)
	if err != nil {
		return nil, fmt.Errorf("Invalid user Id")
	}

	list := &List{
		Title:        input.Title,
		Descrtiption: input.Description,
		UserId:       userId,
	}

	listCreated, err := s.repo.Create(cxt, list)
	if err != nil {
		return nil, err
	}

	return listCreated, nil
}

func (s *ListService) UpdateList(cxt context.Context, input ListUpdate, id string) (*List, error) {

	fields := make(map[string]any)

	listId, err := parseListId(id)
	if err != nil {
		return nil, err
	}

	if input.Title != nil {
		fields["title"] = *input.Title
	}
	if input.Description != nil {
		fields["description"] = *input.Description
	}

	if len(fields) == 0 {
		return nil, fmt.Errorf("No fields to update")
	}

	if err := s.repo.Update(cxt, *listId, fields); err != nil {
		return nil, err
	}

	list, err := s.repo.GetListById(cxt, *listId)
	if err != nil {
		return nil, err
	}

	return list, nil
}

func (s *ListService) GetListById(cxt context.Context, id string) (*List, error) {

	listId, err := parseListId(id)
	if err != nil {
		return nil, err
	}

	list, err := s.repo.GetListById(cxt, *listId)
	if err != nil {
		return nil, err
	}

	return list, err
}

func (s *ListService) DeleteList(cxt context.Context, id string) error {

	listId, err := parseListId(id)
	if err != nil {
		return err
	}

	if err := s.repo.Delete(cxt, *listId); err != nil {
		return err
	}

	return nil
}

func parseListId(id string) (*uuid.UUID, error) {
	listId, err := uuid.Parse(id)
	if err != nil {
		return nil, fmt.Errorf("Invalid user Id")
	}

	return &listId, nil
}
