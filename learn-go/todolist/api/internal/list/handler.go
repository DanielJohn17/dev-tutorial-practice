package list

import (
	"fmt"
	"net/http"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/helper"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/types"
	"github.com/gin-gonic/gin"
)

type ListHandlerInt interface {
	CreateListHandler(c *gin.Context)
	GetListById(c *gin.Context)
	UpdateListHandler(c *gin.Context)
	DeleteList(c *gin.Context)
}

type ListHandler struct {
	service *ListService
}

func NewListHandler(s *ListService) *ListHandler {
	return &ListHandler{service: s}
}

func (h *ListHandler) CreateListHandler(c *gin.Context) {

	var listCreate ListCreate

	userId, ok := c.Get("userId")
	if !ok {
		helper.WriteError(c, http.StatusUnauthorized, fmt.Errorf("Unauthorized"))
	}

	if err := helper.ParseJSON(c, listCreate); err != nil {
		helper.WriteError(c, http.StatusBadRequest, err)
	}

	list, err := h.service.CreateList(c, listCreate, fmt.Sprintf("%v", userId))
	if err != nil {
		helper.WriteError(c, http.StatusInternalServerError, err)
	}

	helper.WriteJSON(c, http.StatusCreated, list, &types.Meta{})
}

func (h *ListHandler) GetListById(c *gin.Context) {

	listId := c.Param("id")

	list, err := h.service.GetListById(c, listId)
	if err != nil {
		helper.WriteError(c, http.StatusNotFound, err)
	}

	helper.WriteJSON(c, http.StatusOK, list, &types.Meta{})
}

func (h *ListHandler) UpdateListHandler(c *gin.Context) {

	var listUpdate ListUpdate

	listId := c.Param("id")

	if err := helper.ParseJSON(c, listUpdate); err != nil {
		helper.WriteError(c, http.StatusBadRequest, err)
	}

	list, err := h.service.UpdateList(c, listUpdate, listId)
	if err != nil {
		helper.WriteError(c, http.StatusInternalServerError, err)
	}

	helper.WriteJSON(c, http.StatusOK, list, &types.Meta{})
}

func (h *ListHandler) DeleteList(c *gin.Context) {

	listId := c.Param("id")

	if err := h.service.DeleteList(c, listId); err != nil {
		helper.WriteError(c, http.StatusInternalServerError, err)
	}

	c.JSON(http.StatusAccepted, gin.H{"success": true, "message": "Delete successful"})
}
