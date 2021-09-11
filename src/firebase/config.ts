import firebase from 'firebase/app'

const firebaseConfig = {
	apiKey: "AIzaSyBySzCwKBjsTIAMOGKNH8h4DPlvDaiN6D8",
	authDomain: "todolist-ab935.firebaseapp.com",
	projectId: "todolist-ab935",
	storageBucket: "todolist-ab935.appspot.com",
	messagingSenderId: "555470931768",
	appId: "1:555470931768:web:235e110890b59a6db4e3cd"
};

firebase.initializeApp(firebaseConfig);

export default firebase;