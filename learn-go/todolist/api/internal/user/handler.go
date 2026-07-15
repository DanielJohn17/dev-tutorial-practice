package user

import (
	"net/http"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/helper"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/types"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserHandlerInt interface {
	GetUserIdHandler(c *gin.Context)
	GetUserLists9c(c *gin.Context)
}

type UserHandler struct {
	service *UserService
}

func NewUserHandler(s *UserService) *UserHandler {
	return &UserHandler{service: s}
}

// GetUserByIdHandler godoc
// @Summary      Get user by ID
// @Description  Get a user by their UUID
// @Tags         users
// @Produce      json
// @Param        id   path      string  true  "User UUID"
// @Success      200  {object}  types.APIResponse{data=UserResponse}
// @Failure      400  {object}  types.APIResponse{error=types.ErrorInfo}
// @Failure      404  {object}  types.APIResponse{error=types.ErrorInfo}
// @Router       /api/v1/users/{id} [get]
// @Security     BearerAuth
func (h *UserHandler) GetUserByIdHandler(c *gin.Context) {
	id := c.Param("id")

	userId, err := uuid.Parse(id)
	if err != nil {
		helper.WriteError(c, http.StatusBadRequest, err)
		return
	}

	user, err := h.service.GetUserById(c, userId)
	if err != nil {
		helper.WriteError(c, http.StatusNotFound, err)
		return
	}

	helper.WriteJSON(c, http.StatusOK, user, &types.Meta{})
}
