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

const filterLocationJobs = (valorLocation) => {
    valorLocation = queryId("home--select_location").value;
    console.log(valorLocation);
    fetch(`${BASE_API}?location=${valorLocation}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

const filterSeniorityJobs = (valorSeniority) => {
    valorSeniority = queryId("home--select_seniority").value;
    fetch(`${BASE_API}?seniority=${valorSeniority}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

const filterCategoryJobs = (valorCategory) => {
    valorCategory = queryId("home--select_category").value;
    fetch(`${BASE_API}?category=${valorCategory}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

queryId("search").addEventListener("click", () => {
    filterLocationJobs();
    filterSeniorityJobs();
    filterCategoryJobs();
});

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
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(getDataEdit())
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
                        <span class="span_info">${seniority}</span>
                        <span class="span_info">${category}</span>
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
                        <span class="span_info--details">${seniority}</span>
                        <span class="span_info--details">${category}</span>
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
    queryId("home--form--edit").classList.add("d-none-edit-form");
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

const validateCamp = (nam, descrip, locat, categ, seniori) => {
    if (nam === "" || descrip === "" || locat === "" || categ === "" || seniori === "" ) {
        queryId("validate").classList.remove("d-none-validate")
    }
}

const saveData = () => {
    return {
        name: queryId("job-title").value,
        description: queryId("description").value,
        location: queryId("create_job--select_location").value,
        category: queryId("create_job--select_category").value,
        seniority: queryId("create_job--select_seniority").value
    }
}

//esto es lo que mando
const getDataEdit = () => {
    return {
        name: queryId("form--edit--title").value,
        description: queryId("form--edit--description").value,
        location: queryId("form--edit--select_location").value,
        category: queryId("form--edit--select_seniority").value,
        seniority: queryId("form--edit--select_category").value
    }
}

const editForm = (id) => {
    fetch(`${BASE_API}/${id}`)
        .then(res => res.json())
        .then(data => {
            const {name, description, location, category, seniority} = data;
            queryId("form--edit--title").value = `${name}`;
            queryId("form--edit--description").innerHTML = `${description}`;
            console.log(queryId("form--edit--select_location").value = `${location}`);
            console.log(queryId("form--edit--select_seniority").value = `${seniority}`);
            console.log(queryId("form--edit--select_category").value = `${category}`);
            // console.log(queryId("form--edit--select_category").value = `${category}`.selected = `${category}`);
            // console.log(queryId("form--edit--select_seniority") = `${seniority === getElementsByTagName('option').value && seniority.setAttribute("selected", "selected")}`);
        })
        .catch(err => console.log(err))
    queryId("home--form--edit").classList.remove("d-none-edit-form");
    eventID(id)
}

const eventID = (id) => {
    queryId("btn--form--edit--confirm").addEventListener("click", (e) => {
        e.preventDefault();
        editData(id);
    })
}

// const clearSelects = () => {
//     queryId("home--select_location").selected = queryId("location-option");
//     queryId("home--select_seniority").selected = queryId("seniority-option");
//     queryId("home--select_category").selected = queryId("category-option");
// }

// EVENTS

queryId("home").addEventListener('click', () => {
    queryId("home--form--edit").classList.add("d-none-edit-form");
    queryId("create_job--form").classList.add("d-none-job");
    queryId("home--cards").innerHTML = "";
    getJobs();
})

queryId("create_job").addEventListener('click', () => {
    queryId("home--form--edit").classList.add("d-none-edit-form");
    queryId("home--cards").innerHTML = "";
    spinner();
    setTimeout(() => {
        queryId("home--cards").innerHTML = "";
        queryId("create_job--form").classList.remove("d-none-job");
    }, 2000);
})

queryId("btn--form--submit").addEventListener('click', (e) => {
    e.preventDefault();
    sendData();
    queryId("create_job--form").classList.add("d-none-job");
})

queryId("clear").addEventListener("click", () => {
    // clearSelects();
    window.location = "index.html";
    getJobs();
})
