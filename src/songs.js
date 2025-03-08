import { collection, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config.js";
import { signOut } from "firebase/auth";

const songsCollection = collection(db, "songs");

// Add a new song to Firestore
export async function addSong(title, artist) {
    try {
        const docRef = await addDoc(songsCollection, {
            title: title,
            artist: artist,
            timestamp: serverTimestamp(),
        });

        console.log("Song added with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding song: ", error);
    }
}

// Delete a song from Firestore
export async function deleteSong(id) {
    try {
        const docRef = doc(db, "songs", id);
        await deleteDoc(docRef);
        console.log("Song deleted with ID:", id);
    } catch (error) {
        console.error("Error deleting song: ", error);
    }
}

// Real-time listener to display songs
function displaySongs() {
    const songList = document.getElementById("songList");
    
    onSnapshot(songsCollection, (snapshot) => {
        songList.innerHTML = ""; // Clear existing list
        snapshot.forEach((doc) => {
            const song = doc.data();
            const listItem = document.createElement("li");
            listItem.textContent = `${song.title} by ${song.artist}`;
            
            // Delete button for each song
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteSong(doc.id);
            
            listItem.appendChild(deleteButton);
            songList.appendChild(listItem);
        });
    });
}

// Logout function
document.getElementById("logoutButton").addEventListener("click", async () => {
    try {
        await signOut(auth);
        console.log("User Logged out");
        window.location.href = "index.html"; // Redirect to login page
    } catch (error) {
        console.error("Logout error: ", error.message);
    }
});

// Event listener for adding songs
document.getElementById("addSongForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("songTitle").value;
    const artist = document.getElementById("songArtist").value;

    await addSong(title, artist);
    document.getElementById("addSongForm").reset();
});

// Initialize the real-time display
displaySongs();
