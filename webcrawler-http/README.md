# Webcrawler HTTP

This project is a simple web crawler implemented in Node.js. It fetches web pages, extracts links, and generates reports based on the crawled data.

## Features

- Crawl web pages and extract links
- Generate crawl reports
- Unit tests for core functionality

## Project Structure

- `crawl.js`: Main crawling logic
- `report.js`: Report generation logic
- `index.js`: Entry point for running the crawler
- `crawl.test.js`: Tests for crawling logic
- `report.test.js`: Tests for report logic
- `package.json`: Project metadata and dependencies

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)

### Installation

1. Clone the repository:
   ```zsh
   git clone https://github.com/DanielJohn17/dev-tutorial-practice.git
   cd dev-tutorial-practice/webcrawler-http
   ```
2. Install dependencies:
   ```zsh
   npm install
   ```

### Usage

Run the crawler:

```zsh
node index.js <URL>
```

Replace `<URL>` with the website you want to crawl.

### Testing

Run all tests:

```zsh
npm test
```
