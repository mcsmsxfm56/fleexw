// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUx1tvE3BbIGg-evRadvIeL5NBfAeg8aI",
  authDomain: "flippereventos-59cd4.firebaseapp.com",
  projectId: "flippereventos-59cd4",
  storageBucket: "flippereventos-59cd4.appspot.com",
  messagingSenderId: "866077636135",
  appId: "1:866077636135:web:a9d1338c98ef9a37f9c002",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadFileAvatar = async (file: any, name: string) => {
  console.log(file);

  const storageRef = ref(storage, `Avatars/${name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return {
    name: name,
    url: url,
  };
};
export const uploadFileDni = async (file: any, name: string) => {
  const storageRef = ref(storage, `dni/${name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return {
    name: name,
    url: url,
  };
};
export const uploadFilePdf = async (file: any, name: string) => {
  const storageRef = ref(storage, `Archivos/${name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return {
    name: name,
    url: url,
  };
};
