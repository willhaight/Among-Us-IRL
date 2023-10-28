// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxuRSVoM-YcyCndMdUquu-DlewzUKknyI",
    authDomain: "among-us-irl-a969b.firebaseapp.com",
    projectId: "among-us-irl-a969b",
    storageBucket: "among-us-irl-a969b.appspot.com",
    messagingSenderId: "857367309284",
    appId: "1:857367309284:web:54bf0aa6991985c673f5f1",
    measurementId: "G-4TXJD098KK"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//function
function addCollection(collName, data) {
    db.collection(collName).add(data)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function loadUsers() {
    db.collection("among-us-data").doc('users').get()
        .then(function (doc) {
            if (doc.exists) {
                console.log('Document data:', doc.data());
                let counter = 0;
                document.getElementById('nameList').innerHTML = ''
                doc.data().names.forEach(function (name) {
                    document.getElementById("nameList").innerHTML += `<p>${name}</p>`;
                    gameRoleSetting[10].players = doc.data().names.length
                    document.getElementById('playerCount').innerText = gameRoleSetting[10].players
                    document.getElementById('sniperCount').innerText = gameRoleSetting[0].snipers
                    document.getElementById('swapperCount').innerText = gameRoleSetting[1].swappers
                    document.getElementById('killCooldown').innerText = gameRoleSetting[2].killCooldown
                    document.getElementById('detectiveCount').innerText = gameRoleSetting[4].detectives
                    document.getElementById('detectiveChecks').innerText = gameRoleSetting[5].detectiveChecks
                    document.getElementById('priestCount').innerText = gameRoleSetting[6].priests
                    document.getElementById('priestChecks').innerText = gameRoleSetting[7].priestChecks
                    document.getElementById('engineerCount').innerText = gameRoleSetting[8].engineers
                    document.getElementById('jesterCount').innerText = gameRoleSetting[9].jesters
                    document.getElementById('taskCount').innerText = gameRoleSetting[3].tasks
                    counter++;
                });
            } else {
                console.log("No such document!");
            }
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });
}

function addUser(newName) {
    db.collection("among-us-data").doc('users').update({
        names: firebase.firestore.FieldValue.arrayUnion(newName)
    })
        .then(function () {
            loadUsers()
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        })
}

function leaveLobby(user) {
    console.log(user)
    db.collection("among-us-data").doc("users").update({
        names: firebase.firestore.FieldValue.arrayRemove(user)
    })
        .then(function () {
            console.log("Document successfully updated!");
            document.getElementById('nameList').innerHTML = ""
            document.getElementById("createfield").style.display = "none"
            document.getElementById('home-field').style.display = "flex"
            loadUsers()
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}


//inputs
let newEmail = document.getElementById('newAccEmail')
let newPass1 = document.getElementById('newAccPass1')
let newPass2 = document.getElementById('newAccPass2')
let newDisplayName = document.getElementById('display-name')
let email = document.getElementById('email-input')
let password = document.getElementById('password-input')
//buttons
let newAccSub = document.getElementById('newAccSub')
let logSub = document.getElementById('logSub')
let forgotPass = document.getElementById('forgotPass')
//fields
let errorField = document.getElementById('error-field')




newAccSub.onclick = function () {
    if (newPass1.value === newPass2.value & newEmail.value.includes('@')
        & newDisplayName.value.length < 22 & newDisplayName.value.length > 1 & newEmail.value.includes('.')) {
        firebase.auth().createUserWithEmailAndPassword(newEmail.value, newPass1.value)
            .then((userCredential) => {
                // New user created successfully
                const user = userCredential.user;
                console.log('User created:', user);
                document.getElementById('sign-up-controls').style.display = "none"
                document.getElementById('home-controls').style.display = "flex"
                firebase.auth().onAuthStateChanged(function (user) {
                    user.updateProfile({
                        displayName: newDisplayName.value
                    }).then(() => {
                        // Update successful
                        console.log("User created with display name: " + user.displayName);
                        document.getElementById('userName').innerText = `${user.displayName}`
                    }).catch((error) => {
                        // An error occurred
                        console.error("Error updating display name: ", error);
                        errorField.innerHTML = `
            <p class="error-message">${errorMessage}</p>`
                    });
                })
            })
            .catch((error) => {
                // Handle errors here
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`Error: ${errorCode} - ${errorMessage}`);
                errorField.innerHTML = `
        <p class="error-message">${errorMessage}</p>`
            });
    } else {
        errorField.innerHTML = `
        <p class="error-message">An Unknown Error Has Occured. Please make
        sure you enter a valid email and at least a 6 character long
        password. Your Display Name Must have 2-21 characters.</p>`
    }
}

let myUser = ""

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in
        myUser = user.displayName
        document.getElementById('loginButt').style.display = 'none'
        document.getElementById('playButt').style.display = 'flex'
        signIn(user);
    } else {
        // No user is signed in
        console.log('No user signed in.');
        document.getElementById('loginButt').style.display = 'flex'
        document.getElementById('playButt').style.display = 'none'
    }
});

