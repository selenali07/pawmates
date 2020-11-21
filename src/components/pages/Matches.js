import React, { useState, useEffect, useRef, useCallback } from "react";
//import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
//import Window from "../Hero"
//import pf from "../Api.js";
 
//import axios from "axios";
// make current user information global, to let all scripts access it
 
//import { render } from "@testing-library/react";
 
 
 function Matches() {
  const [error, setError] = useState("")
  const [count, setCount] = useState(1);
  const [count_2, setCount_2] = useState(0);
  const { currentUser, logout } = useAuth()
  const [pets, updatePets] = useState([])
  const [Dogs, updateDoggo] = useState([])
  const history = useHistory()
  let pet = [];
  const[sendRequest, setSendRequest] = useState(false)
  const isMounted = useRef(true)
  const [value, setValue] = useState([]);
  const locations = Window.value.location;
  const specy = Window.value.animal;
 
  
 
var key = 'bR9wLqSz2Z8LzgM5Fke8Wqx1TobVeNJz5OMvRfEN1JoFvKO2hi';
var secret = '3xRQlFnGjbL2HYdRw0VLnnwcXKfhVnfHsK3j08cq';

let distance = 2;
 
 
//console.log("afjkaskdjfnaijsdfnasjdfnkjsdfn",e);
useEffect(()=>{
  // if(sendRequest){
  const getData = async()=>{
 
  setValue(Window.value);

  const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  }, []);
  const data = await response.json();
  // console.log(data);
  const api = await fetch('https://api.petfinder.com/v2/animals?types=' + specy + '&location=' + locations +'&distance='+distance, {
      headers: {
        'Authorization': data.token_type + ' ' + data.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
   })
  const data_2 = await api.json();

 
  updatePets(data_2.animals.filter( array => array.species == "Cat" || array.species == "Dog"));
  setSendRequest(false);
   
  };
    getData();
},[]);
 
const getCalc = async()=>{
  setCount(count +1);
  setCount_2(count_2+1);
  console.log(pets.length)
  if(count === pets.length){
    setCount(1);
    setCount_2(0);
  }
  console.log(count);
  console.log(count_2);
}
 
  return (
    <>
    <h1>Matches</h1>
    
    {pets.slice(count_2,count).map((user) =>(
      <article id = {user.id} key={user}>
          <div className="card">
            <header className="card-header">
              <h1 className="card-header-title">
              <div className="col-sm-6 text-center">
          <img className="img-fluid rounded-circle mt-2" src={user.photos[3]}></img>
          </div>
        
      <div className="media-content">
        <p className="title is-1">{user.name}</p>
        <p className="subtitle is-3">{user.gender} : {user.age}</p>
      </div>
  
      </h1>
  
          </header>
          
            <div className="card-content">
 
              <div className="content has-text-right">
                <p class = "has-text-left is-3">
                Status: {user.status}
                </p>
                <br/>
                <p class = "has-text-left is 3">{user.name} is a {user.breeds.primary}. {user.description}</p>
                <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                <br/>
                <time datetime="2020-11-21">8:09 AM - 21 Nov 2020</time>
              </div>
            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item" ><i className="far fa-heart"></i></a>
              <a href="#" className="card-footer-item" onClick={getCalc}>Skip</a>
            </footer>
     
          </div>
 </article>
 
      
    ))}
 
    </>
  )
    
}
 
 
export default Matches;