package routes

import (
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/user"
	"github.com/gin-gonic/gin"
)

type Handlers struct {
	User *user.UserHandler
}

func NewRoutes(h *Handlers) *gin.Engine {

	router := gin.Default()

	subRouter := router.Group("/api/v1")

	// User routes
	subRouter.GET("/users/:id", h.User.GetUserById)

	return router
}