function signIn(user) {
    document.getElementById('userName').innerText = user.displayName;
    document.getElementById('userName2').innerText = user.displayName;
    errorField.innerHTML = ""
}
//sign out
document.getElementById('userName').onclick = function () {
    firebase.auth().signOut()
    document.getElementById('userName').innerText = 'logged out';
    leaveLobby(myUser)
    myUser = ""
}
document.getElementById('userName2').onclick = function () {
    firebase.auth().signOut()
    document.getElementById('userName2').innerText = 'logged out';
    document.getElementById('userName').innerText = 'logged out';
    document.getElementById('home-field').style.display = "flex"
    document.getElementById('createfield').style.display = "none"
    leaveLobby(myUser)
    console.log(myUser)
    myUser = ""
}

//regular login
logSub.onclick = function () {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log("User logged in:", user);

            // Perform actions after successful login, such as redirecting to a new page or displaying a welcome message.
        })
        .catch((error) => {
            // Handle errors here
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error logging in: ", errorCode, errorMessage);
            // Display error message to the user, e.g., show it on a login form.
            errorField.innerHTML = `
        <p class="error-message">Incorrect Credentials</p>`
        });
    document.getElementById('login-controls').style.display = 'none'
    document.getElementById('home-controls').style.display = 'flex'
}

//forgot password
forgotPass.onclick = function () {
    errorField.innerHTML = `
    <p class="error-message">Please contact Will about resetting your password</p>`
}

document.getElementById('playButt').onclick = function () {
    addUser(myUser)
    document.getElementById("createfield").style.display = "flex"
    document.getElementById('home-field').style.display = "none"
    document.getElementById('nameList').innerHTML = ""
}

document.getElementById('leaveLobby').onclick = function () {
    leaveLobby(myUser)
}

document.getElementById('deleteLobby').onclick = function () {
    db.collection("among-us-data").doc("users").update({
        names: []
    }).then(function () {
        document.getElementById('nameList').innerHTML = ""
        document.getElementById("createfield").style.display = "none"
        document.getElementById('home-field').style.display = "flex"
        loadUsers()
    })
}

db.collection('among-us-data').doc('users').get().then(function (doc) {
    let listedUsers = doc.data().names
    console.log(listedUsers.length)
    for (i = 0; i < listedUsers.length; i++) {
        if (myUser == doc.data().names[i]) {
            loadUsers()
            document.getElementById("createfield").style.display = "flex"
            document.getElementById('home-field').style.display = "none"
        }
    }
})

let gameRoleSetting = [
    { snipers: 0 },
    { swappers: 0 },
    { killCooldown: 0 },
    { tasks: 0 },
    { detectives: 0 },
    { detectiveChecks: 0 },
    { priests: 0 },
    { priestChecks: 0 },
    { engineers: 0 },
    { jesters: 0 },
    { players: 0 }
]
db.collection("among-us-data").doc("gameSettings").get().then(function (doc) {
    gameRoleSetting[3].tasks = doc.data().tasks
    gameRoleSetting[4].detectives = doc.data().detectives
    gameRoleSetting[5].detectiveChecks = doc.data().detectiveChecks
    gameRoleSetting[6].priests = doc.data().priests
    gameRoleSetting[7].priestChecks = doc.data().priestChecks
    gameRoleSetting[8].engineers = doc.data().engineers
    gameRoleSetting[0].snipers = doc.data().snipers
    gameRoleSetting[1].swappers = doc.data().swappers
    gameRoleSetting[2].killCooldown = doc.data().killCooldown
    gameRoleSetting[9].jesters = doc.data().jesters
})
let gameButtonInputList = document.getElementsByClassName('minus-input')
let gameButtonInputList2 = document.getElementsByClassName('plus-input')

