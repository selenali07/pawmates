import React, { useState, useEffect, useRef, useCallback } from "react";
//import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const Api =  () => {
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
 
 
var key = 'oZ3ojgxr4ZId6uPDbBqfD3FQpnf4iM6h6cX9gV2HpD1Sz1ja6T';
var secret = 'pjG4chgmF6hI5IHEszTZaYCyyIeU0bAko4eYO1pm';

let animal ='cat';
let location = 27410;
let distance = 20;

useEffect(()=>{
  const getData = async()=>{
  const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  }, []);
  const data = await response.json();

  const api = await fetch('https://api.petfinder.com/v2/animals?types=' + animal + '&location=' + location +'&distance='+distance, {
      headers: {
        'Authorization': data.token_type + ' ' + data.access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
   })
  const data_2 = await api.json();
  
  updatePets(data_2.animals.filter( array => array.species === "Cat"));
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
 
 
 
async function click(paw){
  // getData()
 
}
 
// });
// })
// console.log(pets);
console.log("rrrr",pets)
// console.log("ell", pets)
 
  return (
    <>
    {pets.slice(count_2,count).map((user) =>(
      <article key={user}>
      <div className = "has-text-info">
        {user.name}
        
      </div>
      <div>
        <button type = "button" onClick={getCalc}>
            {user.species}
 
        </button>
      </div>
      </article>
 
      
    ))}
 
    </>
  )
    
}
 
 
export default Api;
 

