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

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function loadUsers() {
    if (gameRoleSetting[3].tasks < 0) {
        gameRoleSetting[3].tasks = 0
    }
    if (gameRoleSetting[4].detectives < 0) {
        gameRoleSetting[4].detectives = 0
    }
    if (gameRoleSetting[5].detectiveChecks < 0) {
        gameRoleSetting[5].detectiveChecks = 0
    }
    if (gameRoleSetting[6].priests < 0) {
        gameRoleSetting[6].priests = 0
    }
    if (gameRoleSetting[7].priestChecks < 0) {
        gameRoleSetting[7].priestChecks = 0
    }
    if (gameRoleSetting[8].engineers < 0) {
        gameRoleSetting[8].engineers = 0
    }
    if (gameRoleSetting[0].snipers < 0) {
        gameRoleSetting[0].snipers = 0
    }
    if (gameRoleSetting[1].swappers < 0) {
        gameRoleSetting[1].swappers = 0
    }
    if (gameRoleSetting[2].killCooldown < 5) {
        gameRoleSetting[2].killCooldown = 5
    }
    if (gameRoleSetting[9].jesters < 0) {
        gameRoleSetting[9].jesters = 0
    }
    db.collection("among-us-data").doc('users').get()
        .then(function (doc) {
            if (doc.exists) {
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
                console.error("No such document!");
            }
        })
        .catch(function (error) {
            console.error("Error getting document:", error);
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
    db.collection("among-us-data").doc("users").update({
        names: firebase.firestore.FieldValue.arrayRemove(user)
    })
        .then(function () {
            document.getElementById('nameList').innerHTML = ""
            document.getElementById("createfield").style.display = "none"
            document.getElementById('home-field').style.display = "flex"
            loadUsers()
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}

function clearInGameField() {
    document.getElementsByClassName('sniper-controls')[0].style.display = "none"
    document.getElementsByClassName('assassin-controls')[0].style.display = "none"
    document.getElementsByClassName('engineer-controls')[0].style.display = "none"
    document.getElementsByClassName('doctor-controls')[0].style.display = "none"
    document.getElementsByClassName('detective-controls')[0].style.display = "none"
    document.getElementsByClassName('jester-controls')[0].style.display = "none"
    document.getElementsByClassName('sab-alert')[0].style.display = "none"
    document.getElementsByClassName('report-alert')[0].style.display = "none"
    document.getElementsByClassName('game-won-alert')[0].style.display = "none"
    document.getElementsByClassName('game-lost-alert')[0].style.display = "none"
    document.getElementsByClassName('task-status')[0].style.display = "none"
    document.getElementsByClassName('player-role-revealer')[0].style.display = "none"
    document.getElementsByClassName('vital-tracker')[0].style.display = "none"
    document.getElementsByClassName('task-tracker')[0].style.display = "none"
    document.getElementsByClassName('detect-tracker')[0].style.display = "none"
    document.getElementsByClassName('sab-alert')[0].style.display = 'none'

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


document.getElementById("leaveLobby2").onclick = function () {
    let winConfrim = window.confirm('are you sure you want to RESET the game?')
    if (winConfrim) {
        db.collection("among-us-data").doc('activeGameRoleData').update({
            nameRoles: ''
        })
            .then(() => {
                // Code to execute after the update operation is completed
                location.reload()
            })
            .catch((error) => {
                // Handle errors if the update operation fails
                console.error("Error updating document:", error);
            });
    }
}

newAccSub.onclick = function () {
    if (newPass1.value === newPass2.value & newEmail.value.includes('@')
        & newDisplayName.value.length < 22 & newDisplayName.value.length > 1 & newEmail.value.includes('.')) {
        firebase.auth().createUserWithEmailAndPassword(newEmail.value, newPass1.value)
            .then((userCredential) => {
                // New user created successfully
                document.getElementById('sign-up-controls').style.display = "none"
                document.getElementById('home-controls').style.display = "flex"
                firebase.auth().onAuthStateChanged(function (user) {
                    user.updateProfile({
                        displayName: newDisplayName.value
                    }).then(() => {
                        // Update successful
                        document.getElementById('userName').innerText = `${user.displayName}`
                        location.reload()
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
    myUser = ""
}

//regular login
logSub.onclick = function () {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in successfully

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
    db.collection("among-us-data").doc('activeGameRoleData').update({
        nameRoles: ''
    })
}

let listedUsers = []
db.collection('among-us-data').doc('users').get().then(function (doc) {
    listedUsers = doc.data().names
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
db.collection("among-us-data").doc("gameSettings").onSnapshot(function (doc) {
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
    loadUsers()
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
    let windowAlert = window.confirm('Would you like to start the game?')
    if (windowAlert) {
        if (gameRoleSetting[10].players >= gameRoleSetting[0].snipers +
            gameRoleSetting[1].swappers + gameRoleSetting[4].detectives +
            gameRoleSetting[6].priests + gameRoleSetting[8].engineers +
            gameRoleSetting[9].jesters) {
            document.getElementById('gameSettingErrorField').innerHTML = ""
            document.getElementById('createfield').style.display = "none"
            document.getElementById('inGameField').style.display = "flex"
            scrambleRoles()
            db.collection('among-us-data').doc('globalGameData').update({
                taskTotal: (gameRoleSetting[10].players - gameRoleSetting[0].snipers -
                    gameRoleSetting[1].swappers - gameRoleSetting[9].jesters) * gameRoleSetting[3].tasks
            })
            db.collection('among-us-data').doc('liveRoleCounts').update({
                crewmates: gameRoleSetting[10].players - (gameRoleSetting[1].swappers + gameRoleSetting[0].snipers),
                imposters: gameRoleSetting[1].swappers + gameRoleSetting[0].snipers
            })
            db.collection('among-us-data').doc('deadList').update({
                deadList: []
            })
        } else {
            document.getElementById('gameSettingErrorField').innerHTML = "<p>Numbers dont match</p>"
        }
    }
}

db.collection('among-us-data').doc('users').onSnapshot(function (doc) {
    loadUsers()
})

// in game content
let playerRoles = []
let userList = []
let roleCirculation = []
let liveVitals = []

function scrambleRoles() {
    db.collection('among-us-data').doc('users').get()
        .then(function (doc) {
            userList = doc.data().names;
            let roleCirculationCopy = [...roleCirculation];
            for (let i = 0; i < gameRoleSetting[6].priests; i++) {
                roleCirculationCopy.push('doctor');
            }
            for (let i = 0; i < gameRoleSetting[9].jesters; i++) {
                roleCirculationCopy.push('jester');
            }
            for (let i = 0; i < gameRoleSetting[8].engineers; i++) {
                roleCirculationCopy.push('engineer');
            }
            for (let i = 0; i < gameRoleSetting[4].detectives; i++) {
                roleCirculationCopy.push('detective');
            }
            for (let i = 0; i < gameRoleSetting[0].snipers; i++) {
                roleCirculationCopy.push('sniper');
            }
            for (let i = 0; i < gameRoleSetting[1].swappers; i++) {
                roleCirculationCopy.push('swapper');
            }
            let escapedCounter = roleCirculationCopy.length;
            for (let i = 0; i < gameRoleSetting[10].players - escapedCounter; i++) {
                roleCirculationCopy.push('crewmate');
            }
            escapedCounter = roleCirculationCopy.length;

            for (let i = 0; i < escapedCounter; i++) {
                let randomRoleIndex = Math.floor(Math.random() * roleCirculationCopy.length);
                let randomRole = roleCirculationCopy.splice(randomRoleIndex, 1)[0];
                let playerName = userList[i];
                let playerRole = {};
                playerRole[randomRole] = playerName;
                playerRoles.push(playerRole);
            }
            db.collection("among-us-data").doc('activeGameRoleData').update({
                nameRoles: playerRoles
            });
            trueArr = []
            for (i = 0; i < userList.length; i++) {
                trueArr.push(true)
                liveVitals.push([userList[i], trueArr[i]])
            }
            localStorage.setItem('vitals', 'exists')
            db.collection('among-us-data').doc('globalGameData').update({
                vitals: []
            })

        });
}

let roleAssignedList = []
let myAssignedRole = ""
function retrieveRole() {
    db.collection("among-us-data").doc("activeGameRoleData").get().then(function (doc) {
        roleAssignedList = doc.data().nameRoles
        if (roleAssignedList == "") {
            document.getElementById('gameSettingErrorField').innerHTML = ""
            document.getElementById('createfield').style.display = "none"
            document.getElementById('inGameField').style.display = "none"
            document.getElementsByClassName('sniper-controls')[0].style.display = "none"
            document.getElementsByClassName('assassin-controls')[0].style.display = "none"
            document.getElementsByClassName('engineer-controls')[0].style.display = "none"
            document.getElementsByClassName('doctor-controls')[0].style.display = "none"
            document.getElementsByClassName('detective-controls')[0].style.display = "none"
            document.getElementsByClassName('jester-controls')[0].style.display = "none"
            document.getElementsByClassName('sab-alert')[0].style.display = "none"
            document.getElementsByClassName('report-alert')[0].style.display = "none"
            document.getElementsByClassName('game-won-alert')[0].style.display = "none"
            document.getElementsByClassName('game-lost-alert')[0].style.display = "none"
            document.getElementsByClassName('task-status')[0].style.display = "none"
            document.getElementsByClassName('player-role-revealer')[0].style.display = "none"
            localStorage.removeItem('Tasks')
            localStorage.removeItem('tasksCompleted')
            localStorage.removeItem('dead')
            localStorage.removeItem('vitals')
            for (let i = 0; i < listedUsers.length; i++) {
                if (myUser == listedUsers[i]) {
                    document.getElementById('createfield').style.display = "flex"
                }
            }
            db.collection('among-us-data').doc('globalGameData').set({
                vitals: []
            })
        }
        try {
            for (i = 0; i < roleAssignedList.length; i++) {
                if (roleAssignedList[i].crewmate == myUser) {
                    document.getElementsByClassName("name")[0].innerText = `${myUser}`
                    document.getElementsByClassName("role")[0].innerText = `Crewmate`
                    document.getElementById('gameSettingErrorField').innerHTML = ""
                    document.getElementById('createfield').style.display = "none"
                    document.getElementById('inGameField').style.display = "flex"
                    myAssignedRole = "crewmate"
                    cooldownAll()
                }
                else if (roleAssignedList[i].sniper == myUser) {
                    document.getElementsByClassName("name")[0].innerText = `${myUser}`
                    document.getElementsByClassName("role")[0].innerText = `Sniper`
                    document.getElementById('gameSettingErrorField').innerHTML = ""
                    document.getElementById('createfield').style.display = "none"
                    document.getElementById('inGameField').style.display = "flex"
                    myAssignedRole = "sniper"
                    cooldownAll()
                }
                else if (roleAssignedList[i].detective == myUser) {
                    document.getElementsByClassName("name")[0].innerText = `${myUser}`
                    document.getElementsByClassName("role")[0].innerText = `Detective`
                    document.getElementById('gameSettingErrorField').innerHTML = ""
                    document.getElementById('createfield').style.display = "none"
                    document.getElementById('inGameField').style.display = "flex"
                    myAssignedRole = "detective"
                    cooldownAll()
                }
                else if (roleAssignedList[i].swapper == myUser) {
                    document.getElementsByClassName("name")[0].innerText = `${myUser}`
                    document.getElementsByClassName("role")[0].innerText = `Assassin`
                    document.getElementById('gameSettingErrorField').innerHTML = ""
                    document.getElementById('createfield').style.display = "none"
                    document.getElementById('inGameField').style.display = "flex"
                    myAssignedRole = "assassin"
                    cooldownAll()
                }
                else if (roleAssignedList[i].doctor == myUser) {
                    document.getElementsByClassName("name")[0].innerText = `${myUser}`
                    document.getElementsByClassName("role")[0].innerText = `Doctor`
                    document.getElementById('gameSettingErrorField').innerHTML = ""
                    document.getElementById('createfield').style.display = "none"
                    document.getElementById('inGameField').style.display = "flex"
                    myAssignedRole = "doctor"
                    cooldownAll()
                }
                else if (roleAssignedList[i].jester == myUser) {
                    document.getElementsByClassName("name")[0].innerText = `${myUser}`
                    document.getElementsByClassName("role")[0].innerText = `Jester`
                    document.getElementById('gameSettingErrorField').innerHTML = ""
                    document.getElementById('createfield').style.display = "none"
                    document.getElementById('inGameField').style.display = "flex"
                    myAssignedRole = "jester"
                    cooldownAll()
                }
                else if (roleAssignedList[i].engineer == myUser) {
                    document.getElementsByClassName("name")[0].innerText = `${myUser}`
                    document.getElementsByClassName("role")[0].innerText = `Engineer`
                    document.getElementById('gameSettingErrorField').innerHTML = ""
                    document.getElementById('createfield').style.display = "none"
                    document.getElementById('inGameField').style.display = "flex"
                    myAssignedRole = "engineer"
                    cooldownAll()
                }
            }
        }
        catch {

        }

    })
    db.collection('among-us-data').doc('users').get().then(function (doc) {
        userList = doc.data().names
    })

}
db.collection('among-us-data').doc('activeGameRoleData').onSnapshot(function (doc) {
    retrieveRole()
    liveVitals = []
    trueArr = []
    for (i = 0; i < userList.length; i++) {
        trueArr.push(true)
        liveVitals.push([userList[i], trueArr[i]])
    }
    localStorage.setItem('vitals', 'exists')
    db.collection('among-us-data').doc('globalGameData').update({
        vitals: []
    })
})

//Role Revealing
document.getElementsByClassName('sniper-controls')[0].style.display = "none"
document.getElementsByClassName('assassin-controls')[0].style.display = "none"
document.getElementsByClassName('engineer-controls')[0].style.display = "none"
document.getElementsByClassName('doctor-controls')[0].style.display = "none"
document.getElementsByClassName('detective-controls')[0].style.display = "none"
document.getElementsByClassName('jester-controls')[0].style.display = "none"
document.getElementsByClassName('sab-alert')[0].style.display = "none"
document.getElementsByClassName('report-alert')[0].style.display = "none"
document.getElementsByClassName('game-won-alert')[0].style.display = "none"
document.getElementsByClassName('game-lost-alert')[0].style.display = "none"
document.getElementsByClassName('task-status')[0].style.display = "none"
document.getElementsByClassName('vital-tracker')[0].style.display = "none"
document.getElementsByClassName('task-tracker')[0].style.display = "none"
document.getElementsByClassName('detect-tracker')[0].style.display = "none"
document.getElementsByClassName('sab-selector')[0].style.display = 'none'
document.getElementsByClassName('sab-alert')[0].style.display = 'none'


document.getElementsByClassName('role-button')[0].onclick = function () {
    if (myAssignedRole == "crewmate") {
        if (document.getElementsByClassName('task-status')[0].style.display == "none") {
            document.getElementsByClassName('task-status')[0].style.display = "flex"
        } else {
            document.getElementsByClassName('task-status')[0].style.display = "none"
        }
    }
    else if (myAssignedRole == "sniper") {
        if (document.getElementsByClassName("sniper-controls")[0].style.display == "none") {
            document.getElementsByClassName("sniper-controls")[0].style.display = "flex"
            document.getElementsByClassName('task-status')[0].style.display = "flex"
        } else {
            document.getElementsByClassName("sniper-controls")[0].style.display = "none"
            document.getElementsByClassName('task-status')[0].style.display = "none"
        }
    }
    else if (myAssignedRole == "detective") {
        if (document.getElementsByClassName("detective-controls")[0].style.display == "none") {
            document.getElementsByClassName("detective-controls")[0].style.display = "flex"
            document.getElementsByClassName('task-status')[0].style.display = "flex"
        } else {
            document.getElementsByClassName("detective-controls")[0].style.display = "none"
            document.getElementsByClassName('task-status')[0].style.display = "none"
            document.getElementsByClassName('detect-tracker')[0].style.display = "none"
        }
    }
    else if (myAssignedRole == "assassin") {
        if (document.getElementsByClassName("assassin-controls")[0].style.display == "none") {
            document.getElementsByClassName("assassin-controls")[0].style.display = "flex"
            document.getElementsByClassName('task-status')[0].style.display = "flex"
            document.getElementsByClassName('vital-tracker')[0].style.display = 'flex'
            document.getElementsByClassName('task-tracker')[0].style.display = 'flex'
        } else {
            document.getElementsByClassName("assassin-controls")[0].style.display = "none"
            document.getElementsByClassName('task-status')[0].style.display = "none"
            document.getElementsByClassName('vital-tracker')[0].style.display = 'none'
            document.getElementsByClassName('task-tracker')[0].style.display = 'none'
            document.getElementsByClassName('detect-tracker')[0].style.display = "none"
        }
    }
    else if (myAssignedRole == "doctor") {
        if (document.getElementsByClassName("doctor-controls")[0].style.display == "none") {
            document.getElementsByClassName("doctor-controls")[0].style.display = "flex"
            document.getElementsByClassName('task-status')[0].style.display = "flex"
            document.getElementsByClassName('vital-tracker')[0].style.display = "flex"
        } else {
            document.getElementsByClassName("doctor-controls")[0].style.display = "none"
            document.getElementsByClassName('task-status')[0].style.display = "none"
            document.getElementsByClassName('vital-tracker')[0].style.display = 'none'
        }
    }
    else if (myAssignedRole == "jester") {
        if (document.getElementsByClassName("jester-controls")[0].style.display == "none") {
            document.getElementsByClassName("jester-controls")[0].style.display = "flex"
        } else {
            document.getElementsByClassName("jester-controls")[0].style.display = "none"
        }
    }
    else if (myAssignedRole == "engineer") {
        if (document.getElementsByClassName("engineer-controls")[0].style.display == "none") {
            document.getElementsByClassName("engineer-controls")[0].style.display = "flex"
            document.getElementsByClassName('task-status')[0].style.display = "flex"
            document.getElementsByClassName('task-tracker')[0].style.display = "flex"
        } else {
            document.getElementsByClassName("engineer-controls")[0].style.display = "none"
            document.getElementsByClassName('task-status')[0].style.display = "none"
            document.getElementsByClassName('task-tracker')[0].style.display = "none"
        }
    }
    else {
        console.error("Role Not Found")
    }
    // task handling
    let totalTasksCompleted = 0;
    if (localStorage.getItem("tasksCompleted")) {
        totalTasksCompleted = parseInt(localStorage.getItem("tasksCompleted"))
    }
    if (myAssignedRole == "crewmate" || myAssignedRole == "doctor"
        || myAssignedRole == "engineer" || myAssignedRole == "detective") {
        if (localStorage.getItem("Tasks")) {
            document.getElementsByClassName('task-status')[0].innerHTML = localStorage.getItem("Tasks")
            for (let i = 0; i < document.getElementsByClassName('task-spec').length; i++) {
                if (document.getElementsByClassName('task-spec')[i].innerText[16] == '0') {
                    document.getElementsByClassName('task-spec')[i].style.display = 'none'
                }
            }
        } else {
            let distributeTaskCount = [];
            let distributeCount = gameRoleSetting[3].tasks
            for (let i = 0; i < gameRoleSetting[7].priestChecks; i++) {
                document.getElementsByClassName('task-status')[0].innerHTML +=
                    `<p class="task-spec">Task Station ${i + 1}:</p>`
                distributeTaskCount.push(1)
            }
            for (let i = 0; i < distributeCount - distributeTaskCount.length; i++) {
                rand = Math.floor(Math.random() * gameRoleSetting[7].priestChecks)
                distributeTaskCount[rand] += 1
            }
            for (let i = 0; i < document.getElementsByClassName('task-spec').length; i++) {
                document.getElementsByClassName('task-spec')[i].innerText += ` ${distributeTaskCount[i]}`
            }
            localStorage.setItem('Tasks', document.getElementsByClassName('task-status')[0].innerHTML)
        }
        for (let i = 0; i < document.getElementsByClassName('task-spec').length; i++) {
            document.getElementsByClassName('task-spec')[i].onclick = function () {
                if (document.getElementsByClassName('task-spec')[i].innerText.length == 17) {
                    document.getElementsByClassName('task-spec')[i].innerText =
                        `Task Station ${i + 1}: ${parseInt(document.getElementsByClassName('task-spec')[i].innerText[16] - 1)}`
                }
                if (document.getElementsByClassName('task-spec')[i].innerText.length == 18) {
                    document.getElementsByClassName('task-spec')[i].innerText =
                        `Task Station ${i + 1}: ${parseInt(document.getElementsByClassName('task-spec')[i].innerText[16] +
                            document.getElementsByClassName('task-spec')[i].innerText[17]) - 1}`
                }
                localStorage.setItem('Tasks', document.getElementsByClassName('task-status')[0].innerHTML)
                db.collection('among-us-data').doc('globalGameData').get()
                    .then(function (doc) {
                        totalTasksCompleted += 1
                        localStorage.setItem('tasksCompleted', totalTasksCompleted)
                        if (totalTasksCompleted == gameRoleSetting[3].tasks) {
                            localStorage.setItem('Tasks', '<p>Tasks Completed!</p>')
                        }
                        db.collection('among-us-data').doc('globalGameData').update({
                            taskTotal: doc.data().taskTotal - 1
                        })
                    })
                for (let i = 0; i < document.getElementsByClassName('task-spec').length; i++) {
                    if (document.getElementsByClassName('task-spec')[i].innerText[16] == '0') {
                        document.getElementsByClassName('task-spec')[i].style.display = 'none'
                    }
                }
            }
        }
    }
}

//die button

function goDieScreen() {
    document.getElementsByClassName('universalControls')[0].style.display = 'none'
    clearInGameField()
    document.getElementsByClassName('player-role-revealer')[0].style.display = 'flex'
    document.getElementsByClassName('game-lost-alert')[0].style.display = 'flex'
    document.getElementsByClassName('vital-tracker')[0].style.display = 'flex'
    document.getElementsByClassName('task-tracker')[0].style.display = "flex"
    document.getElementsByClassName('game-lost-alert')[0].innerHTML =
        '<h1>YOU ARE DEAD!</h1>'
    if (document.getElementsByClassName('player-role-revealer')[0].innerHTML == "") {
        document.getElementsByClassName('player-role-revealer')[0].innerHTML =
            `<h1 class='gameWinEnd'>Roles</h1>`;
        db.collection("among-us-data").doc("activeGameRoleData").get().then(function (doc) {
            for (i = 0; i < doc.data().nameRoles.length; i++) {
                if (doc.data().nameRoles[i].sniper) {
                    document.getElementsByClassName('player-role-revealer')[0].innerHTML +=
                        `<p>${doc.data().nameRoles[i].sniper}: Sniper</p>`
                }
                if (doc.data().nameRoles[i].swapper) {
                    document.getElementsByClassName('player-role-revealer')[0].innerHTML +=
                        `<p>${doc.data().nameRoles[i].swapper}: Assassin</p>`
                }
                if (doc.data().nameRoles[i].jester) {
                    document.getElementsByClassName('player-role-revealer')[0].innerHTML +=
                        `<p>${doc.data().nameRoles[i].jester}: Jester</p>`
                }
                if (doc.data().nameRoles[i].crewmate) {
                    document.getElementsByClassName('player-role-revealer')[0].innerHTML +=
                        `<p>${doc.data().nameRoles[i].crewmate}: Crewmate</p>`
                }
                if (doc.data().nameRoles[i].detective) {
                    document.getElementsByClassName('player-role-revealer')[0].innerHTML +=
                        `<p>${doc.data().nameRoles[i].detective}: Detective</p>`
                }
                if (doc.data().nameRoles[i].doctor) {
                    document.getElementsByClassName('player-role-revealer')[0].innerHTML +=
                        `<p>${doc.data().nameRoles[i].doctor}: Doctor</p>`
                }
                if (doc.data().nameRoles[i].engineer) {
                    document.getElementsByClassName('player-role-revealer')[0].innerHTML +=
                        `<p>${doc.data().nameRoles[i].engineer}: Engineer</p>`
                }
            }
        })
    }
    if (!localStorage.getItem('dead')) {
        if (myAssignedRole == "crewmate" || myAssignedRole == "doctor"
            || myAssignedRole == "engineer" || myAssignedRole == "detective"
            || myAssignedRole == 'jester') {
            db.collection('among-us-data').doc('liveRoleCounts').get().then(function (doc) {
                db.collection('among-us-data').doc('liveRoleCounts').update({
                    crewmates: doc.data().crewmates - 1
                })
            })
        }
        if (myAssignedRole == "sniper" || myAssignedRole == "assassin") {
            db.collection('among-us-data').doc('liveRoleCounts').get().then(function (doc) {
                db.collection('among-us-data').doc('liveRoleCounts').update({
                    imposters: doc.data().imposters - 1
                })
            })
        }
        if (myAssignedRole == "crewmate" || myAssignedRole == "doctor"
            || myAssignedRole == "engineer" || myAssignedRole == "detective") {
            db.collection('among-us-data').doc('globalGameData').get().then(function (doc) {
                if (localStorage.getItem('tasksCompleted')) {
                    db.collection('among-us-data').doc('globalGameData').update({
                        taskTotal: doc.data().taskTotal - (gameRoleSetting[3].tasks - parseInt(localStorage.getItem('tasksCompleted')))
                    })

                } else if (!localStorage.getItem('tasksCompleted')) {
                    db.collection('among-us-data').doc('globalGameData').update({
                        taskTotal: doc.data().taskTotal - gameRoleSetting[3].tasks
                    })
                }
            })
        }
    }
    localStorage.setItem('dead', 'dead')
}

document.getElementsByClassName('die-button')[0].onclick = function () {
    db.collection('among-us-data').doc('globalGameData').get().then(function (doc) {
        db.collection('among-us-data').doc('users').get().then(function (doc2) {
            for (i = 0; i < doc.data().vitals.length; i++) {
                liveVitals.push([doc2.data().names[i], doc.data().vitals[i]])
            }
        })
    })
    var userConfirmed = window.confirm("Are you sure that you are dead?");
    if (userConfirmed) {
        let tempArr = []
        for (i = 0; i < liveVitals.length; i++) {
            if (liveVitals[i][0] == myUser) {
                liveVitals[i][1] = false
            }
            tempArr.push(liveVitals[i][1])
        }
        db.collection('among-us-data').doc('globalGameData').update({
            vitals: []
        })
        db.collection('among-us-data').doc('deadList').get().then(function (doc) {
            let updatedDeadList = doc.data().deadList
            updatedDeadList.push(myUser)
            db.collection('among-us-data').doc('deadList').update({
                deadList: updatedDeadList
            })
        })
    } else {

    }

}
//updating vitals

db.collection('among-us-data').doc('deadList').onSnapshot(function (doc) {
    document.getElementsByClassName('vital-tracker')[0].innerHTML = ""
    for (i = 0; i < doc.data().deadList.length; i++) {
        document.getElementsByClassName('vital-tracker')[0].innerHTML +=
            `<p>${doc.data().deadList[i]} is Dead!</p>`
        if (myUser == doc.data().deadList[i]) {
            goDieScreen()
        }
    }
})

// live task tracking
db.collection('among-us-data').doc('globalGameData').onSnapshot(function (doc) {
    document.getElementsByClassName('task-tracker')[0].innerHTML =
        `<h3 class='task-tracker-text'>Tasks Remaining: ${doc.data().taskTotal}</h3>`
})

//Kill Button and cooldown functions
//gameRoleSetting[2].killCooldown
function cooldownAll() {
    regKillcooldown1()
    regKillcooldown2()
    detectTimer1()
    detectTimer2()
    snipeCooldown()
    sab1Pauser()
    sab2Pauser()
    emergencyMeetingCooldown()
}
function regKillcooldown1() {
    if (killCooldown == false) {
        let timer = gameRoleSetting[2].killCooldown;
        killCooldown = true
        for (let i = 0; i < gameRoleSetting[2].killCooldown; i++) {
            (function (currentTimer) {
                setTimeout(function () {
                    document.getElementsByClassName('kill-button')[1].style.opacity = '45%'
                    document.getElementsByClassName('kill-button')[1].style.flexWrap = 'nowrap'
                    document.getElementsByClassName('kill-button')[1].innerHTML = `<p>${currentTimer - 1}</p>`;
                    if (currentTimer === 1) {
                        document.getElementsByClassName('kill-button')[1].innerHTML = "";
                        document.getElementsByClassName('kill-button')[1].style.opacity = '100%'
                        killCooldown = false
                    }
                }, (gameRoleSetting[2].killCooldown - currentTimer) * 1000);
            })(timer--);
        }
    }
}
function regKillcooldown2() {
    if (killCooldown2 == false) {
        let timer = gameRoleSetting[2].killCooldown;
        killCooldown2 = true
        for (let i = 0; i < gameRoleSetting[2].killCooldown; i++) {
            (function (currentTimer) {
                setTimeout(function () {
                    document.getElementsByClassName('kill-button')[0].style.opacity = '45%'
                    document.getElementsByClassName('kill-button')[0].style.flexWrap = 'nowrap'
                    document.getElementsByClassName('kill-button')[0].innerHTML = `<p>${currentTimer - 1}</p>`;
                    if (currentTimer === 1) {
                        document.getElementsByClassName('kill-button')[0].innerHTML = "";
                        document.getElementsByClassName('kill-button')[0].style.opacity = '100%'
                        killCooldown2 = false
                    }
                }, (gameRoleSetting[2].killCooldown - currentTimer) * 1000);
            })(timer--);
        }
    }
}
let killCooldown = false
let killCooldown2 = false

document.getElementsByClassName('kill-button')[0].onclick = function () {
    regKillcooldown2()
}
document.getElementsByClassName('kill-button')[1].onclick = function () {
    regKillcooldown1()
};
//detect button

function detectTimer1() {
    if (document.getElementsByClassName('detect-button')[1].style.opacity = '1') {
        let timer = gameRoleSetting[2].killCooldown * 3;
        detectCooldown = true

        for (x = 0; x < gameRoleSetting[2].killCooldown * 3; x++) {
            (function (currentTimer) {
                setTimeout(function () {
                    document.getElementsByClassName('detect-button')[1].style.opacity = '45%'
                    document.getElementsByClassName('detect-button')[1].style.flexWrap = 'nowrap'
                    document.getElementsByClassName('detect-button')[1].innerHTML = `<p>${currentTimer - 1}</p>`;
                    if (currentTimer === 1) {
                        document.getElementsByClassName('detect-button')[1].innerHTML = "";
                        document.getElementsByClassName('detect-button')[1].style.opacity = '100%'
                        detectCooldown = false
                    }
                }, (gameRoleSetting[2].killCooldown * 3 - currentTimer) * 1000);
            })(timer--);
        }
    }
}

function detectTimer2() {
    if (document.getElementsByClassName('detect-button')[0].style.opacity = '1') {
        let timer = gameRoleSetting[2].killCooldown * 3;
        detectCooldownTwo = true

        for (x = 0; x < gameRoleSetting[2].killCooldown * 3; x++) {
            (function (currentTimer) {
                setTimeout(function () {
                    document.getElementsByClassName('detect-button')[0].style.opacity = '45%'
                    document.getElementsByClassName('detect-button')[0].style.flexWrap = 'nowrap'
                    document.getElementsByClassName('detect-button')[0].innerHTML = `<p>${currentTimer - 1}</p>`;
                    if (currentTimer === 1) {
                        document.getElementsByClassName('detect-button')[0].innerHTML = "";
                        document.getElementsByClassName('detect-button')[0].style.opacity = '100%'
                        detectCooldownTwo = false
                    }
                }, (gameRoleSetting[2].killCooldown * 3 - currentTimer) * 1000);
            })(timer--);
        }
    }
}

function detectCooldown1() {
    document.getElementsByClassName('detect-tracker')[0].innerHTML = ''
    if (detectCooldown == false) {
        document.getElementsByClassName('detect-tracker')[0].style.display = "flex"
        for (i = 0; i < userList.length; i++) {
            document.getElementsByClassName('detect-tracker')[0].innerHTML +=
                `<p class='detect-list-data'>${userList[i]}</p>`
        }
        if (userList.length == document.getElementsByClassName('detect-list-data').length) {
            db.collection("among-us-data").doc("activeGameRoleData").get().then(function (doc) {
                for (let i = 0; i < doc.data().nameRoles.length; i++) {
                    const element = document.getElementsByClassName('detect-list-data')[i];
                    if (element) {
                        element.onclick = (function (index) {
                            return function () {
                                if (doc.data().nameRoles[index].sniper) {
                                    alert(`${userList[index]}'s role is: Sniper`);
                                    document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                    detectTimer1()
                                }
                                if (doc.data().nameRoles[index].swapper) {
                                    alert(`${userList[index]}'s role is: Assassin`);
                                    document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                    detectTimer1()
                                }
                                if (doc.data().nameRoles[index].jester) {
                                    alert(`${userList[index]}'s role is: Jester`);
                                    document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                    detectTimer1()
                                }
                                if (doc.data().nameRoles[index].crewmate) {
                                    alert(`${userList[index]}'s role is: Crewmate`);
                                    document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                    detectTimer1()
                                }
                                if (doc.data().nameRoles[index].detective) {
                                    alert(`${userList[index]}'s role is: Detective`);
                                    document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                    detectTimer1()
                                }
                                if (doc.data().nameRoles[index].doctor) {
                                    alert(`${userList[index]}'s role is: Doctor`);
                                    document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                    detectTimer1()
                                }
                                if (doc.data().nameRoles[index].engineer) {
                                    alert(`${userList[index]}'s role is: Engineer`);
                                    document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                    detectTimer1()
                                }
                            };
                        })(i);
                    }
                }
            });
        }

    }
}

function detectCooldown2() {
    document.getElementsByClassName('detect-tracker')[0].innerHTML = ''
    if (detectCooldownTwo == false) {
        document.getElementsByClassName('detect-tracker')[0].style.display = "flex"
        for (i = 0; i < userList.length; i++) {
            document.getElementsByClassName('detect-tracker')[0].innerHTML +=
                `<p class='detect-list-data'>${userList[i]}</p>`
        }
        if (userList.length == document.getElementsByClassName('detect-list-data').length) {
            db.collection("among-us-data").doc("activeGameRoleData").get().then(function (doc) {
                for (let i = 0; i < doc.data().nameRoles.length; i++) {
                    const element = document.getElementsByClassName('detect-list-data')[i];
                    if (element) {
                        element.onclick = (function (index) {
                            let windowConfirm = window.confirm(`Are you sure you want to investigate ${userList[index]}`)
                            if (windowConfirm) {
                                return function () {
                                    if (doc.data().nameRoles[index].sniper) {
                                        alert(`${userList[index]}'s role is: Sniper`);
                                        document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                        detectTimer2()
                                    }
                                    if (doc.data().nameRoles[index].swapper) {
                                        alert(`${userList[index]}'s role is: Assassin`);
                                        document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                        detectTimer2()
                                    }
                                    if (doc.data().nameRoles[index].jester) {
                                        alert(`${userList[index]}'s role is: Jester`);
                                        document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                        detectTimer2()
                                    }
                                    if (doc.data().nameRoles[index].crewmate) {
                                        alert(`${userList[index]}'s role is: Crewmate`);
                                        document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                        detectTimer2()
                                    }
                                    if (doc.data().nameRoles[index].detective) {
                                        alert(`${userList[index]}'s role is: Detective`);
                                        document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                        detectTimer2()
                                    }
                                    if (doc.data().nameRoles[index].doctor) {
                                        alert(`${userList[index]}'s role is: Doctor`);
                                        document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                        detectTimer2()
                                    }
                                    if (doc.data().nameRoles[index].engineer) {
                                        alert(`${userList[index]}'s role is: Engineer`);
                                        document.getElementsByClassName('detect-tracker')[0].style.display = "none"
                                        detectTimer2()
                                    }
                                };
                            }
                        })(i);
                    }
                }
            });
        }

    }
}

let detectCooldown = false
let detectCooldownTwo = false

document.getElementsByClassName('detect-button')[1].onclick = function () {
    detectCooldown1()
};

document.getElementsByClassName('detect-button')[0].onclick = function () {
    detectCooldown2()
}

// Sniper button
//
//

function snipeButton() {
    if (snipeCooldownTrigger == false) {
        document.getElementsByClassName('snipe-tracker')[0].innerHTML = ""
        for (i = 0; i < userList.length; i++) {
            document.getElementsByClassName('snipe-tracker')[0].innerHTML +=
                `<p class='snipe-list-data'>${userList[i]}</p>`
        }
        for (let i = 0; i < userList.length; i++) {
            const element = document.getElementsByClassName('snipe-list-data')[i];
            if (element) {
                element.onclick = (function (index) {
                    return function () {
                        let killConfirmed = window.confirm(`Are you sure you want to kill ${userList[i]}`)
                        if (killConfirmed) {
                            db.collection('among-us-data').doc('deadList').get().then(function (doc) {
                                let updatedDeadList = doc.data().deadList
                                updatedDeadList.push(userList[i])
                                db.collection('among-us-data').doc('deadList').update({
                                    deadList: updatedDeadList
                                })
                            })
                            snipeCooldown()
                        }
                        document.getElementsByClassName('snipe-tracker')[0].innerHTML = ""
                    };
                })(i);
            }
        }
    }
}

function snipeCooldown() {
    if (document.getElementsByClassName('sniper-button')[0].style.opacity = '1') {
        let timer = gameRoleSetting[2].killCooldown * 2;
        snipeCooldownTrigger = true
        for (x = 0; x < gameRoleSetting[2].killCooldown * 2; x++) {
            (function (currentTimer) {
                setTimeout(function () {
                    document.getElementsByClassName('sniper-button')[0].style.opacity = '45%'
                    document.getElementsByClassName('sniper-button')[0].style.flexWrap = 'nowrap'
                    document.getElementsByClassName('sniper-button')[0].innerHTML = `<p>${currentTimer - 1}</p>`;
                    if (currentTimer === 1) {
                        document.getElementsByClassName('sniper-button')[0].innerHTML = "";
                        document.getElementsByClassName('sniper-button')[0].style.opacity = '100%'
                        snipeCooldownTrigger = false
                    }
                }, (gameRoleSetting[2].killCooldown * 2 - currentTimer) * 1000);
            })(timer--);
        }
    }
}

let snipeCooldownTrigger = false

document.getElementsByClassName('sniper-button')[0].onclick = function () {
    snipeButton()
}

//
//Sabotage button
//

let sab1Trigger = false
let sab2Trigger = false


function sabOptions() {
    if (sab1Trigger == false && sab2Trigger == false) {
        document.getElementsByClassName('sab-selector')[0].style.display = 'flex'
    }
}

function activateSab1() {
    let confirmation = window.confirm('Would you like to sabotage Station One?')
    if (confirmation) {
        db.collection('among-us-data').doc('sabotage').update({
            statusOne: true
        })
    }
    document.getElementsByClassName('sab-selector')[0].style.display = 'none'
}
function activateSab2() {
    let confirmation = window.confirm('Would you like to sabotage Station Two?')
    if (confirmation) {
        db.collection('among-us-data').doc('sabotage').update({
            statusTwo: 2
        })
    }
    document.getElementsByClassName('sab-selector')[0].style.display = 'none'
}

function sab1Cooldown() {
    if (document.getElementsByClassName('sab-button')[0].style.opacity = '1') {
        let timer = gameRoleSetting[2].killCooldown * 2;
        sab1Trigger = true
        for (x = 0; x < gameRoleSetting[2].killCooldown * 2; x++) {
            (function (currentTimer) {
                setTimeout(function () {
                    document.getElementsByClassName('sab-button')[0].style.opacity = '45%'
                    document.getElementsByClassName('sab-button')[0].style.flexWrap = 'nowrap'
                    document.getElementsByClassName('sab-button')[0].innerHTML = `<p>${currentTimer - 1}</p>`;
                    if (currentTimer === 1) {
                        document.getElementsByClassName('sab-button')[0].innerHTML = "";
                        document.getElementsByClassName('sab-button')[0].style.opacity = '100%'
                        sab1Trigger = false
                    }
                }, (gameRoleSetting[2].killCooldown * 2 - currentTimer) * 1000);
            })(timer--);
        }
    }
}
function sab2Cooldown() {
    if (document.getElementsByClassName('sab-button')[1].style.opacity = '1') {
        let timer = gameRoleSetting[2].killCooldown * 2;
        sab2Trigger = true
        for (x = 0; x < gameRoleSetting[2].killCooldown * 2; x++) {
            (function (currentTimer) {
                setTimeout(function () {
                    document.getElementsByClassName('sab-button')[1].style.opacity = '45%'
                    document.getElementsByClassName('sab-button')[1].style.flexWrap = 'nowrap'
                    document.getElementsByClassName('sab-button')[1].innerHTML = `<p>${currentTimer - 1}</p>`;
                    if (currentTimer === 1) {
                        document.getElementsByClassName('sab-button')[1].innerHTML = "";
                        document.getElementsByClassName('sab-button')[1].style.opacity = '100%'
                        sab2Trigger = false
                    }
                }, (gameRoleSetting[2].killCooldown * 2 - currentTimer) * 1000);
            })(timer--);
        }
    }
}
function sab1Pauser() {
    if (document.getElementsByClassName('sab-button')[0].style.opacity = '1') {
        document.getElementsByClassName('sab-button')[0].style.opacity = '45%'
        sab1Trigger = true;
    }
    else if (document.getElementsByClassName('sab-button')[0].style.opacity = '.45') {
        document.getElementsByClassName('sab-button')[0].style.opacity = '100%'

    }
}
function sab2Pauser() {
    if (document.getElementsByClassName('sab-button')[1].style.opacity = '1') {
        document.getElementsByClassName('sab-button')[1].style.opacity = '45%'
        sab2Trigger = true;
    }
    else if (document.getElementsByClassName('sab-button')[1].style.opacity = '.45') {
        document.getElementsByClassName('sab-button')[1].style.opacity = '100%'

    }
}



document.getElementsByClassName('sab-button')[0].onclick = function () {
    sabOptions()
}

document.getElementsByClassName('sab-button')[1].onclick = function () {
    sabOptions()
}

document.getElementsByClassName('sab-option')[0].onclick = function () {
    activateSab1()
}

document.getElementsByClassName('sab-option')[1].onclick = function () {
    activateSab2()
}

document.getElementById('fix-sab').onclick = function () {
    let windowConfirm = window.confirm('Have you fixed the sabotage?')
    if (windowConfirm) {
        db.collection('among-us-data').doc('sabotage').get().then(function (doc2) {
            if (doc2.data().statusOne == true) {
                db.collection('among-us-data').doc('sabotage').update({
                    statusOne: false
                })
            }
            if (doc2.data().statusTwo > 0) {
                db.collection('among-us-data').doc('sabotage').update({
                    statusTwo: doc2.data().statusTwo - 1
                })
                document.getElementById('fix-sab').style.display = 'none'
                localStorage.setItem('sab2', 'true')
            }
        })
    }
}

//meeting buttons
//emergency meeting 
//report button

function emergencyMeetingCooldown() {
    if (document.getElementsByClassName('emergency-meeting-button')[0].style.opacity = '1') {
        let timer = Math.trunc(gameRoleSetting[2].killCooldown * 1.5);
        for (x = 0; x < Math.trunc(gameRoleSetting[2].killCooldown * 1.5); x++) {
            (function (currentTimer) {
                setTimeout(function () {
                    document.getElementsByClassName('emergency-meeting-button')[0].style.opacity = '45%'
                    document.getElementsByClassName('emergency-meeting-button')[0].style.flexWrap = 'nowrap'
                    document.getElementsByClassName('emergency-meeting-button')[0].innerHTML = `<p>${currentTimer - 1}</p>`;
                    if (currentTimer === 1) {
                        document.getElementsByClassName('emergency-meeting-button')[0].innerHTML = "";
                        document.getElementsByClassName('emergency-meeting-button')[0].style.opacity = '100%'
                    }
                }, (Math.trunc(gameRoleSetting[2].killCooldown * 1.5) - currentTimer) * 1000);
            })(timer--);
        }
    }
}

document.getElementsByClassName('report-button')[0].onclick = function () {
    let windowAlert = window.confirm('Are you sure you want to report a body?')
    if (windowAlert) {
        db.collection('among-us-data').doc('meeting-status').update({
            inMeeting: true
        })
    }
}
document.getElementsByClassName('emergency-meeting-button')[0].onclick = function () {
    let windowAlert = window.confirm('Are you sure you want to call and Emergency Meeting?')
    if (windowAlert) {
        db.collection('among-us-data').doc('meeting-status').update({
            inMeeting: true
        })
    }
}

db.collection('among-us-data').doc('meeting-status').onSnapshot(function (doc) {
    db.collection('among-us-data').doc('meeting-status').get().then(function (doc2) {
        if (doc.data().inMeeting == true) {
            clearInGameField()
            document.getElementsByClassName('universalControls')[0].style.display = 'none'
            document.getElementsByClassName('sab-alert')[0].style.display = 'flex'
            document.getElementsByClassName('sab-explain')[0].innerText = ''
            document.getElementsByClassName('sab-explain')[0].innerText += 'A Meeting Has Been Called'
            document.getElementById('fix-sab').style.display = 'none'
            document.getElementById('end-meeting').style.display = 'flex'
        } else if (doc.data().inMeeting == false) {
            document.getElementsByClassName('universalControls')[0].style.display = 'flex'
            document.getElementsByClassName('sab-alert')[0].style.display = 'none'
            document.getElementById('fix-sab').style.display = 'flex'
            document.getElementById('end-meeting').style.display = 'none'
            cooldownAll()
            sab1Cooldown()
            sab2Cooldown()
        }
        if (localStorage.getItem('dead')) {
            goDieScreen()
        }
    })
})

document.getElementById('end-meeting').onclick = function () {
    let windowAlert = window.confirm('Are you sure you want to end the meeting?')
    if (windowAlert) {
        db.collection('among-us-data').doc('meeting-status').update({
            inMeeting: false
        })
    }
}
//
//winning and losing
//

function gameWin() {
    db.collection("among-us-data").doc('activeGameRoleData').update({
        nameRoles: ''
    }).then(function () {
        document.getElementsByClassName('createfield')[0].style.display = 'none'
        document.getElementsByClassName('universalControls')[0].style.display = 'none'
        clearInGameField()
        document.getElementsByClassName('game-won-alert')[0].style.display = 'flex'
        document.getElementsByClassName('game-won-alert')[0].innerHTML =
            "<h1 class='gameWinEnd'>VICTORY!</h1>"
    })
    db.collection("among-us-data").doc('liveRoleCounts').update({
        crewmates: 100,
        imposters: 10
    })
    db.collection('among-us-data').doc('sabotage').get().then(function (doc2) {
        if (doc2.data().statusOne == true) {
            db.collection('among-us-data').doc('sabotage').update({
                statusOne: false
            })
        }
        if (doc2.data().statusTwo > 0) {
            db.collection('among-us-data').doc('sabotage').update({
                statusTwo: 0
            })
        }
    })
}
function gameLost() {
    db.collection("among-us-data").doc('activeGameRoleData').update({
        nameRoles: ''
    }).then(function () {
        document.getElementsByClassName('createfield')[0].style.display = 'none'
        document.getElementsByClassName('universalControls')[0].style.display = 'none'
        clearInGameField()
        document.getElementsByClassName('game-lost-alert')[0].style.display = 'flex'
        document.getElementsByClassName('game-lost-alert')[0].innerHTML =
            "<h1 class='gameLossEnd'>DEFEAT!</h1>"
    })
    db.collection("among-us-data").doc('liveRoleCounts').update({
        crewmates: 100,
        imposters: 10
    })
}

document.getElementsByClassName('game-won-alert')[0].onclick = function () {
    db.collection("among-us-data").doc("users").update({
        names: firebase.firestore.FieldValue.arrayRemove(myUser)
    })
    location.reload()
}
document.getElementsByClassName('game-lost-alert')[0].onclick = function () {
    db.collection("among-us-data").doc("users").update({
        names: firebase.firestore.FieldValue.arrayRemove(myUser)
    })
    location.reload()
}

//task win condition
db.collection('among-us-data').doc('globalGameData').onSnapshot(function (doc) {
    if (doc.data().taskTotal == 0 &&
        (myAssignedRole == "crewmate" || myAssignedRole == "doctor"
            || myAssignedRole == "engineer" || myAssignedRole == "detective")) {
        console.log(myAssignedRole, 'task win')
        gameWin()
    }
    if (doc.data().taskTotal == 0 &&
        (myAssignedRole == "sniper" || myAssignedRole == "assassin"
            || myAssignedRole == "jester")) {
        console.log(myAssignedRole, 'task loss')
        gameLost()
    }

})
//Imposter Win Condition and jester win condition
db.collection('among-us-data').doc('liveRoleCounts').onSnapshot(function (doc) {
    if (doc.data().imposters >= doc.data().crewmates &&
        (myAssignedRole == "sniper" || myAssignedRole == "assassin")) {
        console.log(myAssignedRole, 'death win')
        gameWin()
    }
    if (doc.data().imposters >= doc.data().crewmates &&
        (myAssignedRole == "crewmate" || myAssignedRole == "engineer" ||
            myAssignedRole == "doctor" || myAssignedRole == "detective" ||
            myAssignedRole == "jester")) {
        console.log(myAssignedRole, 'death loss')
        gameLost()
    }
    if (doc.data().imposters == 0 &&
        (myAssignedRole == "sniper" || myAssignedRole == "assassin")) {
        console.log(myAssignedRole, 'death loss')
        gameLost()
    }
    if (doc.data().imposters == 0 &&
        (myAssignedRole == "crewmate" || myAssignedRole == "engineer" ||
            myAssignedRole == "doctor" || myAssignedRole == "detective" ||
            myAssignedRole == "jester")) {
        console.log(myAssignedRole, 'death win')
        gameWin()
    }
    if (doc.data().imposters == 69 && doc.data().crewmates == 420 &&
        myAssignedRole == "jester") {
        console.log(myAssignedRole, 'jest win')
        gameWin()
    }
    if (doc.data().imposters == 69 && doc.data().crewmates == 420 &&
        myAssignedRole != "jester") {
        console.log(myAssignedRole, 'jest loss')
        gameLost()
    }
})

//jester win button

document.getElementsByClassName('jester-win-button')[0].onclick = function () {
    let windowAlert = window.confirm('Has the Jester laughed his way to Victory?')
    if (windowAlert) {
        db.collection('among-us-data').doc('liveRoleCounts').update({
            crewmates: 420,
            imposters: 69
        })
    }
}

//detecting Sabotages

db.collection('among-us-data').doc('sabotage').onSnapshot(function (doc) {
    db.collection('among-us-data').doc('sabotage').get().then(function (doc2) {
        if (doc.data().statusOne == true && myAssignedRole != 'assassin' && myAssignedRole != 'sniper') {
            clearInGameField()
            document.getElementsByClassName('universalControls')[0].style.display = 'none'
            document.getElementsByClassName('sab-alert')[0].style.display = 'flex'
            document.getElementsByClassName('sab-explain')[0].innerText = ''
            document.getElementsByClassName('sab-explain')[0].innerText += 'STATION ONE has been sabotaged!'
        } else if (doc.data().statusOne == false && myAssignedRole != 'assassin' && myAssignedRole != 'sniper') {
            clearInGameField()
            document.getElementsByClassName('universalControls')[0].style.display = 'flex'
            document.getElementsByClassName('sab-alert')[0].style.display = 'none'
            if (doc.data().statusTwo > 0 && myAssignedRole != 'assassin' && myAssignedRole != 'sniper') {
                clearInGameField()
                document.getElementsByClassName('universalControls')[0].style.display = 'none'
                document.getElementsByClassName('sab-alert')[0].style.display = 'flex'
                document.getElementsByClassName('sab-explain')[0].innerText = ''
                document.getElementsByClassName('sab-explain')[0].innerText += 'STATION TWO has been sabotaged!'
                if (localStorage.getItem('sab2')) {
                    document.getElementById('fix-sab').style.display = 'none'
                }
            } else if (doc.data().statusTwo == 0 && myAssignedRole != 'assassin' && myAssignedRole != 'sniper') {
                clearInGameField()
                document.getElementsByClassName('universalControls')[0].style.display = 'flex'
                document.getElementById('fix-sab').style.display = "flex"
                document.getElementsByClassName('sab-alert')[0].style.display = 'none'
                localStorage.removeItem('sab2')
            }
        }
        if (doc.data().statusOne == true && (myAssignedRole == 'assassin' || myAssignedRole == 'sniper')) {
            sab1Pauser()
            sab2Pauser()
            document.getElementsByClassName('sab-alert')[0].style.display = 'flex'
            document.getElementsByClassName('sab-explain')[0].innerText = ''
            document.getElementsByClassName('sab-explain')[0].innerText += 'STATION ONE has been sabotaged!'
        } else if (doc.data().statusOne == false && (myAssignedRole == 'assassin' || myAssignedRole == 'sniper')) {
            sab1Pauser()
            sab2Pauser()
            document.getElementsByClassName('sab-alert')[0].style.display = 'none'
            if (doc.data().statusTwo > 0 && (myAssignedRole == 'assassin' || myAssignedRole == 'sniper')) {
                sab1Pauser()
                sab2Pauser()
                document.getElementsByClassName('sab-alert')[0].style.display = 'flex'
                document.getElementsByClassName('sab-explain')[0].innerText = ''
                document.getElementsByClassName('sab-explain')[0].innerText += 'STATION TWO has been sabotaged!'
                if (localStorage.getItem('sab2')) {
                    document.getElementById('fix-sab').style.display = 'none'
                }
            } else if (doc.data().statusTwo == 0 && (myAssignedRole == 'assassin' || myAssignedRole == 'sniper')) {
                sab1Trigger = false
                sab2Trigger = false
                sab1Cooldown()
                sab2Cooldown()
                document.getElementById('fix-sab').style.display = "flex"
                document.getElementsByClassName('sab-alert')[0].style.display = 'none'
                localStorage.removeItem('sab2')
            }
        }
        if (localStorage.getItem('dead')) {
            goDieScreen()
        }
    })
})