gameButtonInputList[0].onclick = function () {
    gameRoleSetting[0].snipers += 1
    db.collection('among-us-data').doc('gameSettings').update({
        snipers: gameRoleSetting[0].snipers
    })
    loadUsers()
}
gameButtonInputList[1].onclick = function () {
    gameRoleSetting[1].swappers += 1
    db.collection('among-us-data').doc('gameSettings').update({
        swappers: gameRoleSetting[1].swappers
    })
    loadUsers()
}
gameButtonInputList[2].onclick = function () {
    gameRoleSetting[2].killCooldown += 1
    db.collection('among-us-data').doc('gameSettings').update({
        killCooldown: gameRoleSetting[2].killCooldown
    })
    loadUsers()
}
gameButtonInputList[3].onclick = function () {
    gameRoleSetting[3].tasks += 1
    db.collection('among-us-data').doc('gameSettings').update({
        tasks: gameRoleSetting[3].tasks
    })
    loadUsers()
}
gameButtonInputList[4].onclick = function () {
    gameRoleSetting[4].detectives += 1
    db.collection('among-us-data').doc('gameSettings').update({
        detectives: gameRoleSetting[4].detectives
    })
    loadUsers()
}
gameButtonInputList[5].onclick = function () {
    gameRoleSetting[5].detectiveChecks += 1
    db.collection('among-us-data').doc('gameSettings').update({
        detectiveChecks: gameRoleSetting[5].detectiveChecks
    })
    loadUsers()
}
gameButtonInputList[6].onclick = function () {
    gameRoleSetting[6].priests += 1
    db.collection('among-us-data').doc('gameSettings').update({
        priests: gameRoleSetting[6].priests
    })
    loadUsers()
}
gameButtonInputList[7].onclick = function () {
    gameRoleSetting[7].priestChecks += 1
    db.collection('among-us-data').doc('gameSettings').update({
        priestChecks: gameRoleSetting[7].priestChecks
    })
    loadUsers()
}
gameButtonInputList[8].onclick = function () {
    gameRoleSetting[8].engineers += 1
    db.collection('among-us-data').doc('gameSettings').update({
        engineers: gameRoleSetting[8].engineers
    })
    loadUsers()
}
gameButtonInputList[9].onclick = function () {
    gameRoleSetting[9].jesters += 1
    db.collection('among-us-data').doc('gameSettings').update({
        jesters: gameRoleSetting[9].jesters
    })
    loadUsers()
}
// 
// minus button
// 

