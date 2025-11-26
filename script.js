// Import Firebase Functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAUm-RHq4naN9P_5muKOcxZbeNnZZYE3uo",
    authDomain: "skyshout-edf4d.firebaseapp.com",
    projectId: "skyshout-edf4d",
    storageBucket: "skyshout-edf4d.firebasestorage.app",
    messagingSenderId: "273663944072",
    appId: "1:273663944072:web:957fe61a4a7d302195c63d",
    measurementId: "G-1TSCXJWWDP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// --- 1. HANDLE GOOGLE LOGIN (For index.html) ---
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("User logged in:", user.displayName);
                
                // Hide Overlay
                const overlay = document.getElementById('google-login-overlay');
                if(overlay) overlay.style.display = 'none';
                
                // Alert User
                alert(`Welcome to SkyShout, ${user.displayName}!`);
            }).catch((error) => {
                console.error("Login Failed:", error);
                alert("Login Failed. See console for details.");
            });
    });
}

// --- 2. HANDLE BOOKING FORM (For booking.html) ---
const bookingBtn = document.getElementById('bookingBtn');
if (bookingBtn) {
    bookingBtn.addEventListener('click', async () => {
        
        // Get Input Values
        const nameInput = document.querySelector('input[type="text"]');
        const emailInput = document.querySelector('input[type="email"]');
        const serviceInput = document.querySelector('select');
        const dateInput = document.querySelector('input[type="date"]');

        const name = nameInput ? nameInput.value : "";
        const email = emailInput ? emailInput.value : "";
        const service = serviceInput ? serviceInput.value : "";
        const date = dateInput ? dateInput.value : "";

        if(!name || !email || !date) {
            alert("Please fill in all fields");
            return;
        }

        const originalText = bookingBtn.innerText;
        bookingBtn.innerText = "Processing...";

        try {
            // Save to Firestore Database
            const docRef = await addDoc(collection(db, "bookings"), {
                name: name,
                email: email,
                service: service,
                date: date,
                timestamp: new Date()
            });

            console.log("Booking ID: ", docRef.id);
            alert("Booking Request Sent Successfully! We will contact you soon.");
            bookingBtn.innerText = "Request Sent ✓";
            
            // Redirect to Payment (Placeholder)
            // window.location.href = "https://razorpay.com"; 

        } catch (e) {
            console.error("Error adding booking: ", e);
            alert("Error sending request. Check console for details.");
            bookingBtn.innerText = originalText;
        }
    });
}
