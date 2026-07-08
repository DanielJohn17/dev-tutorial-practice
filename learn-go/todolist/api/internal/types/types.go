package types

type APIResponse struct {
	Success bool       `json:"success"`
	Data    any        `json:"data"`
	Error   *ErrorInfo `json:"error,omitempty"`
	Meta    *Meta      `json:"meta,omitempty"`
}

type ErrorInfo struct {
	Message string `json:"messege"`
}

type Meta struct {
	Page       uint `json:"page,omitempty"`
	Limit      uint `json:"limit,omitempty"`
	Total      uint `json:"total,omitempty"`
	TotalPages uint `json:"total_pages,omitempty"`
}
