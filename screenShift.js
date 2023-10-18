//buttons
let loginButt = document.getElementById('loginButt')
let playButt = document.getElementById('playButt')
let signUpButt = document.getElementById('signUpButt')
let backButton = document.getElementById('homeButt')
let joinButt = document.getElementById('joinGameButt')
//document fields
let homeField = document.getElementById('home-field')
let homeControls = document.getElementById('home-controls')
let loginControls = document.getElementById('login-controls')
let signUpControls = document.getElementById('sign-up-controls')
let activeGame = document.getElementById('active-game-controls')
let createGameField = document.getElementById('creating-game')
let errorField = document.getElementById('error-field')

loginControls.style.display = "none"
signUpControls.style.display = "none"
activeGame.style.display = "none"
document.getElementById("createfield").style.display = "none"


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



