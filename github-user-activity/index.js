#!/usr/bin/env node

const { formatPrint } = require("./formatter.js");

main();

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error("Usage: github-activity <github-username>");
    process.exit(1);
  }

  const username = args[0];
  getUserActivity(username);
}

async function getUserActivity(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events`, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    if (!res.ok) {
      console.error("Error fetching user activity. Please check the username.");
      process.exit(1);
    }

    const events = await res.json();

    if (events.length === 0) {
      console.log("No recent activity found for this user.");
      process.exit(0);
    }

    console.log("- Output");
    formatPrint(events);
  } catch (error) {
    console.error(
      "Error fetching user activity Please check your internet connection.",
    );
    process.exit(1);
  }
  process.exit(0);
}
