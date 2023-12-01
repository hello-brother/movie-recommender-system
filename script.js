document.addEventListener("DOMContentLoaded", function () {
    // Fetch JSON data from data.json
    fetch('data.json')
        .then(response => response.json())
        .then(movieData => {
            const movieContainer = document.getElementById("movieContainer");

            let movieRow;

            movieData.forEach((movie, index) => {
                if (index % 6 === 0) {
                    movieRow = document.createElement("div");
                    movieRow.classList.add("movie-row");
                    movieContainer.appendChild(movieRow);
                }

                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");

                const posterImg = document.createElement("img");
                posterImg.classList.add("movie-poster");
                posterImg.src = movie.poster_path;
                posterImg.alt = `${movie.name} Poster`;

                const movieName = document.createElement("div");
                movieName.classList.add("movie-name");
                movieName.textContent = movie.name;

                movieCard.appendChild(posterImg);
                movieCard.appendChild(movieName);
                movieRow.appendChild(movieCard);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
// Open modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

// Close modal
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

function sendVerificationEmail() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if (email) {
        // Initialize Email.js with your user ID
        emailjs.init("hMLFEHBysEGYN5imm");

        // Specify the email service, template, and parameters
        var service_id = "service_f0fdnhc";
        var template_id = "template_8rjkos9";

        var template_params = {
            to_name: ", Welcome to MovieFlix!",
            message: `Your password is : ${password}`,
            from_name: "Harsh raj",
            reply_to: email,
        };

        // Send the email
        emailjs.send(service_id, template_id, template_params)
            .then(function(response) {
                console.log("Email sent successfully:", response);
                alert("Verification email sent. Please check your email to complete the signup process.");
            }, function(error) {
                console.error("Error sending email:", error);
                alert("Error sending verification email. Please try again later.");
            });
    } else {
        alert("Please enter a valid email address.");
    }
}

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBolOKHf7T09_ExaLMqahlt_l-Mf8zp2ls",
    authDomain: "acoustic-spot-404923.firebaseapp.com",
    databaseURL: "https://acoustic-spot-404923-default-rtdb.firebaseio.com",
    projectId: "acoustic-spot-404923",
    storageBucket: "acoustic-spot-404923.appspot.com",
    messagingSenderId: "848903097492",
    appId: "1:848903097492:web:1ee90cfdca29848c9af881",
    measurementId: "G-YYLFERQZ07"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const signUp = () => {
    var email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    sendVerificationEmail();
   
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in 
            document.write("You are Signed Up")
            console.log(result);
            window.location.href = 'index2.html';
            // ...
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message)
            // ..
        });
}


// Login function (dummy function)
const login = () => {
    var email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    // firebase code
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in 
            console.log(result)
            localStorage.setItem("userEmail", email);
            window.location.href = 'index3.html';
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message)
        });
}