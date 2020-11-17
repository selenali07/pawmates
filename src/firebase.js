import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBeQ1OlPOh5wUyyyFj2IwyW16KXFYY2ESg",
  authDomain: "pawmates-72d84.firebaseapp.com",
  databaseURL: "https://pawmates-72d84.firebaseio.com",
  projectId: "pawmates-72d84",
  storageBucket: "pawmates-72d84.appspot.com",
  messagingSenderId: "258763585412",
  appId: "1:258763585412:web:789eb01eea6597fada8fd1",
  measurementId: "G-KBQBZV2ZVV"
})

export const auth = app.auth()
export default app
