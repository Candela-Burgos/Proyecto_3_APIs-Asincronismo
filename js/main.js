const queryId = (id) => document.getElementById(id);
const BASE_API = "https://62605c6353a42eaa0703db75.mockapi.io/jobs";
const imgInclude = ["BackEnd Developer", "FrontEnd Developer", "Fullstack Developer", "Graphic Design", "Marketing", "Product Manager"];
const imgRandom = ["0", "1", "2", "3", "4", "5"];

const chooseImgRandom = (arr) => {
    return Math.floor(Math.random() * Math.floor(arr.length))
}

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
    fetch(`${BASE_API}?location=${valorLocation}`)
        .then(res => res.json())
        .then(data => `${valorLocation == "Location" ? data : showData(data)}`)
        .catch(err => console.log(err))
}

const filterSeniorityJobs = (valorSeniority) => {
    fetch(`${BASE_API}?seniority=${valorSeniority}`)
        .then(res => res.json())
        .then(data => `${valorSeniority == "Seniority" ? data : showData(data.filter(({seniority}) => seniority === valorSeniority))}`)
        .catch(err => console.log(err))
}

const filterCategoryJobs = (valorCategory) => {
    fetch(`${BASE_API}?category=${valorCategory}`)
        .then(res => res.json())
        .then(data => `${valorCategory == "Category" ? data : showData(data)}`)
        .catch(err => console.log(err))
}

const filterJobs = () => {
    filterLocationJobs(queryId("home--select_location").value);
    filterSeniorityJobs(queryId("home--select_seniority").value);
    filterCategoryJobs(queryId("home--select_category").value);
}

const clearSelects = () => {
    setTimeout(() => {
        queryId("home--select_location").value = "Location";
        queryId("home--select_seniority").value = "Seniority";
        queryId("home--select_category").value = "Category";
    }, 2400);
}

queryId("search").addEventListener("click", (e) => {
    e.preventDefault();
    queryId('home--delete--warning').innerHTML = ""; 
    queryId("create_job--form").classList.add("d-none-job");
    filterJobs();
    clearSelects();
});

// Si apreta search y los select estan vacios, que tire una alerta de que tiene que llenar 1 select para poder buscar/filtrar

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
        queryId("home--search").classList.remove("d-none-search");
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
    queryId("home--search").classList.add("d-none-search");
    spinner();
    setTimeout(() => {
        const {id, name, location, category, seniority, description} = job;
        queryId('home--cards').innerHTML = '';
        queryId('home--cards').innerHTML += `
            <div class="home--card--details">
                <div class="card--img">
                    <img src="assets/${imgInclude.includes(name) ? name : chooseImgRandom(imgRandom)}.jpg" alt="Foto de trabajo">
                </div>
                <div class="card--description">
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <div class="home--card--spans--details">
                        <span class="span_info--details">${location}</span>
                        <span class="span_info--details">${seniority}</span>
                        <span class="span_info--details">${category}</span>
                    </div>
                    <div class="home--card--btn--details">
                        <a href="#" class="btn--edit" id="btn--edit" onclick="editForm(${id})">Edit</a>
                        <a href="#" class="btn--delete" onclick="deleteWarning(${id})">Delete</a>
                    </div>
                </div>
            </div>            
        `
    }, 2000)
    
}

const deleteWarning = (id) => {
    queryId("home--form--edit").classList.add("d-none-edit-form");
    queryId("home--cards").innerHTML = "";
    queryId("home--delete--warning").innerHTML += `
        <div id="delete--warning" class="delete--warning">
            <p>Are you sure to delete this job?</p>
            <div class="delete--warning--btn">
                <a id="btn_delete--confirm" href="#" onclick="deleteConfirm(${id})">Delete Job</a>
                <a id="btn_cancel" onclick="cancel()" href="#">Cancel</a>
            </div>
        </div>                       
    `
}

const cancel = () => {
    queryId('home--delete--warning').innerHTML = ""; 
    queryId("home--cards").innerHTML = "";
    getJobs()
}

// const validateCamp = (nam, descrip, locat, seniori, categ) => {
//     return nam == "" || descrip == "" || locat == "" || categ == "" || seniori == "";
// }

// const saveData = () => {
//     let nam = queryId("job-title").value;
//     let descrip = queryId("description").value;
//     let locat = queryId("create_job--select_location").value;
//     let seniori = queryId("create_job--select_seniority").value;
//     let categ = queryId("create_job--select_category").value;
//     if (validateCamp(nam, descrip, locat, seniori, categ)) {
//         queryId("validate").classList.remove("d-none-validate");
//     } else {
//         return {
//             name: nam,
//             description: descrip,
//             location: locat,
//             seniority: seniori,
//             category: categ
//         }
//     }
        
// }

const saveData = () => {
    return {
        name: queryId("job-title").value,
        description: queryId("description").value,
        location: queryId("create_job--select_location").value,
        seniority: queryId("create_job--select_seniority").value,
        category: queryId("create_job--select_category").value
    }
}

const getDataEdit = () => {
    return {
        name: queryId("form--edit--title").value,
        description: queryId("form--edit--description").value,
        location: queryId("form--edit--select_location").value,
        seniority: queryId("form--edit--select_seniority").value,
        category: queryId("form--edit--select_category").value
    }
}

const editForm = (id) => {
    fetch(`${BASE_API}/${id}`)
        .then(res => res.json())
        .then(data => {
            const {name, description, location, category, seniority} = data;
            queryId("form--edit--title").value = `${name}`;
            queryId("form--edit--description").innerHTML = `${description}`;
            queryId("form--edit--select_location").value = `${location}`;
            queryId("form--edit--select_seniority").value = `${seniority}`;
            queryId("form--edit--select_category").value = `${category}`;
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

// EVENTS

queryId("home").addEventListener('click', () => {
    queryId('home--delete--warning').innerHTML = ""; 
    queryId("home--form--edit").classList.add("d-none-edit-form");
    queryId("create_job--form").classList.add("d-none-job");
    queryId("home--cards").innerHTML = "";
    getJobs();
})

queryId("create_job").addEventListener('click', () => {
    queryId("home--search").classList.add("d-none-search");
    queryId('home--delete--warning').innerHTML = "";
    queryId("home--form--edit").classList.add("d-none-edit-form");
    queryId("home--cards").innerHTML = "";
    spinner();
    setTimeout(() => {
        queryId("home--cards").innerHTML = "";
        queryId("create_job--form").classList.remove("d-none-job");
    }, 2000);
})

queryId("btn--form--submit").addEventListener('click', (e) => {
    // if (queryId("job-title").value == "" || queryId("description").value == "" || queryId("create_job--select_location").value == " " || queryId("create_job--select_seniority").value == " " || queryId("create_job--select_category").value == " ") {
    //     queryId("validate").classList.remove("d-none-validate");
    //     queryId("btn-ok").addEventListener('click', () => {
    //         queryId("validate").classList.add("d-none-validate");
    //     })
    // } else {
        e.preventDefault();
        sendData();
        queryId("create_job--form").classList.add("d-none-job");
    // }
})

queryId("clear").addEventListener("click", () => {
    queryId('home--delete--warning').innerHTML = "";
    getJobs();
})
