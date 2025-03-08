import { login, signUp, logout} from "./auth.js";

// Signup form
document.querySelector("#signUpForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const firstname = document.getElementById("firstName").value;
    const lastname = document.getElementById("lastName").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    signUp(firstname, lastname, email, password);
});

// Login form
document.querySelector("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    login(email, password);
});

// Logout form
const logOutForm = document.querySelector("#logoutForm")
if(logOutForm){
    logOutForm.addEventListener("submit", (event)=> {
        event.preventDefault()

        logout()
})}