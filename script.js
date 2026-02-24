let interviewList = [];
let rejectedList = [];
let currentStatus = "All";

const totalJobsCount = document.getElementById("total-jobs");
const totalInterviewCount = document.getElementById("total-interview");
const totalRejectedCount = document.getElementById("total-rejected");
const availableTotalJobs = document.getElementById("available-total-jobs");

const allJobsBtn = document.getElementById("all-jobs-btn");
const interviewJobsbtn = document.getElementById("interview-jobs-btn");
const rejectedJobsbtn = document.getElementById("rejected-jobs-btn");

const totalJobsSection = document.getElementById("allCards");
const jobsCards = document.querySelector(".allCard");
const mainContainer = document.querySelector("main");

const filteringCardsSection = document.getElementById("filteringCards");
const filteringCard = document.querySelector(".filteringCard");

function totalCalculate(count) {
  totalJobsCount.innerText = jobsCards.children.length;
  totalInterviewCount.innerText = interviewList.length;
  totalRejectedCount.innerText = rejectedList.length;

  if (currentStatus == "interview-jobs-btn") {
    availableTotalJobs.innerText = `${interviewList.length} of ${jobsCards.children.length} jobs`;
  } else if (currentStatus == "rejected-jobs-btn") {
    availableTotalJobs.innerText = `${rejectedList.length} of ${jobsCards.children.length} jobs`;
  } else {
    availableTotalJobs.innerText = `${jobsCards.children.length} of ${jobsCards.children.length} jobs`;
  }
}

totalCalculate();

// all, interviw, rejected button toggle
function toggleEvent(id) {
  allJobsBtn.classList.add("bg-white");
  interviewJobsbtn.classList.add("bg-white");
  rejectedJobsbtn.classList.add("bg-white");

  allJobsBtn.classList.remove("bg-[#3B82F6]");
  interviewJobsbtn.classList.remove("bg-[#3B82F6]");
  rejectedJobsbtn.classList.remove("bg-[#3B82F6]");

  const selectId = document.getElementById(id);
  currentStatus = id;

  selectId.classList.remove("bg-white");
  selectId.classList.add("bg-[#3B82F6]");

  if (id == "interview-jobs-btn") {
    filteringCard.classList.remove("hidden");
    jobsCards.classList.add("hidden");
    totalCalculate();
    interviewCardsRendaring();
  } else if (id == "all-jobs-btn") {
    jobsCards.classList.remove("hidden");
    filteringCard.classList.add("hidden");
    totalCalculate(jobsCards.children.length);
  } else if (id == "rejected-jobs-btn") {
    filteringCard.classList.remove("hidden");
    jobsCards.classList.add("hidden");
    totalCalculate();
    rejectedCardsRendaring();
  }
}

mainContainer.addEventListener("click", function (event) {
  if (event.target.closest(".delete-btn")) {
    const cardDelete = event.target.closest(".flex.justify-between");
    const companyName = cardDelete.querySelector(".companyName").innerText;

    interviewList = interviewList.filter(
      (item) => item.companyName !== companyName,
    );
    rejectedList = rejectedList.filter(
      (item) => item.companyName != companyName,
    );

    cardDelete.remove();

    if (currentStatus == "interview-jobs-btn") {
      interviewCardsRendaring();
    } else if (currentStatus == "rejected-jobs-btn") {
      rejectedCardsRendaring();
    }

    totalCalculate();
  }

  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".companyName").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status = (parentNode.querySelector(".status").innerText =
      "INTERVIEW");
    const description = parentNode.querySelector(".description").innerText;

    // status text color change
    const statusChange = parentNode.querySelector(".status");
    statusChange.classList.remove("text-red-500");
    statusChange.classList.add("text-green-500");

    const cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      status: "INTERVIEW",
      description,
    };

    const clickedCardExist = interviewList.find(
      (card) => card.companyName === cardInfo.companyName,
    );

    if (!clickedCardExist) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.companyName != cardInfo.companyName,
    );

    if (currentStatus == "rejected-jobs-btn") {
      rejectedCardsRendaring();
    }
    totalCalculate();
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".companyName").innerText;
    const position = parentNode.querySelector(".position").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const status = (parentNode.querySelector(".status").innerText = "REJECTED");
    const description = parentNode.querySelector(".description").innerText;

    // status text color change
    const statusChange = parentNode.querySelector(".status");
    statusChange.classList.remove("text-green-500");
    statusChange.classList.add("text-red-500");

    const cardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      status: "REJECTED",
      description,
    };

    const clickedCardExist = rejectedList.find(
      (card) => card.companyName === cardInfo.companyName,
    );

    if (!clickedCardExist) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.companyName != cardInfo.companyName,
    );

    if (currentStatus == "interview-jobs-btn") {
      interviewCardsRendaring();
    }

    totalCalculate();
  }
});

