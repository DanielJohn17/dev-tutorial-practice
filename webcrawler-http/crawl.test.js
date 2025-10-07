const { normalizeUrl, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl strip protocol", () => {
  const input = "https://www.example.com/path";
  const expectedOutput = "www.example.com/path";
  expect(normalizeUrl(input)).toEqual(expectedOutput);
});

test("normalizeUrl strip trailing slash", () => {
  const input = "https://www.example.com/path/";
  const expectedOutput = "www.example.com/path";
  expect(normalizeUrl(input)).toEqual(expectedOutput);
});

test("normalizeUrl Capitals", () => {
  const input = "https://www.EXAMPLE.com/path/";
  const expectedOutput = "www.example.com/path";
  expect(normalizeUrl(input)).toEqual(expectedOutput);
});

test("normalizeUrl strip http", () => {
  const input = "http://www.example.com/path/";
  const expectedOutput = "www.example.com/path";
  expect(normalizeUrl(input)).toEqual(expectedOutput);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="https://www.example.com/">
            Example
        </a>
    </body>
</html>
  `;
  const inputBaseURL = "https://www.example.com";
  const expectedOutput = ["https://www.example.com/"];
  expect(getURLsFromHTML(inputHTMLBody, inputBaseURL)).toEqual(expectedOutput);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            Example
        </a>
    </body>
</html>
  `;
  const inputBaseURL = "https://www.example.com";
  const expectedOutput = ["https://www.example.com/path/"];
  expect(getURLsFromHTML(inputHTMLBody, inputBaseURL)).toEqual(expectedOutput);
});

test("getURLsFromHTML both", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="https://www.example.com/path1/">
            Example path one
        </a>
        <a href="/path2/">
            Example path two
        </a>
    </body>
</html>
  `;
  const inputBaseURL = "https://www.example.com";
  const expectedOutput = [
    "https://www.example.com/path1/",
    "https://www.example.com/path2/",
  ];
  expect(getURLsFromHTML(inputHTMLBody, inputBaseURL)).toEqual(expectedOutput);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
<html>
    <body>
        <a href="invlid">
            Example
        </a>
    </body>
</html>
  `;
  const inputBaseURL = "https://www.example.com";
  const expectedOutput = [];
  expect(getURLsFromHTML(inputHTMLBody, inputBaseURL)).toEqual(expectedOutput);
});
