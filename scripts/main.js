const loadAllIssue = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllIssue(data.data));
};

// "id": 2,
//       "title": "Add dark mode support",
//       "description": "Users are requesting a dark mode option. This would improve accessibility and user experience.",
//       "status": "open",
//       "labels": [
//         "enhancement",
//         "good first issue"
//       ],
//       "priority": "medium",
//       "author": "sarah_dev",
//       "assignee": "",
//       "createdAt": "2024-01-14T14:20:00Z",
//       "updatedAt": "2024-01-16T09:15:00Z"

function showAllIssue(issues) {
  const allIssue = document.getElementById("all-issue");
  allIssue.innerHTML = " ";
  for (const issue of issues) {
    const issueCard = document.createElement("div");

    // conditional rendering for status
    let borderColor = "";
    let statusIcon = "";
    if (issue.status === "open") {
      borderColor = " bg-green-500";
      statusIcon = `
        <div
                  class="p-1 rounded-full bg-green-100 text-lg"
                >
                  <img src="./assets/Open-Status.png" alt="" />
                </div>
        `;
    } else {
      borderColor = " bg-purple-500";
      statusIcon = `
        <div
                  class="p-1 rounded-full bg-purple-100 text-lg"
                >
                  <img src="./assets/Closed-Status.png" alt="" />
                </div>
        `;
    }

    // conditional rendering for priority
    let priorityText = "";
    let priorityBg = "";
    if (issue.priority === "high") {
      priorityText = "text-red-500";
      priorityBg = "bg-red-100";
    } else if (issue.priority === "medium") {
      priorityText = "text-yellow-500";
      priorityBg = "bg-yellow-100";
    } else {
      priorityText = "text-gray-500";
      priorityBg = "bg-gray-100";
    }

    // conditional rendering for showing the label process
    let labelIcon = "";
    let labelStyle = "";

    const cardLabel = issue.labels
      .map((label) => {
        console.log(label);

        if (label === "bug") {
          labelIcon = "<i class='fa-solid fa-bug'></i>";
          labelStyle = "border-red-300 text-red-500 bg-red-50";
        } else if (label === "help wanted") {
          labelIcon = "<i class='fa-solid fa-triangle-exclamation'></i>";
          labelStyle = "border-yellow-300 text-yellow-500 bg-yellow-50";
        } else if (label === "enhancement") {
          labelIcon = "<i class='fa-regular fa-lightbulb'></i>";
          labelStyle = "border-green-300 text-green-500 bg-green-50";
        } else if (label === "good first issue") {
          labelIcon = "<i class='fa-brands fa-gg'></i>";
          labelStyle = "border-blue-300 text-blue-500 bg-blue-50";
        } else {
          labelIcon = "<i class='fa-regular fa-clipboard'></i>";
          labelStyle = "border-gray-300 text-gray-500 bg-gray-50";
        }

        return `
        <span
        class="flex justify-center items-center text-xs px-3 py-1 rounded-full border ${labelStyle}"
        >
            ${labelIcon}
            ${label}
        </span>
        `;
      })
      .join("");

    issueCard.innerHTML = `
    <div
            class="bg-white h-full rounded-xl shadow-md border border-gray-200 overflow-hidden"
          >
            <div class="h-1 ${borderColor}"></div>

            <div class="p-4 space-y-4">
              <div class="flex justify-between items-start">
                ${statusIcon}
                <span
                  class="text-xs font-semibold px-3 py-1 rounded-full ${priorityText} ${priorityBg} "
                >
                  ${issue.priority}
                </span>
              </div>

              <h2 class="font-semibold text-gray-800 text-lg leading-snug">
                ${issue.title}
              </h2>

              <p class="text-sm text-gray-500">
                ${issue.description}
              </p>

              <div class="flex flex-wrap gap-2">
                ${cardLabel}
              </div>
            </div>

            <div class="px-4 py-3 text-sm text-gray-500 border-t border-gray-300">
              <p>${issue.author}</p>
              <p>${issue.updatedAt}</p>
            </div>
          </div>
    `;
    allIssue.append(issueCard);
    // console.log(issue);
  }
}

loadAllIssue();
