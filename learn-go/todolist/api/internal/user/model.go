package user

import (
	"time"

	"github.com/DanielJohn17/dev-tutorial-practice/learn-go/todolist/api/internal/list"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID        uuid.UUID   `gorm:"type:uuid;primaryKey;default:gen_random_uuid();->"`
	Name      string      `gorm:"type:varchar(150);not null"`
	Email     string      `gorm:"type:varchar(150);unique;not null"`
	Age       uint        `gorm:"check:age >= 5 AND age <= 100"`
	Password  string      `gorm:"type:varchar(150);not null"`
	Lists     []list.List `gorm:"onDelete:CASCADE"`
	createdAt time.Time
	updatedAt time.Time
}
