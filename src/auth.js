import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config.js";
import { setDoc, doc } from "firebase/firestore";


// Dummy users data
const dummyUsers = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: "password123"
    },
    {
        firstName: "Marty",
        lastName: "McFly",
        email: "BTF@testing.com",
        password: "123456"
    },
    {
        firstName: "Doc",
        lastName: "Brown",
        email: "DBtesting@gmail.com",
        password: "654321"
    }
];

// Function to create dummy users
async function createDummyUsers() {
    try {
        for (const user of dummyUsers) {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
            console.log(`User signed up: ${userCredential.user.email}`);
            console.log(`User ID: ${userCredential.user.uid}`);

            // Add user data to Firestore
            const userRef = doc(db, "users", userCredential.user.uid);
            await setDoc(userRef, {
                firstname: user.firstName,
                lastname: user.lastName,
                timestamp: new Date()
            });
            console.log(`User data stored in Firestore for: ${user.email}`);
        }
    } catch (error) {
        console.error("Error signing up and creating user data:", error.message);
    }
}
createDummyUsers();

onAuthStateChanged(auth, async (user)=>{
    if(user){
        console.log("Logged In User: ", user.email)
        await fetchUserData(user.uid)
    }else{
        console.log("No user is signed in")
    }
})


// Sign Up function
export async function signUp(firstName, lastName, email, password) {
    try {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User signed up:", user.email);
        const userRef = doc(db, "users", user.uid);

        await setDoc(userRef, {
            firstname: firstName,
            lastname: lastName,
            email: email,
            timestamp: new Date(),
        });

        console.log("User data added to Firestore:", userRef.id);

        // Page Redirect
        window.location.href = "songs.html";

    } catch (error) {
        console.error("Error signing up and creating user data:", error);
    }
}

// Login function
export async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "songs.html"; // Redirect after login
    } catch (error) {
        console.error("Login error:", error.message);
    }
}

// Logout function
export async function logout() {
    try {
        await signOut(auth);
        console.log("User Logged out");
        window.location.href = "index.html"; // Redirect to login page
    } catch (error) {
        console.error("Logout error:", error.message);
    }
}
