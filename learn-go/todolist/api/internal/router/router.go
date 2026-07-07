package routes

import (
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/auth"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/list"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/middleware"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/user"
	"github.com/gin-gonic/gin"
)

type Handlers struct {
	Auth *auth.AuthHandler
	User *user.UserHandler
	List *list.ListHandler
}

func NewRoutes(h *Handlers) *gin.Engine {

	router := gin.Default()

	subRouter := router.Group("/api/v1")

	//auth routes
	subRouter.POST("/register", h.Auth.RegisterHandler)
	subRouter.POST("/login", h.Auth.LoginHandler)

	subRouter.Use(middleware.Auth())
	{
		// User routes
		subRouter.GET("/users/:id", h.User.GetUserByIdHandler)

		// todolist routes
		subRouter.POST("/lists", h.List.CreateListHandler)
		subRouter.GET("/lists/:id", h.List.GetListById)
		subRouter.PATCH("/lists/:id", h.List.UpdateListHandler)
		subRouter.DELETE("/lists/:id", h.List.DeleteList)

	}
	return router
}
