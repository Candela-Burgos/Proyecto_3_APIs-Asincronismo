const queryId = (id) => document.getElementById(id);
const BASE_API = "https://62605c6353a42eaa0703db75.mockapi.io/jobs";

// GET

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

// POST || /jobs  CREATE JOB

const sendData = () => {
    fetch(`${BASE_API}`, {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveData())
    })
    .finally(() => window.location = "index.html")
}

// PUT || /jobs/:id

const editData = (id) => {
    fetch(`${BASE_API}/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveData())
    })
    .finally(() => window.location = "index.html")
}

// DELETE

const deleteConfirm = (id) => {
    fetch(`${BASE_API}/${id}`, {
        method: "DELETE"
    })
    .catch(err => console.log(err))
    .finally(() => window.location = "index.html")
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
                    <a href="#" class="btn--edit" id="btn--edit" onclick="editForm(${id})">Edit</a>
                    <a href="#" class="btn--delete" onclick="deleteWarning(${id})">Delete</a>
                </div>
            </div>            
        `
    }, 2000)
    
}

// LINEA 96 el ternario no me sirve para nada. Ver como solucionarlo => ${name ? name : "Careers X"}

const deleteWarning = (id) => {
    queryId("home--cards").innerHTML = "";
    queryId('home--delete--warning').innerHTML += `
        <div class="delete--warning d-none-delete-warning">
            <p>Are you sure to delete this job?</p>
            <a id="btn_delete--confirm" href="#" onclick="deleteConfirm(${id})">Delete Job</a>
            <a id="btn_cancel" onclick="cancel()" href="#">Cancel</a>
        </div>                       
    `
}

const cancel = () => {
    queryId('home--delete--warning').innerHTML = ""; 
    queryId("home--cards").innerHTML = "";
    getJobs()
}

const saveData = () => {
    return {
        name: queryId("job-title").value,
        description: queryId("description").value,
        location: queryId("create_job--select_location").value,
        category: queryId("create_job--select_category").value,
        seniority: queryId("create_job--select_seniority").value,
    }
}

const editForm = (id) => {
    queryId("home--cards").innerHTML += `
    <div class="home--edit" id="home--edit--form"> 
        <div id="home--form--edit" class="home--form--edit d-none-edit-form">
            <form>
                <label>Job Title</label>
                <input id="form--edit--title" class="job-title" type="text" placeholder="Job Title">
                <label>Description</label>
                <textarea id="form--edit--description" class="description" cols="30" rows="10"></textarea>
                <label>Tags</label>
                <select name="Location" id="form--edit--select_location">
                    <option disabled="">Location</option>
                    <option value="argentina">Argentina</option>
                    <option value="united states">United States</option>
                    <option value="spain">Spain</option>
                    <option value="chile">Chile</option>
                    <option value="uruguay">Uruguay</option>
                    <option value="russia">Russia</option>
                </select>
                <select name="Seniority" id="form--edit--select_seniority">
                    <option disabled="">Seniority</option>
                    <option value="trainee">Trainee</option>
                    <option value="junior">Junior</option>
                    <option value="semisenior">Semisenior</option>
                    <option value="senior">Senior</option>
                </select>
                <select name="Category" id="form--edit--select_category">
                    <option disabled="">Category</option>
                    <option value="development">Development</option>
                    <option value="product">Product</option>
                    <option value="design">Design</option>
                </select>
                <input id="btn--form--edit--confirm" type="submit" name="submit" value="Edit" onclick="editData(${id})">
            </form>
        </div>       
    </div>        
    `
}

// EVENTS

queryId("home").addEventListener('click', () => {
    queryId("create_job--form").classList.add("d-none-job") 
    queryId("home--cards").innerHTML = "";
    getJobs()
})

queryId("create_job").addEventListener('click', () => {
    queryId("home--cards").innerHTML = "";
    spinner();
    setTimeout(() => {
        queryId("home--cards").innerHTML = "";
        queryId("create_job--form").classList.remove("d-none-job") 
    }, 2000);
})

queryId("btn--form--submit").addEventListener('click', (e) => {
    e.preventDefault()
    sendData()
    queryId("create_job--form").classList.add("d-none-job")
})
