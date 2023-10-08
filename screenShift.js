let loginButt = document.getElementById('loginButt')
let playButt = document.getElementById('playButt')
let homeField = document.getElementById('home-field')
let usernameInput
let passwordInput
let forgotCred
let newUser

loginButt.onclick = function () {
    homeField.innerHTML = `<div class="top-heading">
    <p>Version Alpha</p>
    <p>logged out</p>
</div>
<div class="controls">
    <input type="text" placeholder="Username" class="home-button" id="usernameInput">
    <input type="text" placeholder="Password" class="home-button" id="passwordInput">
</div>
<div class="sub-controls">
    <input type="button" value="Login" class="home-button" id="forgotCred">
    <input type="button" value="Login" class="home-button" id="newUser">
</div>
</div>`
    usernameInput = document.getElementById('usernameInput')
    passwordInput = document.getElementById('passwordInput')
    forgotCred = document.getElementById('forgotCred')
    newUser = document.getElementById('newUser')
}