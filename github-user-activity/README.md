# GitHub User Activity CLI

A tiny Node.js command-line tool to print a GitHub user's recent public activity in a friendly, human-readable format.

- Fetches recent public events via the GitHub REST API
- Summarizes pushes, pull requests, issues, stars, forks, create/delete events, and more
- Simple CLI with clear exit codes

**Project Link** [Roadmap.sh](https://roadmap.sh/projects/github-user-activity)

## Requirements

- Node.js 18+ (uses the global `fetch` API available in Node 18 and later)
- Internet access to query the GitHub API

## Install

```bash
mkdir github-activity
cd github-activity
git init
git remote add -f origin https://github.com/DanielJohn17/dev-tutorial-practice
git config core.sparseCheckout true
echo "github-user-activity/*" >> .git/info/sparse-checkout
git pull origin main
```

### Run from source

```bash
# From the project root
cd github-user-activity

# Run the CLI with Node
node index.js <github-username>
```

### Global install (from local folder)

From the `github-user-activity` folder:

```bash
# Install globally from the local folder
npm install -g .

# Now the binary is available as `github-activity`
github-activity <github-username>
```

Alternatively, for development you can use npm link:

```bash
npm link
# Use the command
github-activity <github-username>
# When done
npm unlink -g github-user-activity
```

## Usage

```bash
github-activity <github-username>
```

- Prints a short summary of the user's most recent public events.
- If no username is provided, the tool prints usage and exits with code 1.

### Example

```bash
github-activity octocat
```

Example output:

```
- Output
	- Pushed 2 commit(s) to octocat/Hello-World
	- Opened a pull request at octocat/Spoon-Knife
	- Commented on an issue in octocat/Hello-World
	- Starred octocat/Spoon-Knife
```

Note: Only public activity is shown (as returned by the GitHub API). GitHub limits the number of recent events it returns.

## Exit codes

- 0: Success (including the case where no recent activity is found)
- 1: Error (bad usage, network issues, or an API error)

## Troubleshooting

- Rate limits: Unauthenticated GitHub API requests are rate limited. If you hit a limit, wait a bit and try again.
- Username typos: Ensure the GitHub username is correct if you see an error fetching activity.
- Node version: Make sure you're on Node 18+ so `fetch` is available globally.
- Network/proxy: Confirm your network allows outgoing HTTPS requests to `api.github.com`.

## Development

Project structure:

```
.
├── index.js       # CLI entry; fetches events and prints output
├── formatter.js   # Output formatting helpers
└── package.json   # Package metadata and CLI bin
```

Local dev tips:

- Use `node index.js <user>` during development, or `npm link` to test the installed binary name (`github-activity`).
- Keep an eye on GitHub API changes and event payload shapes if you enhance formatting.

## License

ISC © DanielJohn17
