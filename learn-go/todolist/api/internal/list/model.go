package list

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type List struct {
	gorm.Model
	ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid();->"`
	Title       string    `gorm:"type:varchar(150);not null"`
	Description *string   `gorm:"type:text"`
	UserId      uuid.UUID
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
