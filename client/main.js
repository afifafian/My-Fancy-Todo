$(document).ready(function () {
    if (localStorage.token) {
        $(".after-login").show()
        $(".register-form").hide()
        $(".login-form").hide()
        getTodoList()
        
    } else {
        $(".register-form").show()
        $(".after-login").hide()
        $(".login-form").hide()
        $(".add-form").hide()
    }
});

function afterRegister(event) {
    event.preventDefault()

    $(".register-form").hide()
    $(".after-login").hide()
    $(".login-form").show()
}
function processLogin() {
    $(".after-login").hide()
    $(".register-form").hide()
    $(".login-form").show()
}
function afterLogin(event) {
    event.preventDefault()
    let email = $("#emailLogin").val()
    let password = $("#passwordLogin").val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: { email: email, password: password }
    })
        .done(function (result) {
            localStorage.token = result.access_token
            getTodoList()
            $(".after-login").show()
            $(".register-form").hide()
            $(".login-form").hide()
        })
        .fail(function (err) {
            $("#error").append(err.responseJSON)
        })
        .always(function (_) {
            email = $("#emailLogin").val('')
            password = $("#passwordLogin").val('')
        })
}
function getTodoList() {
    $.ajax({
        method:"GET",
        url: "http://localhost:3000/todos/",
        headers: {
            access_token: localStorage.token
        }
    })
    .done(function (todo) {
        $(".todo-list").empty()

        for (let i = 0; i < todo.length; i++) {
            $(".todo-list").append(
                `<div class="col md-4 mb-3">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${todo[i].title}</h5>
                        <h6 class="card-title">${todo[i].status}</h6>
                        <h6 class="card-title">${todo[i].due_date}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Description</h6>
                        <p class="card-text">${todo[i].description}</p>
                        <a href="#" class="card-link">Delete</a>
                    </div>
                </div>
            </div>`
            )
        }  
    })
    .fail(function (err) {
        console.log(err, 'ERROR KETIKA GET TODO LIST')
    })
    .always(function (_) {
        $(".add-form").hide()
    })
}
function addForm() {
    $(".register-form").hide()
    $(".after-login").hide()
    $(".login-form").hide()
    $(".add-form").show()
}
function afterAdd(event) {
    event.preventDefault()

    $.ajax({
        method:"POST",
        url: "http://localhost:3000/todos/",
        data: {
            title: fefe,
            description: egeg,
            status: ee,
            due_date: gege
        },
        headers: {
            access_token: localStorage.token
        }
    })
    .done(function (todo) {
        // $(".todo-list").empty()
        
            $(".todo-list").append(
                `<div class="col md-4 mb-3">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${todo.title}</h5>
                        <h6 class="card-title">${todo.status}</h6>
                        <h6 class="card-title">${todo.due_date}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Description</h6>
                        <p class="card-text">${todo.description}</p>
                        <a href="#" class="card-link">Delete</a>
                    </div>
                </div>
            </div>`
            )
         
    })
    .fail(function (err) {
        console.log(err, 'ERROR KETIKA GET TODO LIST')
    })
    .always(function (_) {
    })
}
function afterLogout() {
    let email = $("#emailLogin").val()
    let password = $("#passwordLogin").val()
    localStorage.clear()

    $(".register-form").show()
    $(".after-login").hide()
    $(".login-form").hide()
    $(".add-form").hide()
    
    email = $("#emailLogin").val('')
    password = $("#passwordLogin").val('')
}

// function onSignIn (googleUser) {
//     let id_token = googleUser.getAuthResponse().id_token
//     let email = profile.getEmail()
// }

// $.ajax({
//     method: "POST",
//     url: "http://localhost:3000/googleSignIn",
//     data: {id_token}
// })
// .done(function(response) {
//     // $( this ).addClass( "done" );
//     localStorage.setItem('token',response.access_token)  
// });