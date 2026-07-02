package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBName string
	DBHost string
	DBUser string
	DBPassword string
	DBPort string
}

var Env = initConfig()

func initConfig() Config {
	godotenv.Load()

	return  Config{
		DBName: GetEnv("DB_NAME", "todolist_db"),
		DBHost: GetEnv("DB_HOST", "localhost"),
		DBUser: GetEnv("DB_USER", "postgres"),
		DBPassword: GetEnv("DB_PASSWORD", ""),
		DBPort: GetEnv("DB_PORT", "5432"),
	}
}

func GetEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

