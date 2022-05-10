const queryId = (id) => document.getElementById(id);
const BASE_API = "https://62605c6353a42eaa0703db75.mockapi.io/jobs";

const getJobs = () => {
    fetch(`${BASE_API}`)
    .then(res => res.json())
    .then(data => showData(data))
    .catch(err => console.log(err))
}

getJobs()

const getJob = (id) => {
    fetch(`${BASE_API}/${id}`)
        .then(res => res.json())
        .then(data => showDetail(data))
        .catch(err => console.log(err))
}

// SPINNER 

const spinner = () => {
    queryId("home--cards").innerHTML = `<div class="spinner" id="spinner"></div>`
}

// DOM 

const showData = (jobs) => {
    spinner();
    setTimeout(() => {
        queryId('home--cards').innerHTML = '';
        for (const job of jobs) {
            const {id, name, location, category, seniority} = job;
            queryId('home--cards').innerHTML += `
                <div class="home--card">
                    <h2>${name}</h2>
                    <div class="home--card--spans">
                        <span class="span_info">${location}</span>
                        <span class="span_info">${category}</span>
                        <span class="span_info">${seniority}</span>
                    </div>
                    <a href="#" onclick="getJob(${id})">See Details</a>
                </div>            
            `
        }
    }, 2000);
    
}

const showDetail = (job) => {
    spinner();
    setTimeout(() => {
        const {id, name, location, category, seniority, description} = job;
        queryId('home--cards').innerHTML = '';
        queryId('home--cards').innerHTML += `
            <div class="home--card--details">
                <div class="card--img">
                    <img src="assets/${name}.jpg" alt="${name}">
                </div>
                <div class="card--description">
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <div class="home--card--spans--details">
                        <span class="span_info--details">${location}</span>
                        <span class="span_info--details">${category}</span>
                        <span class="span_info--details">${seniority}</span>
                    </div>
                    <a href="#" class="btn--edit" onclick="edit(${id})">Edit</a>
                    <a href="#" class="btn--delete" onclick="delete(${id})">Delete</a>
                </div>
            </div>            
        `
    }, 2000)
    
}