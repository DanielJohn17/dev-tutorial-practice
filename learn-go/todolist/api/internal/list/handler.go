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

// CreateListHandler godoc
// @Summary      Create a new list
// @Description  Create a new todo list for the authenticated user
// @Tags         lists
// @Accept       json
// @Produce      json
// @Param        input  body      ListCreate  true  "List payload"
// @Success      201    {object}  types.APIResponse{data=ListResponse}
// @Failure      400    {object}  types.APIResponse{error=types.ErrorInfo}
// @Failure      401    {object}  types.APIResponse{error=types.ErrorInfo}
// @Router       /api/v1/lists [post]
// @Security     BearerAuth
func (h *ListHandler) CreateListHandler(c *gin.Context) {

	var listCreate ListCreate

	userId, ok := c.Get("userId")
	if !ok {
		helper.WriteError(c, http.StatusUnauthorized, fmt.Errorf("Unauthorized"))
		return
	}

	if err := helper.ParseJSON(c, &listCreate); err != nil {
		helper.WriteError(c, http.StatusBadRequest, err)
		return
	}

	list, err := h.service.CreateList(c, listCreate, fmt.Sprintf("%v", userId))
	if err != nil {
		helper.WriteError(c, http.StatusInternalServerError, err)
		return
	}

	helper.WriteJSON(c, http.StatusCreated, list, &types.Meta{})
}

// GetListById godoc
// @Summary      Get list by ID
// @Description  Get a todo list by its ID
// @Tags         lists
// @Produce      json
// @Param        id   path      string  true  "List ID"
// @Success      200  {object}  types.APIResponse{data=ListResponse}
// @Failure      404  {object}  types.APIResponse{error=types.ErrorInfo}
// @Router       /api/v1/lists/{id} [get]
// @Security     BearerAuth
func (h *ListHandler) GetListById(c *gin.Context) {

	listId := c.Param("id")

	list, err := h.service.GetListById(c, listId)
	if err != nil {
		helper.WriteError(c, http.StatusNotFound, err)
		return
	}

	helper.WriteJSON(c, http.StatusOK, list, &types.Meta{})
}

// UpdateListHandler godoc
// @Summary      Update a list
// @Description  Partially update a todo list by its ID
// @Tags         lists
// @Accept       json
// @Produce      json
// @Param        id    path      string      true  "List ID"
// @Param        input body      ListUpdate  true  "Update payload"
// @Success      200   {object}  types.APIResponse{data=ListResponse}
// @Failure      400   {object}  types.APIResponse{error=types.ErrorInfo}
// @Failure      404   {object}  types.APIResponse{error=types.ErrorInfo}
// @Router       /api/v1/lists/{id} [patch]
// @Security     BearerAuth
func (h *ListHandler) UpdateListHandler(c *gin.Context) {

	var listUpdate ListUpdate

	listId := c.Param("id")

	if err := helper.ParseJSON(c, &listUpdate); err != nil {
		helper.WriteError(c, http.StatusBadRequest, err)
		return
	}

	list, err := h.service.UpdateList(c, listUpdate, listId)
	if err != nil {
		helper.WriteError(c, http.StatusInternalServerError, err)
		return
	}

	helper.WriteJSON(c, http.StatusOK, list, &types.Meta{})
}

// DeleteList godoc
// @Summary      Delete a list
// @Description  Delete a todo list by its ID
// @Tags         lists
// @Produce      json
// @Param        id  path      string  true  "List ID"
// @Success      202 {object}  map[string]string
// @Failure      500 {object}  types.APIResponse{error=types.ErrorInfo}
// @Router       /api/v1/lists/{id} [delete]
// @Security     BearerAuth
func (h *ListHandler) DeleteList(c *gin.Context) {

	listId := c.Param("id")

	if err := h.service.DeleteList(c, listId); err != nil {
		helper.WriteError(c, http.StatusInternalServerError, err)
		return
	}

	c.IndentedJSON(http.StatusAccepted, gin.H{"success": true, "message": "Delete successful"})
}
