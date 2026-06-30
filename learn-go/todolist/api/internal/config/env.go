package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBName string
	DBHost string
	DBAddress string
	Port string
}


func initConfig() Config {
	godotenv.Load()

	return  Config{
		DBName: GetEnv("DB_NAME", "todolist_db"),
		DBHost: GetEnv("DB_HOST", "localhost"),
	}
}

func GetEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

var Env = initConfig()
