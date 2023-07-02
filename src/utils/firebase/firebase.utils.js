
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { signInWithEmailAndPassword, getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    updateDoc,
    query, where, deleteDoc
} from 'firebase/firestore';
import 'firebase/storage';



// Your web app's Firebase configuration
const firebaseConfig = {

    //defix
    apiKey: "AIzaSyC_anV__nyefQsqLqsVdjnpQ-FrFA5LgEM",
    authDomain: "defixdb.firebaseapp.com",
    projectId: "defixdb",
    storageBucket: "defixdb.appspot.com",
    messagingSenderId: "296756007223",
    appId: "1:296756007223:web:a7d43a196ef2b82b5dcab2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

// function getCurrentDateTime() {
//     let currentdate = new Date();
//     let datetime = currentdate.getDate() + "/"
//         + (currentdate.getMonth() + 1) + "/"
//         + currentdate.getFullYear() + " "
//         + currentdate.getHours() + ":"
//         + currentdate.getMinutes() + ":"
//         + currentdate.getSeconds();

//     return datetime;
// }

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'USERS', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { email } = userAuth;
        const createAt = new Date();
        const substatus = false;
        const subtype = "none";
        const subdate = '';
        try {
            await setDoc(userDocRef, { email, createAt, substatus, subtype, subdate })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);


///////////for defix
export async function addProject(propertyName, ownerName, propertyAddress, user) {
    const dbPL = db;
    try {
        //create new doc with custom id;
        const docRef = doc(dbPL, "ProjectList", `${propertyName}-${ownerName}-${user}`);
        
        let newData = {};

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          
            const existingData = docSnap.data();
            newData = {
                ...existingData,propertyAddress: propertyAddress,              
            }
            
            await updateDoc(docRef, newData);
        } else {            
           
            newData = {
                propertyName: propertyName,
                ownerName: ownerName,
                propertyAddress: propertyAddress,
                defectlist: [],
                user: user,
            }
            await setDoc(docRef, newData, { merge: true });
        }

    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    };
}



export async function addDefect(project, floor, area, element, defectCount, defectDesc, defectxpos, defectypos, urldefect, user) {
    const dbPL = db;
    try {

        //create new doc with custom id;
        const docRef = doc(dbPL, project, `${project}-${defectCount}`);

        const newData = {
            project: project,
            defectName: project + '-' + defectCount,
            floor: floor,
            area: area,
            element: element,
            defectDesc: defectDesc,
            defectxpos: defectxpos,
            defectypos: defectypos,
            url: urldefect,
            user: user
        }

        await setDoc(docRef, newData);


    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    };
}

export const generateProjectList = async (user) => {
    let result = [];
    let rowcount = 1;
    try {
        const dbPL = db;
        //get records for projectlist and generate select option
        const dbProjectList = collection(dbPL, 'ProjectList');
        const q = query(dbProjectList, where("user", "==", user));
        const dbProjectDocs = await getDocs(q);



        dbProjectDocs.docs.map((doc) => {
            let record = {
                rowcount: rowcount,
                propertyName: doc.get('propertyName'),
                ownerName: doc.get('ownerName'),
                propertyAddress: doc.get('propertyAddress'),
                defectlist: doc.get('defectlist'),
            }
            rowcount++;
            return result.push(record);

        });
    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    } finally {
        return result;
    }
}

export const retrieveDefectListForProject = async (project, user) => {

    try {
        const docRef = doc(db, "ProjectList", project + '-' + user);
        const docSnap = await getDoc(docRef);

        return docSnap.data().defectlist;
    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    }
}

export const retrieveUserStatus = async (user) => {

    try {
        let status = false;
        const usersCollectionRef = collection(db, 'USERS');

        const q = query(usersCollectionRef, where('email', '==', user));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            // console.log('.substatus',data.substatus);
            if (data.substatus) {
                status = true;
            } else {
                status = false;
            }

        });
        return status;
    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    }
}

export const updateDefectListForProject = async (project, count, user) => {
    let arr = [];
    try {
        const docRef = doc(db, "ProjectList", project + '-' + user);
        const docSnap = await getDoc(docRef);

        const newArrDefect = docSnap.data().defectlist;

        newArrDefect.push(project + '-' + count);

        arr = await updateDoc(docRef, { defectlist: newArrDefect })
            .then(() => {
                return retrieveDefectListForProject(project, user);
            });
    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    } finally {
        return arr;
    }
}

export const storeImg = async (file, filename) => {
    let url = '';
    const storage = getStorage();
    const storageRef = ref(storage, filename);
    try {

        await uploadBytes(storageRef, file);


    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    } finally {
        url = await getDownloadURL(ref(storage, filename));
        return url;
    }

}

export const addProjectFlrUrl = async (project, floor, url, user) => {
    try {
        const docRef = doc(db, "ProjectList", project + '-' + user);
        let data = '';
        if (floor === 'GROUND FLOOR') {
            data = {
                grdfloor: url
            }
        }
        if (floor === 'FIRST FLOOR') {
            data = {
                firstfloor: url
            }
        }
        if (floor === 'SECOND FLOOR') {
            data = {
                secondfloor: url
            }
        }
        if (floor === 'THIRD FLOOR') {
            data = {
                thirdfloor: url
            }
        }
        if (floor === 'ROOF') {
            data = {
                rooffloor: url
            }
        }
        //put javascrip switch case ehre

        await updateDoc(docRef, data);
    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    }
}

