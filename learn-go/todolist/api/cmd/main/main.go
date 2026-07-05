package main

import (
	"log"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/auth"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/config"
	routes "github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/router"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/storage"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/user"
)

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

	// User module setup
	userRepo := user.NewUserRepository(db)
	userSvc := user.NewUserService(userRepo)
	userHandler := user.NewUserHandler(userSvc)

	// Auth module setup
	authSvc := auth.NewAuthService(userRepo)
	authHandler := auth.NewAuthHandler(authSvc)

	handlers := &routes.Handlers{
		User: userHandler,
		Auth: authHandler,
	}

	r := routes.NewRoutes(handlers)

	r.Run(":8080")

}
