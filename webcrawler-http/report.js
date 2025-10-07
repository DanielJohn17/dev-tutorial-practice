function printReport(pages) {
  console.log("==========");
  console.log("REPORT");
  console.log("==========");

  const sortedPages = sortPages(pages);

  for (const sortedPage of sortedPages) {
    console.log(`Found ${sortedPage[1]} links on page: ${sortedPage[0]}`);
  }

  console.log("==========");
  console.log("END REPORT");
  console.log("==========");
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages).sort((a, b) => b[1] - a[1]);

  return pagesArr;
}

module.exports = { sortPages, printReport };
