package auth

import (
	"net/http"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/helper"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/types"
	usermod "github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/user"
	"github.com/gin-gonic/gin"
)

type AuthHandlerInt interface {
	RegisterHandler(c *gin.Context)
	LoginHandler(c *gin.Context)
}

type AuthHandler struct {
	service *AuthService
}

func NewAuthHandler(s *AuthService) *AuthHandler {
	return &AuthHandler{
		service: s,
	}
}

func (h *AuthHandler) RegisterHandler(c *gin.Context) {

	var userRegister UserRegister

	if err := helper.ParseJSON(c, userRegister); err != nil {
		helper.WriteError(c, http.StatusBadRequest, err)
	}

	user, err := h.service.RegisterUser(c, userRegister)
	if err != nil {
		helper.WriteError(c, http.StatusInternalServerError, err)
	}

	token, err := helper.CreateToken(helper.UserToken{ID: user.ID.String(), Email: user.Email})
	if err != nil {
		helper.WriteError(c, http.StatusInternalServerError, err)
	}

	response := AuthUserResponse{
		UserResponse: usermod.UserResponse{
			ID:        user.ID,
			Name:      user.Name,
			Email:     user.Email,
			Age:       user.Age,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		},
		Token: token,
	}

	helper.WriteJSON(c, http.StatusOK, response, &types.Meta{})
}

func (h *AuthHandler) LoginHandler(c *gin.Context) {

	var userLogin UserLogin

	if err := helper.ParseJSON(c, userLogin); err != nil {
		helper.WriteError(c, http.StatusBadRequest, err)
	}

	user, err := h.service.LoginUser(c, userLogin)
	if err != nil {
		helper.WriteError(c, http.StatusUnauthorized, err)
	}

	token, err := helper.CreateToken(helper.UserToken{ID: user.ID.String(), Email: user.Email})
	if err != nil {
		helper.WriteError(c, http.StatusInternalServerError, err)
	}

	response := AuthUserResponse{
		UserResponse: usermod.UserResponse{
			ID:        user.ID,
			Name:      user.Name,
			Email:     user.Email,
			Age:       user.Age,
			CreatedAt: user.CreatedAt,
			UpdatedAt: user.UpdatedAt,
		},
		Token: token,
	}

	helper.WriteJSON(c, http.StatusOK, response, &types.Meta{})
}
