const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages", () => {
  const input = {
    "www.example.com": 1,
    "www.example.com/path": 3,
  };
  const expectedOutput = [
    ["www.example.com/path", 3],
    ["www.example.com", 1],
  ];

  expect(sortPages(input)).toEqual(expectedOutput);
});

test("sortPages 5 pages", () => {
  const input = {
    "www.example.com": 1,
    "www.example.com/path": 3,
    "www.example.com/path3": 15,
    "www.example.com/path2": 2,
    "www.example.com/path4": 5,
  };
  const expectedOutput = [
    ["www.example.com/path3", 15],
    ["www.example.com/path4", 5],
    ["www.example.com/path", 3],
    ["www.example.com/path2", 2],
    ["www.example.com", 1],
  ];

  expect(sortPages(input)).toEqual(expectedOutput);
});
