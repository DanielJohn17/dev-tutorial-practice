package headers

import (
	"bytes"
	"fmt"
	"regexp"
	"strings"
)

var crlf = []byte("\r\n")

func isToken(input string) bool {
	re := regexp.MustCompile(`^[A-Za-z0-9!#$%&'*+\-\.\^_` + "`" + `|~]+$`)
	return re.MatchString(input)
}

func parseHeader(line []byte) (string, string, error) {
	parts := bytes.SplitN(line, []byte(":"), 2)

	if len(parts) != 2 {
		return "", "", fmt.Errorf("Malformed field line")
	}

	name := parts[0]
	value := bytes.TrimSpace(parts[1])

	if bytes.HasSuffix(name, []byte(" ")) {
		return "", "", fmt.Errorf("Malformed field name")
	}

	return string(name), string(value), nil
}

type Headers struct {
	headers map[string]string
}

func NewHeaders() *Headers {
	return &Headers{headers: map[string]string{}}
}

func (h *Headers) Get(name string) string {
	return h.headers[strings.ToLower(name)]
}

func (h *Headers) Set(name, value string) {
	h.headers[strings.ToLower(name)] = value
}

func (h *Headers) Parse(data []byte) (int, bool, error) {
	read := 0
	done := false

	for {
		idx := bytes.Index(data[read:], crlf)

		if idx == -1 {
			break
		}

		if idx == 0 {
			done = true
			read += len(crlf)
			break
		}

		name, value, err := parseHeader(data[read : read+idx])
		if err != nil {
			return 0, done, err
		}

		if !isToken(name) {
			return 0, false, fmt.Errorf("Malformed header name")
		}

		read += idx + len(crlf)
		h.Set(name, value)
	}

	return read, done, nil

}
