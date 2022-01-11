import  { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyALWffgfAykofVLuSKYt83BdT8kg4UrgZk",
    authDomain: "crwn-db-b0f94.firebaseapp.com",
    projectId: "crwn-db-b0f94",
    storageBucket: "crwn-db-b0f94.appspot.com",
    messagingSenderId: "52005914317",
    appId: "1:52005914317:web:3101d94b2f1424246f8b84",
    measurementId: "G-GEPVMS57JC"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(firestore, `users/${userAuth.uid}`);
    const snapShot = await getDoc(userRef);

    if(!snapShot.exists()) {
        const {displayName, email} = {userAuth};
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error){
            console.log("error creating user", error.message);
        }
        
    }
    return userRef;
}

initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => signInWithPopup(auth, provider);

//export default firebase;
