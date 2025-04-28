import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { GithubAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCnXxbbWjgLcNWCHcts6qv8xVI1_sGPMcQ",
  authDomain: "instagram-clone-b12e3.firebaseapp.com",
  projectId: "instagram-clone-b12e3",
  storageBucket: "instagram-clone-b12e3.appspot.com",
  messagingSenderId: "64030569572",
  appId: "1:64030569572:web:31f7e97316c2d12a865b71"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GithubAuthProvider()
const db = getFirestore(app)

export { auth, provider, db }
