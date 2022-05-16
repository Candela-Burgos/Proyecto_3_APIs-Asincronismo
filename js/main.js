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
        seniority: queryId("create_job--select_seniority").value
    }
}

const getDataEdit = () => {
    return {
        name: queryId("form--edit--title").value,
        description: queryId("form--edit--description").value,
        location: queryId("form--edit--select_location").value,
        category: queryId("form--edit--select_seniority").value,
        seniority: queryId("form--edit--select_category").value
    }
}

// let editID = 0;

const editForm = (id) => {
    const job = getDataEdit();
    const {name, description, location, category, seniority} = job;
    queryId("home--form--edit").classList.remove("d-none-edit-form");
    queryId("form--edit--title").value = `${name}`;
    queryId("form--edit--description").value = `${description}`;
    queryId("form--edit--select_location").value = `${location}`;
    queryId("form--edit--select_seniority").value = `${seniority}`;
    queryId("form--edit--select_category").value = `${category}`;
    eventID(id)
}

const eventID = (id) => {
    queryId("btn--form--edit--confirm").addEventListener("click", (e) => {
        e.preventDefault();
        editData(id);
    })
}

//CODIGO DE PILAR

// const editData2 = (id) => {
//     fetch(`${BASE_URL}dinero/${id}`, {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'Application/json'
//         },
//         body: JSON.stringify(saveData())
//     })
//     .finally(() => console.log("termine de ejecutar el PUT"))
// }

// const getDataById = (id) => {
//     fetch(`${BASE_URL}dinero/${id}`)
//         .then(response => response.json())
//         .then(data => populateCardData(data))
//         .catch(err => console.log(err))
// }

// const populateCardData = (data) => {
//     const { category, date, description, money } = data
//     queryId("category").value = category
//     queryId("date").value = date
//     queryId("description").value = description
//     queryId("price").value = money
//     queryId("form").classList.remove("d-none")
// }

// const saveData2 = () => {
//     return {
//         category: queryId("category").value,
//         date: queryId("date").value,
//         description: queryId("description").value,
//         money: parseInt(queryId("price").value)
//     }
// }

// const addEvent = (id) => {
//     queryId("submit").addEventListener("click", (e) => {
//         e.preventDefault()
//         if (isEdit) {
//             editData(id)
//         } else {
//             sendData()
//         }
//     })
// }

// const showEditForm = (id) => {
//     getDataById(id) // es mi GET a un id especifico
//     queryId("container").innerHTML = ""
//     queryId("submit").classList.remove("btn-primary")
//     queryId("submit").classList.add("btn-success")
//     queryId("submit").innerHTML = "Editar"
//     isEdit = true
//     addEvent(id)
// }
////////////////////////////////////////////////////////////*

// const editForm = (id) => {
//     const job = getDataEdit();
//     const {name, description, location, category, seniority} = job;
//     queryId("home--cards").innerHTML += `
//     <div class="home--edit" id="home--edit--form"> 
//         <div id="home--form--edit" class="home--form--edit d-none-edit-form">
//             <form>
//                 <label>Job Title</label>
//                 <input id="form--edit--title" class="job-title" type="text" placeholder="Job Title" value="${name}">
//                 <label>Description</label>
//                 <textarea id="form--edit--description" class="description" cols="30" rows="10">${description}</textarea>
//                 <label>Tags</label>
//                 <select name="Location" id="form--edit--select_location" value="${location}">
//                     <option disabled="">Location</option>
//                     <option value="argentina">Argentina</option>
//                     <option value="united states">United States</option>
//                     <option value="spain">Spain</option>
//                     <option value="chile">Chile</option>
//                     <option value="uruguay">Uruguay</option>
//                     <option value="russia">Russia</option>
//                 </select>
//                 <select name="Seniority" id="form--edit--select_seniority" value="${seniority}">
//                     <option disabled="">Seniority</option>
//                     <option value="trainee">Trainee</option>
//                     <option value="junior">Junior</option>
//                     <option value="semisenior">Semisenior</option>
//                     <option value="senior">Senior</option>
//                 </select>
//                 <select name="Category" id="form--edit--select_category" value="${category}">
//                     <option disabled="">Category</option>
//                     <option value="development">Development</option>
//                     <option value="product">Product</option>
//                     <option value="design">Design</option>
//                 </select>
//                 <input id="btn--form--edit--confirm" type="submit" name="submit" value="Edit" onclick="editData(${id})">
//             </form>
//         </div>       
//     </div>        
//     `
// }



// const editForm = (id) => {
//     queryId("home--form--edit").classList.remove("d-none-edit-form");
//     editID = id;
// }



// const clearSelects = () => {

// }

// EVENTS

queryId("home").addEventListener('click', () => {
    queryId("home--form--edit").classList.add("d-none-edit-form");
    queryId("create_job--form").classList.add("d-none-job") 
    queryId("home--cards").innerHTML = "";
    getJobs()
})

queryId("create_job").addEventListener('click', () => {
    queryId("home--form--edit").classList.add("d-none-edit-form");
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

// queryId("clear").addEventListener("click", () => {
//     getJobs()
// })