export const retrieveLayoutImg = async (project) => {
    try {
        const storage = getStorage();
        const url = await getDownloadURL(ref(storage, project));
        return url;
    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    }
}

export const retrieveDefectSummary = async (project, flr, user) => {

    const docRef = doc(db, "ProjectList", project + '-' + user);
    const docSnap = await getDoc(docRef);
    const arrDefects = docSnap.data().defectlist;

    const newArrDefects = [];
    let rowcount = 0;
    let q = '';
    try {
        if (flr) {
            q = query(collection(db, `${project}`), where("floor", "==", flr));
        } else {
            q = collection(db, `${project}`);
        }

        const querySnapshot = await getDocs(q);

        arrDefects.forEach(async (docitem) => {
            rowcount++;
            querySnapshot.forEach((doc) => {

                if (docitem === doc.id) {
                    const data = {
                        rowcount: rowcount,
                        project: doc.get('project'),
                        defectName: doc.get('defectName'),
                        area: doc.get('area'),
                        defectDesc: doc.get('defectDesc'),
                        defectNo: doc.get('defectNo'),
                        defectRemark: doc.get('defectRemark'),
                        defectxpos: doc.get('defectxpos'),
                        defectypos: doc.get('defectypos'),
                        element: doc.get('element'),
                        floor: doc.get('floor'),
                        url: doc.get('url')
                    };
                    newArrDefects.push(data);

                }
            })
        });

        return newArrDefects;
    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    }
}

export const retrievePDFSummary = async (project, user) => {

    const docRef = doc(db, "ProjectList", project + '-' + user);
    const docSnap = await getDoc(docRef);
    const arrDefects = docSnap.data().defectlist;
    const grdlayout = docSnap.data().grdfloor;
    const firstlayout = docSnap.data().firstfloor;
    const secondlayout = docSnap.data().secondfloor;
    const thirdlayout = docSnap.data().thirdfloor;
    const rooflayout = docSnap.data().rooffloor;

    const newArrDefects = [];
    let rowcount = 0;
    let q = '';
    try {
        q = collection(db, `${project}`);

        const querySnapshot = await getDocs(q);
        arrDefects.forEach(async (docitem) => {
            rowcount++;
            querySnapshot.forEach((doc) => {

                if (docitem === doc.id) {

                    let layouturl = '';
                    if (doc.get('floor') === 'GROUND FLOOR') {
                        layouturl = grdlayout;
                    }
                    if (doc.get('floor') === 'FIRST FLOOR') {
                        layouturl = firstlayout;
                    }
                    if (doc.get('floor') === 'SECOND FLOOR') {
                        layouturl = secondlayout;
                    }
                    if (doc.get('floor') === 'THIRD FLOOR') {
                        layouturl = thirdlayout;
                    }
                    if (doc.get('floor') === 'ROOF') {
                        layouturl = rooflayout;
                    }


                    const data = {
                        rowcount: rowcount,
                        area: doc.get('area'),
                        defectDesc: doc.get('defectDesc'),
                        // defectNo: doc.get('defectNo'),
                        // defectRemark: doc.get('defectRemark'),
                        defectxpos: doc.get('defectxpos'),
                        defectypos: doc.get('defectypos'),
                        element: doc.get('element'),
                        floor: doc.get('floor'),
                        url: doc.get('url'),
                        layouturl: layouturl
                    };
                    newArrDefects.push(data);

                }
            })
        });

        return newArrDefects;
    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    }
}

export async function deleteDefect(project, defectName, user) {

    try {
        //delete document
        await deleteDoc(doc(db, project, defectName));

        //delete image
        const storage = getStorage();
        const desertRef = ref(storage, defectName);
        await deleteObject(desertRef);

        //update array to remove deleted defect
        const docRef = doc(db, "ProjectList", project + '-' + user);
        const docSnap = await getDoc(docRef);
        const arrDefects = docSnap.data().defectlist;

        arrDefects.splice(arrDefects.indexOf(defectName), 1);

        await updateDoc(docRef, {
            defectlist: arrDefects
        });

    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    };
}

export const getUserNameAddress = async (project, user) => {

    const dbPL = db;

    //get records for projectlist and generate select option
    const dbProjectList = collection(dbPL, 'ProjectList');
    const q = query(dbProjectList, where("user", "==", user));
    const dbProjectDocs = await getDocs(q);

    let result = [];
    let rowcount = 1;
    try {
        dbProjectDocs.docs.map((doc) => {
            if ((doc.get('propertyName') + '-' + doc.get('ownerName')) === project) {
                let record = {
                    ownerName: doc.get('ownerName'),
                    propertyAddress: doc.get('propertyAddress'),
                }
                rowcount++;
                return result.push(record);
            }

        });

        return result;
    } catch (error) {
        console.log(`Error :${error.code},${error.message}`);
    }
}
