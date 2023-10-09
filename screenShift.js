//buttons
let loginButt = document.getElementById('loginButt')
let playButt = document.getElementById('playButt')
let signUpButt = document.getElementById('signUpButt')
let backButton = document.getElementById('homeButt')
//document fields
let homeField = document.getElementById('home-field')
let homeControls = document.getElementById('home-controls')
let loginControls = document.getElementById('login-controls')
let signUpControls = document.getElementById('sign-up-controls')

loginControls.style.display = "none"
signUpControls.style.display = "none"


//login button
loginButt.onclick = function () {
    homeControls.style.display = 'none'
    loginControls.style.display = "flex"
}

signUpButt.onclick = function () {
    loginControls.style.display = 'none'
    signUpControls.style.display = 'flex'
}

backButton.onclick = function () {
    signUpControls.style.display = 'none'
    homeControls.style.display = 'flex'
}