function interviewCardsRendaring() {
  if (interviewList.length > 0) {
    filteringCard.innerHTML = "";

    for (let interview of interviewList) {
      let div = document.createElement("div");
      div.className = "flex justify-between bg-white p-6 rounded-lg";
      div.innerHTML = `<!-- content -->
                    <div class="space-y-4">
                        <h1 class="companyName font-bold text-[20px]">
                            ${interview.companyName}
                        </h1>
                        <p class="position text-sm text-gray-500">
                            ${interview.position}
                        </p>

                        <div class="flex text-sm text-gray-500">
                            <span class="location">${interview.location}</span>
                            <span class="mx-2 text-gray-400">•</span>
                            <span class="type">${interview.type}</span>
                            <span class="mx-2 text-gray-400">•</span>
                            <span class="salary">${interview.salary}</span>
                        </div>

                        <span class="status bg-[#EEF4FF] px-3 py-1 rounded-lg inline-block text-green-500">
                            ${interview.status}
                        </span>

                        <p class="description text-sm text-gray-500 ">
                            ${interview.description}
                        </p>

                        <div class="flex gap-4">
                            <button
                                class="interview-btn px-5 py-2 font-bold rounded-lg border border-green-300 text-green-500 hover:border-green-500 hover:text-green-300 ">
                                INTERVIEW
                            </button>

                            <button
                                class="rejected-btn px-5 py-2 font-bold rounded-lg border border-red-300 text-red-500 hover:border-red-500 hover:text-red-300 ">
                                REJECTED
                            </button>
                        </div>
                    </div> `;

      filteringCard.appendChild(div);
    }
  } else {
    filteringCard.innerHTML = `
      <div class="space-y-4 bg-white text-center p-8">
        <div><img class="inline-block" src="./jobs.png" alt=""></div>
        <div>
          <h1 class="font-bold text-[20px]">No jobs available</h1>
          <p class="text-sm text-gray-500">Check back soon for new job opportunities</p>
        </div>
      </div>
    `;
  }
}

function rejectedCardsRendaring() {
  if (rejectedList.length > 0) {
    filteringCard.innerHTML = "";

    for (let rejected of rejectedList) {
      let div = document.createElement("div");
      div.className = "flex justify-between bg-white p-6 rounded-lg";
      div.innerHTML = `<!-- content -->
                    <div class="space-y-4">
                        <h1 class="companyName font-bold text-[20px]">
                            ${rejected.companyName}
                        </h1>
                        <p class="position text-sm text-gray-500">
                            ${rejected.position}
                        </p>

                        <div class="flex text-sm text-gray-500">
                            <span class="location">${rejected.location}</span>
                            <span class="mx-2 text-gray-400">•</span>
                            <span class="type">${rejected.type}</span>
                            <span class="mx-2 text-gray-400">•</span>
                            <span class="salary">${rejected.salary}</span>
                        </div>

                        <span class="status  bg-[#EEF4FF] px-3 py-1 rounded-lg inline-block text-red-500">
                            ${rejected.status}
                        </span>

                        <p class="description text-sm text-gray-500 ">
                            ${rejected.description}
                        </p>

                        <div class="flex gap-4">
                            <button
                                class="interview-btn px-5 py-2 font-bold rounded-lg border border-green-300 text-green-500 hover:border-green-500 hover:text-green-300 ">
                                INTERVIEW
                            </button>

                            <button
                                class="rejected-btn px-5 py-2 font-bold rounded-lg border border-red-300 text-red-500 hover:border-red-500 hover:text-red-300 ">
                                REJECTED
                            </button>
                        </div>
                    </div> `;

      filteringCard.appendChild(div);
    }
  } else {
    filteringCard.innerHTML = `
      <div class="space-y-4 bg-white text-center p-8">
        <div><img class="inline-block" src="./jobs.png" alt=""></div>
        <div>
          <h1 class="font-bold text-[20px]">No jobs available</h1>
          <p class="text-sm text-gray-500">Check back soon for new job opportunities</p>
        </div>
      </div>
    `;
  }
}
