package list

type ListCreate struct {
	Title       string  `json:"title"       validate:"required,min=3,max=150"`
	Description *string `json:"description" validate:"omitempty,min=3,max=500"`
}

type ListUpdate struct {
	Title       *string `json:"title"       validate:"omitempty,min=3,max=150"`
	Description *string `json:"description" validate:"omitempty,min=3,max=500"`
}
