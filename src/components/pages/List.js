import React, { useState, useEffect } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "firebase"
import { faTasks } from "@fortawesome/free-solid-svg-icons"
// import { async } from "q"
function List() {
const [error, setError] = useState("");
const { currentUser, logout } = useAuth();
const [tasks, setTasks] = useState([]);
const {posts, setPost} = useState([]);
const [count, setCount] = useState(1);
const [count_2, setCount_2] = useState(0);
const history = useHistory();
let array = {};
let array2 = [];
let list = {};
const id = currentUser.uid;

useEffect(()=>{
  const fetch = [];
  const upload = firebase.database().ref('users/'+id);
 const listener = upload.on('value', (snapshot)=>{
    const gate = [];
    snapshot.forEach(data=>{
      const key = data.key;
      const value = data.val();
      fetch.push({id: key, ...value});
    });
    setTasks(fetch);
  });
  return ()=> upload.off('value',listener);
 },[firebase.database()]);
 console.log("tasks",tasks);
const getCalc = async()=>{
  setCount(count +1);
  setCount_2(count_2+1);
  console.log(tasks.length)
  if(count === tasks.length){
    setCount(1);
    setCount_2(0);
  }
 }
  const getBack = async()=>{
   if(count == 1){
     setCount(tasks.length);
     setCount_2(tasks.length-1);
   }
   else{
   setCount(count -1);
   setCount_2(count_2-1);
   }
  }
  const dislike = async()=>{
   const remove = await firebase.database().ref('users/'+id).child(tasks[count_2].id).remove();
   window.location.reload()
 }
return (
 <>
 <h1 className = "has-text-centered m-4">Here is Your List of Likes!</h1>
 <p className = "has-text-centered mb-4">Visit 
 <a href="/matches"> Matches </a>page to fill your list</p>
 <p className = "has-text-centered mb-4"> Narrow Down Your Furry Friends</p>
 <Container>
 {tasks.slice(count_2,count).map((user) =>(
   <article id = {user.id} key={user}>
   <Card className="mb-3" style={{width: '100vw'}}>
     <div className="row no-gutters">
       <div className="col-md-5"><img style={{ width: '500px', height:'500px'}}src={user.Photo}/></div>
       <div className="col-md-7">
         <div className="card-body">
           <h1 className="title is-1">{user.Name}</h1> 
           <h3 className="subtitle is-3">{user.Gender} : {user.Age}</h3>
           <div><strong>Location: </strong>{user.City} {user.State}, {user.Zip}</div>       
           <div><strong>Status:</strong> {user.Status}</div>
           <p className = "is 3">{user.Name} is a {user.Breed}. {user.Description}</p>
           <a href={user.url}>More Info!</a>
         </div>
       </div>
     </div>
     <div className="card-footer">
       <a href="#" className="card-footer-item" onClick={getBack}><img  style={{width: '4.2vw'}}  src= {'/images/left.png'} alt = 'logo'/></a>
       <a href="#" className="card-footer-item" onClick = {dislike}><img  style={{width: '4vw'}} className = 'heartlogo' src= {'/images/x.png'} alt = 'logo'/></a>
       <a href="#" className="card-footer-item" onClick={getCalc}><img  style={{width: '4vw'}}  src= {'/images/right.png'} alt = 'logo'/></a>
     </div>
   </Card>
   
 </article>))}
 </Container>
 </>
)
}
export default List;