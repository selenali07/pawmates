import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import firebase from "firebase"

export default function Profile() {
  return (
  <>
  <h1 className='profile'>Profile</h1>
  <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
  <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
  <Footer />
  </>
  );
}