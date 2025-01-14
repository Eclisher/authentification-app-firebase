const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const firebaseConfig = {

    apiKey: "AIzaSyDy9J_ZRes3Grh845CtLqFcyRk9ggmjso4",
  
    authDomain: "auth-app-c91b4.firebaseapp.com",
  
    projectId: "auth-app-c91b4",
  
    storageBucket: "auth-app-c91b4.firebasestorage.app",
  
    messagingSenderId: "59607462211",
  
    appId: "1:59607462211:web:32c867e1d0c9dc40a7bff6",
  
    measurementId: "G-TXLXCVC3JN"
  
  };
  

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    res.status(201).json({ message: "Utilisateur créé avec succès", user: userCredential.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    res.status(200).json({ message: "Connexion réussie", user: userCredential.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
