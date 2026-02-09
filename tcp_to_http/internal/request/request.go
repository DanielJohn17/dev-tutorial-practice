package request

import (
	"errors"
	"fmt"
	"io"
	"strings"
)

type RequestLine struct {
	HttpVersion   string
	RequestTarget string
	Method        string
}

type Request struct {
	RequestLine RequestLine
}

var ERROR_MALFORMED_REQUEST_LINE = fmt.Errorf("Malformed request line")
var ERROR_UNSUPPORTED_HTTP = fmt.Errorf("Unsupported HTTP Version")
var SEPARATOR = "\r\n"

func parseFromRequestLine(b string) (*RequestLine, string, error) {
	idx := strings.Index(b, SEPARATOR)

	if idx == -1 {
		return nil, b, ERROR_MALFORMED_REQUEST_LINE
	}

	startLine := b[:idx]
	restOfMsg := b[idx+1:]

	parts := strings.Split(startLine, " ")

	if len(parts) != 3 {
		return nil, b, ERROR_MALFORMED_REQUEST_LINE
	}

	httpParts := strings.Split(parts[2], "/")

	if len(httpParts) != 2 || httpParts[0] != "HTTP" || httpParts[1] != "1.1" {
		return nil, b, ERROR_UNSUPPORTED_HTTP
	}

	rl := &RequestLine{
		Method:        parts[0],
		RequestTarget: parts[1],
		HttpVersion:   httpParts[1],
	}

	return rl, restOfMsg, nil
}

func RequestFromReader(reader io.Reader) (*Request, error) {

	data, err := io.ReadAll(reader)
	if err != nil {
		return nil, errors.Join(fmt.Errorf("Unable to io.ReadAll"), err)
	}
	requestLine, _, err := parseFromRequestLine(string(data))

	if err != nil {
		return nil, err
	}

	return &Request{RequestLine: *requestLine}, err
}
