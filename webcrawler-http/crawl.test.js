const { normalizeUrl } = require("./crawl.js");
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
