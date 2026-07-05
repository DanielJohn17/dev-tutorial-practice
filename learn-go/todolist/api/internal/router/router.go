package routes

import (
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/auth"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/user"
	"github.com/gin-gonic/gin"
)

type Handlers struct {
	Auth *auth.AuthHandler
	User *user.UserHandler
}

func NewRoutes(h *Handlers) *gin.Engine {

	router := gin.Default()

	subRouter := router.Group("/api/v1")

	//auth routes
	subRouter.POST("/register", h.Auth.RegisterHandler)
	subRouter.POST("/login", h.Auth.LoginHandler)

	// User routes
	subRouter.GET("/users/:id", h.User.GetUserByIdHandler)

	return router
}
