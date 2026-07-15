package list

import (
	"context"
	"fmt"
	"time"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/helper"
	"github.com/google/uuid"
)

type ListServiceInt interface {
	CreateList(cxt context.Context, input ListCreate, id string) (*ListResponse, error)
	UpdateList(cxt context.Context, input ListUpdate, id string) (*ListResponse, error)
	GetListsByUserId(cxt context.Context, userId string) (*ListResponse, error)
	GetListById(cxt context.Context, id string) (*ListResponse, error)
	DeleteList(cxt context.Context, id string) error
}

type ListService struct {
	repo *ListRepository
}

func NewListService(r *ListRepository) *ListService {
	return &ListService{repo: r}
}

func (s *ListService) CreateList(
	cxt context.Context,
	input ListCreate,
	id string,
) (*ListResponse, error) {

	userId, err := uuid.Parse(id)
	if err != nil {
		return nil, fmt.Errorf("Invalid user Id")
	}

	list := &List{
		Title:       input.Title,
		Description: input.Description,
		UserId:      userId,
	}

	listCreated, err := s.repo.Create(cxt, list)
	if err != nil {
		return nil, err
	}

	return &ListResponse{
		ID:          listCreated.ID,
		Title:       listCreated.Title,
		Description: listCreated.Description,
		UserId:      listCreated.UserId,
		CreatedAt:   listCreated.CreatedAt.Format(time.RFC3339),
		UpdatedAt:   listCreated.CreatedAt.Format(time.RFC3339),
	}, nil
}

func (s *ListService) UpdateList(
	cxt context.Context,
	input ListUpdate,
	id string,
) (*ListResponse, error) {

	fields := make(map[string]any)

	listId, err := parseUUID(id)
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

	return &ListResponse{
		ID:          list.ID,
		Title:       list.Title,
		Description: list.Description,
		UserId:      list.UserId,
		CreatedAt:   list.CreatedAt.Format(time.RFC3339),
		UpdatedAt:   list.UpdatedAt.Format(time.RFC3339),
	}, nil
}

func (s *ListService) GetListsByUserId(cxt context.Context, userId string) ([]ListResponse, error) {

	userUUID, err := parseUUID(userId)
	if err != nil {
		return nil, err
	}

	lists, err := s.repo.GetLists(cxt, *userUUID)
	if err != nil {
		return nil, err
	}

	filteredLists := helper.Transform(lists, func(list List) ListResponse {
		return ListResponse{
			ID:          list.ID,
			Title:       list.Title,
			Description: list.Description,
			UserId:      list.UserId,
			CreatedAt:   list.CreatedAt.Format(time.RFC3339),
			UpdatedAt:   list.UpdatedAt.Format(time.RFC3339),
		}
	})

	return filteredLists, nil
}

func (s *ListService) GetListById(cxt context.Context, id string) (*ListResponse, error) {

	listId, err := parseUUID(id)
	if err != nil {
		return nil, err
	}

	list, err := s.repo.GetListById(cxt, *listId)
	if err != nil {
		return nil, err
	}

	return &ListResponse{
		ID:          list.ID,
		Title:       list.Title,
		Description: list.Description,
		UserId:      list.UserId,
		CreatedAt:   list.CreatedAt.Format(time.RFC3339),
		UpdatedAt:   list.UpdatedAt.Format(time.RFC3339),
	}, err
}

func (s *ListService) DeleteList(cxt context.Context, id string) error {

	listId, err := parseUUID(id)
	if err != nil {
		return err
	}

	if err := s.repo.Delete(cxt, *listId); err != nil {
		return err
	}

	return nil
}

func parseUUID(id string) (*uuid.UUID, error) {
	listId, err := uuid.Parse(id)
	if err != nil {
		return nil, fmt.Errorf("Invalid UUID")
	}

	return &listId, nil
}
