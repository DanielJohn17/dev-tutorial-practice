package main

import (
	"log"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/auth"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/config"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/list"
	routes "github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/router"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/storage"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/user"
)

// @title           Todolist API
// @version         1.0
// @description     A todo list API with user management
// @host            localhost:8080
// @BasePath        /
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func main() {
	db, err := storage.NewDatabase(
		storage.DBConfig{
			DBHost:     config.Env.DBHost,
			DBUser:     config.Env.DBUser,
			DBPassword: config.Env.DBPassword,
			DBName:     config.Env.DBName,
			DBPort:     config.Env.DBPort,
		},
	)

	if err != nil {
		log.Fatal("Error starting postgre database: ", err)
	}

	// Auto migrate tables for now
	db.AutoMigrate(&user.User{}, &list.List{})

	// User module setup
	userRepo := user.NewUserRepository(db)
	userSvc := user.NewUserService(userRepo)

	// Auth module setup
	authSvc := auth.NewAuthService(userRepo)
	authHandler := auth.NewAuthHandler(authSvc)

	// todolist module setup
	listRepo := list.NewListRepository(db)
	listSvc := list.NewListService(listRepo)
	listHandler := list.NewListHandler(listSvc)

	userHandler := user.NewUserHandler(userSvc)

	handlers := &routes.Handlers{
		User: userHandler,
		Auth: authHandler,
		List: listHandler,
	}

	r := routes.NewRoutes(handlers)

	r.Run(":8080")

}
