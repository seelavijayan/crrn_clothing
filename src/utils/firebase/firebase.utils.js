// Import the functions needrf from the SDKs needed
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


// crwn-clothing-web web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIJoEJzY-nzMboYzD9WU0SaLHOeQ_ynU0",
    authDomain: "crwn-clothing-db-d5e75.firebaseapp.com",
    projectId: "crwn-clothing-db-d5e75",
    storageBucket: "crwn-clothing-db-d5e75.appspot.com",
    messagingSenderId: "1006004729546",
    appId: "1:1006004729546:web:163e2bea3604aec6b22633"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    // if user data does not exists
    // create / set the document with the data from userAuth in my collection

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (err) {
            console.log('error creating the user', err);
        }
    }
    // if user data exists
    // return userDocRef
    
    return userDocRef;    
};