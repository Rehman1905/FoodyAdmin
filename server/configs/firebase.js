// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB03On1SWGbCTjdwXd58zau5XCVZELq3Ig",
//   authDomain: "foody-app-5ab57.firebaseapp.com",
//   projectId: "foody-app-5ab57",
//   storageBucket: "foody-app-5ab57.appspot.com",
//   messagingSenderId: "136182345134",
//   appId: "1:136182345134:web:6184047fcb5bbbdf2d2c3f",
//   measurementId: "G-5ZH8CB743Q"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB03On1SWGbCTjdwXd58zau5XCVZELq3Ig",
  authDomain: "foody-app-5ab57.firebaseapp.com",
  projectId: "foody-app-5ab57",
  storageBucket: "foody-app-5ab57.appspot.com",
  messagingSenderId: "136182345134",
  appId: "1:136182345134:web:6184047fcb5bbbdf2d2c3f",
  measurementId: "G-5ZH8CB743Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fileStorage = getStorage(app);

