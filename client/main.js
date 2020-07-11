$(document).ready(function () {
    if (localStorage.token) {
        $(".after-login").show()
        $(".register-form").hide()
        $(".login-form").hide()
        $("#welcome-page").hide()
        getTodoList()
        
    } else if (!localStorage.token){
        start()
    }
});
function start () {
    $("#welcome-page").show()
    $(".register-form").hide()
    $(".after-login").hide()
    $(".login-form").hide()
    $(".add-form").hide()
    $(".edit-form").hide()
    $("#emailErrLogin").val('')
    $("#passErrLogin").val('')
}
function processRegister() {
    $(".register-form").show()
    $(".after-login").hide()
    $(".login-form").hide()
    $("#welcome-page").hide()
}
function afterRegister(event) {
    event.preventDefault()

    $.ajax({
        method:"POST",
        url: "http://localhost:3000/users/register/",
        data: {
            name: $("#nameRegister").val(),
            email: $("#emailRegister").val(),
            password: $("#passwordRegister").val()
        }
    })
    .done(function(data){
        console.log(`user with ${data} succesfully registered!`)
        $(".register-form").hide()
        $(".login-form").show()
        $("#welcome-page").hide()
        $("#nameErrRegister").val('')
        $("#emailErrRegister").val('')
        $("#passErrRegister").val('')
    })
    .fail(function(err){
        $("#nameErrRegister").show()
        err.responseJSON = {
            message: "Validation Error",
            errors: ['name cannot be empty!','email cannot be empty!','email format should be for example: "johndoe@mail.com"','password cannot be empty!']
        }
        console.log('<<<<< ERROR REGISTER')
        err.responseJSON.errors.forEach(e => {
            if(e === 'name cannot be empty!') {
                $("#nameErrRegister").text(e)
            } else if (e === 'email cannot be empty!') {
                $("#emailErrRegister").text(e)
            } else if (e === 'email format should be for example: "johndoe@mail.com"') {
                $("#emailErrRegister").text(e)
            } else {
                $("#passErrRegister").text(e)
            }
        });
    })
    .always(function(_){
        $("#nameRegister").val('')
        $("#emailRegister").val('')
        $("#passwordRegister").val('')
    })
}
function processLogin() {
    $(".after-login").hide()
    $(".register-form").hide()
    $(".login-form").show()
    $("#welcome-page").hide()
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
        $("#emailErrLogin").val('')
        $("#passErrLogin").val('')
    })
    .fail(function (err) {
        console.log(err.responseJSON)
        if(err.responseJSON.message === "Email not found!" || err.responseJSON.message === "Incorrect Email or Password!") {
            $("#emailErrLogin").text(err.responseJSON.message)
        } else if (err.responseJSON.message === "Incorrect Email or Password!") {
            $("#passErrLogin").text(err.responseJSON.message)
        }    
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
            const format = new Date(todo[i].due_date)
            const date = format.getDate() > 9 ? format.getDate(): "0" + String(format.getDate())
            const month = format.getMonth()+1 > 9 ? format.getMonth()+1: "0" + String(format.getMonth()+1)
            const year = format.getFullYear()
            const fullDate = `${year}-${month}-${date}`
            $(".todo-list").append(
                `<div class="col md-4 mb-4">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title" style="font-weight: bolder;">${todo[i].title}</h5>
                <h6 class="card-title">Due Date: ${fullDate}</h6><br>
                <h6 class="card-subtitle mb-2 text-muted" style="font-weight: bolder;">Details:</h6>
                <p class="card-text">${todo[i].description}</p>
                <h6 class="card-title" style="font-weight: bolder;">${todo[i].status}</h6>
                <a href="#" class="card-link" onclick="editForm(${todo[i].id}, event)" >Edit</a>
                <a href="#" class="card-link" onclick="afterDelete(${todo[i].id}, event)">Delete</a>
                </div>
                </div>
                </div> `
            )
        }
    })
    .fail(function (err) {
        console.log(err, 'ERROR KETIKA GET TODO LIST')
    })
    .always(function (_) {
        $(".add-form").hide()
        $(".edit-form").hide()
    })
}
function addForm() {
    $(".register-form").hide()
    $(".after-login").hide()
    $(".login-form").hide()
    $(".edit-form").hide()
    $(".add-form").show()
}
function afterAdd(event) {
    event.preventDefault()
    
    $.ajax({
        method:"POST",
        url: "http://localhost:3000/todos/",
        data: {
            title: $("#addTitle").val(),
            description: $("#addDesc").val(),
            status: $("#addStatus").val(),
            due_date: $("#addDueDate").val()
        },
        headers: {
            access_token: localStorage.token
        }
    })
    .done(function (todo) {
        console.log(todo.resultQR, '<<<< SUCCESS')
        $("#qrcode").attr(`<img src="https://www.ssbwiki.com/images/thumb/b/b8/Link_SSBB.jpg/250px-Link_SSBB.jpg">`)
        getTodoList()
        $(".after-login").show()
        $(".register-form").hide()
        $(".login-form").hide()
        $(".add-form").hide()
        $(".edit-form").hide()
    })
    .fail(function (err) {
        console.log(err.responseJSON)
       
        err.responseJSON = {
            message: "Validation Error",
            errors: ['title cannot be empty!','description cannot be empty!','status cannot be empty!','Due Date cannot be empty!']
        }
        err.responseJSON.errors.forEach(e => {
            if(e === 'title cannot be empty!') {
                $("#titleErrAdd").text(e)
            } else if (e === 'description cannot be empty!') {
                $("#descErrAdd").text(e)
            } else if (e === 'status cannot be empty!') {
                $("#statusErrAdd").text(e)
            } else {
                $("#dueDateErrAdd").text(e)
            }
        });
    })
    .always(function (_) {
        console.log('<<<< ALWAYS KETIKA ADD TODO')
        $("#addTitle").val('')
        $("#addDesc").val('')
        $("#addStatus").val('')
        $("#addDueDate").val('')
    })
}
function editForm(id, event) {
    $(".register-form").hide()
    $(".after-login").hide()
    $(".login-form").hide()
    $(".add-form").hide()
    $(".edit-form").show()
    event.preventDefault()
    
    $.ajax({
        method:"GET",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.token
        }
    })
    .done(function(data){
        const format = new Date(data.due_date)
        const date = format.getDate() > 9 ? format.getDate(): "0" + String(format.getDate())
        const month = format.getMonth()+1 > 9 ? format.getMonth()+1: "0" + String(format.getMonth()+1)
        const year = format.getFullYear()
        const fullDate = `${year}-${month}-${date}`
        $("#editId").val(data.id)
        $("#editTitle").val(data.title)
        $("#editDesc").val(data.description)
        $("#editStatus").val(data.status)
        $("#editDueDate").val(fullDate)
    })
    .fail(function(err){
        console.log(err.responseJSON.message)
    })
    .always(function(_){

    })
}
function afterEdit(event) {
    event.preventDefault()
    const id = $("#editId").val()

    $.ajax({
        method:"PUT",
        url: `http://localhost:3000/todos/${id}`,
        data: {
            title: $("#editTitle").val(),
            description: $("#editDesc").val(),
            status: $("#editStatus").val(),
            due_date: $("#editDueDate").val()
        },
        headers: {
            access_token: localStorage.token
        }
    })
    .done(function(edit){
        console.log(edit, '<<<< SUCCESS EDIT')
        getTodoList()
        $(".after-login").show()
        $(".register-form").hide()
        $(".login-form").hide()
        $(".add-form").hide()
        $(".edit-form").hide()
    })
    .fail(function(err){
        console.log(err.responseJSON)

        err.responseJSON = {
            message: "Validation Error",
            errors: ['title cannot be empty!','description cannot be empty!','status cannot be empty!','Due Date cannot be empty!']
        }
        err.responseJSON.errors.forEach(e => {
            if(e === 'title cannot be empty!') {
                $("#titleErrEdit").text(e)
            } else if (e === 'description cannot be empty!') {
                $("#descErrEdit").text(e)
            } else if (e === 'status cannot be empty!') {
                $("#statusErrEdit").text(e)
            } else {
                $("#dueDateErrEdit").text(e)
            }
        });
    })
    .always(function(_){
    })
}
function afterDelete(id, event) {
    event.preventDefault()
    
    $.ajax({
        method:"DELETE",
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.token
        }
    })
    .done(function(data){
        console.log(data)
       
    })
    .fail(function(err){
        console.log(err.responseJSON.message)
    })
    .always(function(_){
        getTodoList()
    })
}
function afterLogout() {
    let email = $("#emailLogin").val()
    let password = $("#passwordLogin").val()
    signOut()
    start()
    localStorage.clear()
    email = $("#emailLogin").val('')
    password = $("#passwordLogin").val('')
}
function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token
    // var profile = googleUser.getBasicProfile();
    console.log(id_token)
    
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/users/googleSignIn",
        data: {id_token}
    })
    .done(function(response) {
        console.log(response)
        localStorage.setItem('token',response.access_token)
        getTodoList()
        $(".after-login").show()
        $(".login-form").hide()
        $(".register-form").hide()
        $(".add-form").hide()
        $("#emailErrLogin").val('')
        $("#passErrLogin").val('')
    });
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.  
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });  
}