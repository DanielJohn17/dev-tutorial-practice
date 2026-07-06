package helper

import (
	"encoding/json"
	"fmt"
	"math"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/types"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func SetMeta(offset, limit, total uint) *types.Meta {
	page := math.Floor(float64(offset)/float64(limit)) + 1
	totalPages := math.Floor(float64(total)/float64(limit)) + 1

	return &types.Meta{
		Page:       uint(page),
		Limit:      limit,
		Total:      total,
		TotalPages: uint(totalPages),
	}

}

func ParseJSON[K comparable](c *gin.Context, payload K) error {
	validate := validator.New()

	if c.Request.Body == nil {
		return fmt.Errorf("Missing request body")
	}

	if err := json.NewDecoder(c.Request.Body).Decode(&payload); err != nil {
		return fmt.Errorf("Error decoding payload: %w", err)
	}

	if err := validate.Struct(payload); err != nil {
		return fmt.Errorf("Validation error: %w", err)
	}

	return nil
}

func WriteJSON(c *gin.Context, status int, data any, meta *types.Meta) {
	c.JSON(status, types.APIResponse{
		Success: true,
		Data:    data,
		Meta:    meta,
	})
}

func WriteError(c *gin.Context, status int, err error) {
	c.JSON(status, types.APIResponse{
		Success: false,
		Error: &types.ErrorInfo{
			Messege: err.Error(),
		},
	})

}
