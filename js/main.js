const queryId = (id) => document.getElementById(id);
const BASE_API = "https://62605c6353a42eaa0703db75.mockapi.io/jobs";

const getJobs = () => {
    fetch(`${BASE_API}`)
    .then(res => res.json())
    .then(data => showData(data))
    .catch(err => console.log(err))
}

getJobs()

const showData = (jobs) => {
    for (const job of jobs) {
        const {id, name, location, category, seniority} = job;
        queryId('home--cards').innerHTML += `
            <div class="home--card">
                <h2>${name}</h2>
                <span class="span_info">${location}</span>
                <span class="span_info">${category}</span>
                <span class="span_info">${seniority}</span>
                <a href="#" onclick="getJob(${id})">See Details</a>
            </div>            
        `
    }
}