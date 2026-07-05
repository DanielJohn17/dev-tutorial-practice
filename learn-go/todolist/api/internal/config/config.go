package config

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	DBName                 string
	DBHost                 string
	DBUser                 string
	DBPassword             string
	DBPort                 string
	JWTSecretKey           string
	JWTExpirationInSeconds int64
}

var Env = initConfig()

func initConfig() Config {
	godotenv.Load()

	return Config{
		DBName:                 GetEnv("DB_NAME", "todolist_db"),
		DBHost:                 GetEnv("DB_HOST", "localhost"),
		DBUser:                 GetEnv("DB_USER", "postgres"),
		DBPassword:             GetEnv("DB_PASSWORD", ""),
		DBPort:                 GetEnv("DB_PORT", "5432"),
		JWTSecretKey:           GetEnv("JWT_SECRET_KEY", "secret key"),
		JWTExpirationInSeconds: GetEnvAsInt("JWT_EXP_SECONDS", 3600),
	}
}

func GetEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func GetEnvAsInt(key string, fallback int64) int64 {
	if value, ok := os.LookupEnv(key); ok {
		valueInt, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			return fallback
		}

		return valueInt
	}

	return fallback
}
