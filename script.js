let allIssues = [];
// this function api er  allarray element thake   new arraycreate kore
const labelElement = (arr)=>{
    const htmlElement = arr.map((el)=>`<span class="  badge bg-amber-200 text-[12px]">${el}</span>`)
   return (htmlElement.join(" "))
}

// all isssue to new issue length create korar jonno
const updateIssueCount = (data) => {
    const issueCount = document.getElementById('issue-count');
     issueCount.textContent = data.length;
}

const allCardData = () => {
    const url = ('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            allIssues = data.data;
            updateIssueCount(allIssues);
            displayCardData(allIssues);
        })
}

// all card er dynamically display korar jonno
const displayCardData = (datas) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ""
    datas.forEach(data => {
        const newDiv = document.createElement("div")
        newDiv.innerHTML = `
        <div class="border-t-4 ${data.status == 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'} rounded-md shadow-lg p-4 space-y-2 flex flex-col h-full">
            <div class="flex justify-between">
                <img src="${data.status == 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                <p class="badge rounded-md p-2 ${data.priority == 'high' ? 'bg-red-200 text-[#EF4444]' : data.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-gray-200 text-gray-600'}">${data.priority}</p>
            </div>
            <h2 class="font-medium text-xl line-clamp-2">${data.title}</h2>
            <p class="line-clamp-2 text-gray-400">${data.description}</p>
            <div>${labelElement(data.labels)}</div>
            <hr class="text-gray-300">
            <div class="flex flex-col gap-3">
                <span class="text-[#64748B] text-[12px]">${data.author}</span>
                <span class="text-[#64748B] text-[12px]">${data.createdAt}</span>
            </div>
            <div class="flex flex-col gap-3">
                <span class="text-[#64748B] text-[12px]">${data.assignee}</span>
                <span class="text-[#64748B] text-[12px]">${data.updatedAt}</span>
            </div>
        </div>`
        cardContainer.appendChild(newDiv);
    });
}

// all,open and closed button toggle korar jonno
const btnFilters = () => {
    const btnAll = document.getElementById('filter-all');
    const btnOpen = document.getElementById('filter-open');
    const btnClosed = document.getElementById('filter-closed');

    const setActive = (activeBtn) => {
        [btnAll, btnOpen, btnClosed].forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-ghost');
        });
        activeBtn.classList.remove('btn-ghost');
        activeBtn.classList.add('btn-primary');
    };

    btnAll.addEventListener('click', () => {
        setActive(btnAll);
        updateIssueCount(allIssues);
        displayCardData(allIssues);
    });

    btnOpen.addEventListener('click', () => {
        setActive(btnOpen);
        const filtered = allIssues.filter(ele => ele.status === 'open');
        updateIssueCount(filtered);
        displayCardData(filtered);
    });

    btnClosed.addEventListener('click', () => {
        setActive(btnClosed);
        const filtered = allIssues.filter(ele => ele.status === 'closed');
        updateIssueCount(filtered);
        displayCardData(filtered);
    });
}


allCardData();
btnFilters();