package helper

import (
	"math"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/types"
	"github.com/gin-gonic/gin"
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

func WriteJson(c *gin.Context, status int, data any, meta *types.Meta) {
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
