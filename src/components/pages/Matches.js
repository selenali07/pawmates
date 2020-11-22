import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, Container, Col, Button, Alert, Row } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
function Matches() {
const [error, setError] = useState("")
const [count, setCount] = useState(1);
const [count_2, setCount_2] = useState(0);
const { currentUser, logout } = useAuth()
const [pets, updatePets] = useState([])
const [Dogs, updateDoggo] = useState([])
const history = useHistory()
let pet = [];
let medium = "medium"
const[sendRequest, setSendRequest] = useState(false)
const isMounted = useRef(true)
const [value, setValue] = useState([]);
const locations = Window.value.location;
const specy = Window.value.animal;
var key = 'bR9wLqSz2Z8LzgM5Fke8Wqx1TobVeNJz5OMvRfEN1JoFvKO2hi';
var secret = '3xRQlFnGjbL2HYdRw0VLnnwcXKfhVnfHsK3j08cq';
let distance = 20;
useEffect(()=>{
const getData = async()=>{
setValue(Window.value);
if(locations == undefined) { locations = 27514;}
if(specy == undefined) { specy = "dog"; }
const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}, []);
const data = await response.json();
const api = await fetch('https://api.petfinder.com/v2/animals?type=' + specy + '&location=' + locations +'&distance='+distance + '&photos=' +medium, {
    headers: {
      'Authorization': data.token_type + ' ' + data.access_token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
 })
const data_2 = await api.json();
updatePets(data_2.animals.filter( array => array.species == "Cat" || array.species == "Dog" && array.photos[0] != null));
setSendRequest(false);
 };
  getData();
},[]);
const getNext = async()=>{
setCount(count +1);
setCount_2(count_2+1);
if(count === pets.length){
  setCount(1);
  setCount_2(0);
}
};
const getBack = async()=>{
 if(count == 1){
   setCount(1);
   setCount_2(0);
 } else {
 setCount(count -1);
 setCount_2(count_2-1);
 }
};

return (
  <>
  <h1 className = "has-text-centered m-4">Find your match today!</h1>
  <p className = "has-text-centered mb-4">Give your potential pawmate a heart to view in list</p>
  {pets.slice(count_2,count).map((user) =>(
    <article id = {user.id} key={user}>
    <Container>
    <Card className="mb-3" style={{width: '100vw'}}>
      <div className="row no-gutters">
        <div className="col-md-5"><img style={{ width: '500px', height:'500px'}}src={user.photos[0].full}/></div>
        <div className="col-md-7">
          <div className="card-body">
            <h1 className="title is-1">{user.name}</h1>   
            <h3 className="subtitle is-3">{user.gender} : {user.age}</h3>
            <div><strong>Location: </strong>{user.contact.address.address1} {user.contact.address.city} {user.contact.address.state} {user.contact.address.postcode}</div>         
            <div><strong>Status:</strong> {user.status}</div>
            <p className = "is 3">{user.name} is a {user.breeds.primary}. {user.description}</p>
            <a href={user.url}>More Info!</a>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <a href="#" className="card-footer-item" onClick={getBack}><i className="fas fa-arrow-left"></i></a>
        <a href="#" className="card-footer-item" ><i className="far fa-heart"></i></a>
        <a href="#" className="card-footer-item" onClick={getNext}><i className="fas fa-arrow-right"></i></a>
      </div>
    </Card>
    </Container>
  </article>))}
  </>
)
}
export default Matches;