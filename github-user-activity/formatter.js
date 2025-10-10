function formatPrint(events) {
  events.map((event) => {
    const name = event.repo.name;
    const type = event.type;
    const action = event.payload.action;

    const refType = event.payload.ref_type;
    const ref = event.payload.ref ? `${event.payload.ref}` : "";

    process.stdout.write("\t");
    if (type === "PushEvent") {
      const commitCount = event.payload.commits.length;
      console.log(`- Pushed ${commitCount} commit(s) to ${name}`);
    } else if (type === "PullRequestEvent") {
      console.log(
        `- ${capitalizeFirstLetter(action)} a pull request at ${name}`,
      );
    } else if (type === "IssuesEvent") {
      console.log(
        `- ${capitalizeFirstLetter(action)} ${action === "opened" ? "a new" : "an"} issue in ${name}`,
      );
    } else if (type === "IssueCommentEvent") {
      console.log(`- Commented on an issue in ${name}`);
    } else if (type === "WatchEvent") {
      console.log(`- Starred ${name}`);
    } else if (type === "ForkEvent") {
      console.log(`- Forked ${name}`);
    } else if (type === "CreateEvent") {
      console.log(`- Created ${refType} ${ref} in ${name}`);
    } else if (type === "DeleteEvent") {
      console.log(`- Deleted ${refType} ${ref} in ${name}`);
    } else {
      console.log(`- ${type} at ${name}`);
    }
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = { formatPrint };