gameButtonInputList2[0].onclick = function () {
    gameRoleSetting[0].snipers -= 1
    db.collection('among-us-data').doc('gameSettings').update({
        snipers: gameRoleSetting[0].snipers
    })
    loadUsers()
}
gameButtonInputList2[1].onclick = function () {
    gameRoleSetting[1].swappers -= 1
    db.collection('among-us-data').doc('gameSettings').update({
        swappers: gameRoleSetting[1].swappers
    })
    loadUsers()
}
gameButtonInputList2[2].onclick = function () {
    gameRoleSetting[2].killCooldown -= 1
    db.collection('among-us-data').doc('gameSettings').update({
        killCooldown: gameRoleSetting[2].killCooldown
    })
    loadUsers()
}
gameButtonInputList2[3].onclick = function () {
    gameRoleSetting[3].tasks -= 1
    db.collection('among-us-data').doc('gameSettings').update({
        tasks: gameRoleSetting[3].tasks
    })
    loadUsers()
}
gameButtonInputList2[4].onclick = function () {
    gameRoleSetting[4].detectives -= 1
    db.collection('among-us-data').doc('gameSettings').update({
        detectives: gameRoleSetting[4].detectives
    })
    loadUsers()
}
gameButtonInputList2[5].onclick = function () {
    gameRoleSetting[5].detectiveChecks -= 1
    db.collection('among-us-data').doc('gameSettings').update({
        detectiveChecks: gameRoleSetting[5].detectiveChecks
    })
    loadUsers()
}
gameButtonInputList2[6].onclick = function () {
    gameRoleSetting[6].priests -= 1
    db.collection('among-us-data').doc('gameSettings').update({
        priests: gameRoleSetting[6].priests
    })
    loadUsers()
}
gameButtonInputList2[7].onclick = function () {
    gameRoleSetting[7].priestChecks -= 1
    db.collection('among-us-data').doc('gameSettings').update({
        priestChecks: gameRoleSetting[7].priestChecks
    })
    loadUsers()
}
gameButtonInputList2[8].onclick = function () {
    gameRoleSetting[8].engineers -= 1
    db.collection('among-us-data').doc('gameSettings').update({
        engineers: gameRoleSetting[8].engineers
    })
    loadUsers()
}
gameButtonInputList2[9].onclick = function () {
    gameRoleSetting[9].jesters -= 1
    db.collection('among-us-data').doc('gameSettings').update({
        jesters: gameRoleSetting[9].jesters
    })
    loadUsers()
}

//start game
document.getElementById('startGame').onclick = function () {
    if (gameRoleSetting[10].players >= gameRoleSetting[0].snipers +
        gameRoleSetting[1].swappers + gameRoleSetting[4].detectives +
        gameRoleSetting[6].priests + gameRoleSetting[8].engineers +
        gameRoleSetting[9].jesters) {
        console.log('Truthify')
        document.getElementById('gameSettingErrorField').innerHTML = ""
        document.getElementById('createfield').style.display = "none"
        document.getElementById('inGameField').style.display = "flex"
        scrambleRoles()
    } else {
        document.getElementById('gameSettingErrorField').innerHTML = "<p>Numbers dont match</p>"
    }
}

db.collection('among-us-data').doc('users').onSnapshot(function (doc) {
    loadUsers()
})

// in game content
let playerRoles = []
let userList = []
let roleCirculation = []

// let gameRoleSetting = [
//    0 { snipers: 0 },
//    1 { swappers: 0 },
//    2 { killCooldown: 0 },
//    3 { tasks: 0 },
//    4 { detectives: 0 },
//    5 { detectiveChecks: 0 },
//    6 { priests: 0 },
//    7 { priestChecks: 0 },
//    8 { engineers: 0 },
//    9 { jesters: 0 },
//    10 { players: 0 }
// ]
function scrambleRoles() {
    for (i = 0; i < gameRoleSetting[6].priests; i++) {
        roleCirculation.push('doctor')
    }
    for (i = 0; i < gameRoleSetting[9].jesters; i++) {
        roleCirculation.push('jester')
    }
    for (i = 0; i < gameRoleSetting[8].engineers; i++) {
        roleCirculation.push('engineer')
    }
    for (i = 0; i < gameRoleSetting[4].detectives; i++) {
        roleCirculation.push('detective')
    }
    for (i = 0; i < gameRoleSetting[0].snipers; i++) {
        roleCirculation.push('sniper')
    }
    for (i = 0; i < gameRoleSetting[1].swappers; i++) {
        roleCirculation.push('swapper')
        console.log('swaper')
    }
    console.log(gameRoleSetting[10].players - roleCirculation.length, 'test')
    for (i = 0; i < gameRoleSetting[10].players - roleCirculation.length; i++) {
        roleCirculation.push('crewmate')
        console.log('pushed')
    }
    console.log(roleCirculation)
    for (i = 0; i < roleCirculation.length; i++) {
        Math.floor(Math.random() * roleCirculation.length);
        console.log(roleCirculation.splice(Math.floor(Math.random() * roleCirculation.length), 1))
    }
    db.collection('among-us-data').doc('users').get()
        .then(function (doc) {
            userList = doc.data()
        })
    console.log(roleCirculation)
}

function retrieveRole() {

}