package user

import (
	"net/http"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/helper"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/types"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserHandlerInt interface {
	CreateUserHandler(c *gin.Context)
	GetUserId(c *gin.Context)
}

type UserHandler struct {
	service *UserService
}

func NewUserHandler(s *UserService) *UserHandler {
	return &UserHandler{service: s}
}

func (h *UserHandler) GetUserById(c *gin.Context) {
	id := c.Param("id")

	userId, err := uuid.Parse(id)
	if err != nil {
		helper.WriteError(c, http.StatusBadRequest, err)
	}

	user, err := h.service.GetUserById(c, userId)
	if err != nil {
		helper.WriteError(c, http.StatusNotFound, err)
	}

	helper.WriteJson(c, http.StatusOK, user, &types.Meta{})
}
