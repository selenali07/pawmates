import React from 'react'
// import '../App.css'
import './Hero.css'
import './Navbar.css'
 
const SECTION = ['']
 
export const MatchComponent = (props) => {
   return (
       <>
       <div className="card">
       <div className="card-body">
       <h1>{props.name}</h1>
       <h4>{props.city}, {props.state}</h4>
       <ul className="is-centered">
       <li><strong>Interest: </strong>{props.status}</li>
           <li><strong>Breed: </strong>{props.breed}</li>
           <li><div>{props.age} | {props.gender}</div></li>
          </ul></div>
           <a href={props.adopt}>Adopt Me!</a>
       </div>
       <br></br>
</>
   )
}
 
export default MatchComponent
