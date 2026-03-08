let allIssues = [];
// this function api  er labels array   theke akta kore label annar jonno
const labelElement = (arr)=>{
    const htmlElement = arr.map((el)=>`<span class="  badge bg-amber-200 text-[12px]">${el}</span>`)
   return (htmlElement.join(" "))
}

// all isssue to new issue length create korar jonno
const updateIssueCount = (data) => {
    const issueCount = document.getElementById('issue-count');
     issueCount.textContent = data.length;
}

// loading spinner function
const manageSpinner = (status) =>{
   if(status == true){
     document.getElementById('spinner').classList.remove("hidden")
     document.getElementById('card-container').classList.add("hidden")
   }else{
    document.getElementById('card-container').classList.remove("hidden")
     document.getElementById('spinner').classList.add("hidden")
   }
}

const allCardData = () => {
    manageSpinner(true)
    const url = ('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            allIssues = data.data;
            updateIssueCount(allIssues);
            displayCardData(allIssues);
            manageSpinner(false)
        })
}

// all card er dynamically display korar jonno
const displayCardData = (datas) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ""
    datas.forEach(data => {
        const newDiv = document.createElement("div")
        newDiv.innerHTML = `
        <div  onclick='modalDetails(${data.id})'  class="border-t-4 ${data.status == 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'} rounded-md shadow-lg p-4 space-y-2 flex flex-col h-full">
            <div class="flex justify-between">
                <img src="${data.status == 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                <p class="badge rounded-md p-2 ${data.priority == 'high' ? 'bg-red-200 text-[#EF4444]' : data.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-gray-200 text-gray-600'}">${data.priority}</p>
            </div>
            <h2 class="font-medium text-xl line-clamp-2">${data.title}</h2>
            <p class="line-clamp-2 text-gray-400">${data.description}</p>
            <div>${labelElement(data.labels)}</div>
            <hr class="text-gray-300">
            <div class="flex flex-col gap-1">
                <span class="text-[#64748B] text-[12px]"># ${data.id} by ${data.author}</span>
                <span class="text-[#64748B] text-[12px]">${new Date(data.createdAt).toDateString()}</span>
            </div>
            <div class="flex flex-col gap-1">
                <span class="text-[#64748B] text-[12px]">${data.assignee}</span>
                <span class="text-[#64748B] text-[12px]">${new Date(data.updatedAt).toDateString()}</span>
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
        manageSpinner(true)
        // settimeout diche sudu loading spinner dekar jonno
        setTimeout(() => {
            const filtered = allIssues.filter(ele => ele.status === 'open');
        updateIssueCount(filtered);
        displayCardData(filtered);
        manageSpinner(false)
        }, 100);
    });

    btnClosed.addEventListener('click', () => {
        setActive(btnClosed);
        manageSpinner(true)
        setTimeout(()=>{
        const filtered = allIssues.filter(ele => ele.status === 'closed');
        updateIssueCount(filtered);
        displayCardData(filtered);
        manageSpinner(false)
        },100)
    });
}

// modal api used and display the card
const modalDetails = (id)=>{
    const urlModal = (`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    fetch(urlModal)
    .then((res) =>res.json())
    .then((data)=>displayModal(data.data))
}
const displayModal =(data)=>{
     console.log(data)
const modalContainer = document.getElementById('modal-container')
modalContainer.innerHTML = `
<h2 class="font-medium text-xl line-clamp-2 mb-2">${data.title}</h2>
 <div class="flex  gap-3 space-y-2">
         <span class="text-white text-[12px] rounded-full items-center p-1 ${data.status=='open'? 'bg-lime-500 ': 'bg-red-400 '}">${data.status}</span>
                <span class="text-[#64748B] text-[12px]">Opened by ${data.assignee}</span>
                <span class="text-[#64748B] text-[12px]">${new Date(data.updatedAt).toDateString() }</span>
            </div>

            <div>${labelElement(data.labels)}</div>
             <p class="line-clamp-2 text-gray-500 mt-2">${data.description}</p>

              <div class="bg-slate-200 flex justify-between mt-2 p-4 rounded-md">
                <div>
                        <p class="text-[12px] text-[#64748B]">Assignee:</p>
                        <p class="font-bold text-[16px]">${data.assignee}</p>
                    </div>

                    <div>
                    <p class="text-[12px] text-[#64748B]">Priority:</p>
                     <p class="badge rounded-md p-2 ${data.priority == 'high' ? 'bg-red-200 text-[#EF4444]' : data.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' : 'bg-gray-200 text-gray-600'}">${data.priority}</p>
                    </div>
              </div>

`
document.getElementById("my_modal").showModal();
}

allCardData();
btnFilters();

document.getElementById('btn-search').addEventListener("click",()=>{
    const inputSearch = document.getElementById('input-search')
    const searchValue = inputSearch.value.trim().toLowerCase();
    // console.log(searchValue)
manageSpinner(true)
    fetch(` https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then(data =>{
        displayCardData(data.data)
        updateIssueCount(data.data)
        manageSpinner(false)
    })
})


