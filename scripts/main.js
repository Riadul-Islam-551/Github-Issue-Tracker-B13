const allButton = document.getElementById("all-button");
const openedButton = document.getElementById("opened-button");
const closedButton = document.getElementById("closed-button");
const allIssue = document.getElementById("all-issue");
const loadingIssue = document.getElementById("loading-issue");
const totalIssues = document.getElementById("total-issue");

const showTotalIssues = (issues) => {
  totalIssues.innerText = issues.length;
};

// console.log(totalIssues.innerText)

//set the loading spinner
const manageLoading = (status) => {
  if (status == true) {
    loadingIssue.classList.remove("hidden");
    allIssue.classList.add("hidden");
  } else {
    loadingIssue.classList.add("hidden");
    allIssue.classList.remove("hidden");
  }
};

let allIssuesData = [];

// load all issue data
const loadAllIssue = () => {
  manageLoading(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allIssuesData = data.data;
      showAllIssue(allIssuesData);
    });
};

// load single issue details
const loadSingleDetails = (id) => {
  manageLoading(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((details) => showSingleDetails(details.data));
};

function showSingleDetails(details) {
  const issueDetailsModal = document.getElementById("issue-details-modal");

  // conditional rendering for showing the label process
  let labelIcon = "";
  let labelStyle = "";

  const detailsLabel = details.labels
    .map((label) => {
      // console.log(label);

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

  // conditional rendering for priority
  let priorityText = "";
  let priorityBg = "";
  if (details.priority === "high") {
    priorityText = "text-red-500";
    priorityBg = "bg-red-100";
  } else if (details.priority === "medium") {
    priorityText = "text-yellow-500";
    priorityBg = "bg-yellow-100";
  } else {
    priorityText = "text-gray-500";
    priorityBg = "bg-gray-100";
  }

  //assignee conditional rendering
  let assigneeTask = "";
  if (details.assignee === "") {
    assigneeTask = "Unassigned";
  } else {
    assigneeTask = details.assignee;
  }

  issueDetailsModal.innerHTML = `
  
                <div
                  class="max-w-2xl mx-auto bg-gray-100 rounded-xl p-6 shadow-sm border border-gray-200"
                >
                  <h2 class="text-xl font-semibold text-gray-800 mb-3">
                    ${details.title}
                  </h2>

                  <div
                    class="flex items-center gap-3 text-sm text-gray-500 mb-4"
                  >
                    <span
                      class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium"
                    >
                      Opened
                    </span>
                    <span>Opened by ${details.author}</span>
                    <span>•</span>
                    <span>${details.updatedAt}</span>
                  </div>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    ${detailsLabel}
                  </div>

                  <!-- Description -->
                  <p class="text-gray-600 mb-6">
                    ${details.description}
                  </p>

                  <!-- Footer -->
                  <div
                    class="bg-gray-200 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <p class="text-sm text-gray-500">Assignee:</p>
                      <p class="font-semibold text-gray-800">${assigneeTask}</p>
                    </div>

                    <div class="text-right">
                      <p class="text-sm text-gray-500 mb-1">Priority:</p>
                      <span
                        class="${priorityBg} ${priorityText} text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        ${details.priority}
                      </span>
                    </div>
                  </div>
                </div>
  
  `;
  document.getElementById("my_modal_5").showModal();
  manageLoading(false);
  // console.log(details);
}

function showAllIssue(issues) {
  showTotalIssues(issues);
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
        // console.log(label);

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
          onClick="loadSingleDetails(${issue.id})"  class="bg-white h-full rounded-xl shadow-md border border-gray-200 overflow-hidden"
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
  manageLoading(false);
}

//add active button style
openedButton.addEventListener("click", function () {
  allButton.classList.remove("btn-primary", "text-base-100");
  openedButton.classList.add("btn-success", "text-base-100");
  closedButton.classList.remove("bg-purple-600", "text-base-100");

  const openIssues = allIssuesData.filter((issue) => issue.status === "open");
  showTotalIssues(openIssues);
  showAllIssue(openIssues);
});

closedButton.addEventListener("click", function () {
  allButton.classList.remove("btn-primary", "text-base-100");
  openedButton.classList.remove("btn-success", "text-base-100");
  closedButton.classList.add("bg-purple-600", "text-base-100");

  const closeIssues = allIssuesData.filter(
    (issue) => issue.status === "closed",
  );
  showTotalIssues(closeIssues);
  showAllIssue(closeIssues);
});

allButton.addEventListener("click", function () {
  allButton.classList.add("btn-primary", "text-base-100");
  openedButton.classList.remove("btn-success", "text-base-100");
  closedButton.classList.remove("bg-purple-600", "text-base-100");

  showAllIssue(allIssuesData);
});

loadAllIssue();

//search implementation
document.getElementById("search-btn").addEventListener("click", function () {
  const searchInput = document.getElementById("input-search");
  const searchValue = searchInput.value.trim().toLowerCase();

  // console.log(searchValue);
  // console.log(allIssuesData);

  const filteredData = allIssuesData.filter((filteredIssue) => {
    return filteredIssue.title.toLowerCase().includes(searchValue);
  });

  allButton.classList.add("btn-primary", "text-base-100");
  openedButton.classList.remove("btn-success", "text-base-100");
  closedButton.classList.remove("bg-purple-600", "text-base-100");

  // console.log(filteredData);
  showAllIssue(filteredData);
});
