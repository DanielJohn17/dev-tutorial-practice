package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type LocationAreaResponse struct {
	Results []LocationArea `json:"results"`
}

type LocationArea struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}

var offset = 0

func getLocation(url string) error {
	var locationAreaResponse LocationAreaResponse

	response, err := http.Get(url)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if err := parseBody(response.Body, &locationAreaResponse); err != nil {
		return err
	}

	for _, area := range locationAreaResponse.Results {
		fmt.Println(area.Name)
	}

	return nil
}

func parseBody(body io.ReadCloser, v *LocationAreaResponse) error {
	data, err := io.ReadAll(body)
	if err != nil {
		return err
	}

	parseErr := json.Unmarshal(data, &v)

	return parseErr
}

func handleOffset(o int) {
	if offset+o < 0 {
		offset = 0
	} else {
		offset += o
	}
}
