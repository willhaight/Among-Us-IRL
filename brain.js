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
    db.collection("among-us-data").get()
        .then(function (querySnapshot) {
            console.log(querySnapshot)
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());
                let counter = 0
                doc.data().names.forEach(function () {
                    document.getElementById("nameList").innerHTML += `<p>${doc.data().names[counter]}</p>`
                    counter++
                })
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

function addUser(newName) {
    db.collection("among-us-data").doc('users').update({
        names: firebase.firestore.FieldValue.arrayUnion(newName)
    })
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        })
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
    myUser = ""
}
document.getElementById('userName2').onclick = function () {
    firebase.auth().signOut()
    document.getElementById('userName2').innerText = 'logged out';
    document.getElementById('userName').innerText = 'logged out';
    document.getElementById('home-field').style.display = "flex"
    document.getElementById('createfield').style.display = "none"
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
    console.log("play button clicked")
    document.getElementById("createfield").style.display = "flex"
    document.getElementById('home-field').style.display = "none"
    addUser(myUser)
    loadUsers()
}