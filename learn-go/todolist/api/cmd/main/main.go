package main

import (
	"log"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/config"
	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/storage"
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

}
