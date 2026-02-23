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

func (h *Headers) Get(name string) (string, bool) {
	str, ok := h.headers[strings.ToLower(name)]
	return str, ok
}

func (h *Headers) Set(name, value string) {
	name = strings.ToLower(name)
	if v, ok := h.headers[name]; ok {
		h.headers[name] = fmt.Sprintf("%s, %s", v, value)
	} else {
		h.headers[name] = value
	}
}

func (h *Headers) ForEach(cb func(k, v string)) {
	for k, v := range h.headers {
		cb(k, v)
	}
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
