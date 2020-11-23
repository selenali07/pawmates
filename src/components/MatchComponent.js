import React from 'react'
import './Hero.css'
import './Navbar.css'
import './MatchComponent.css'
import { Card} from "react-bootstrap"

const SECTION = ['']
 
export const MatchComponent = (props) => {
   return (
       <>
       <Card>
       <Card.Body>
           <h1 className="text-is-centered">{props.name}</h1>
           <h4 className="text-is-centered">{props.like}</h4>
        <img src={props.photo}/>
           <p className="text-is-centered">{props.breed}</p>
           <p className="text-is-centered">{props.gender} | {props.age}</p>
           <p className="text-is-centered">{props.email}</p>
           <p className="text-is-centered">{props.phone}</p>
           <a href={props.url}>Adopt me!</a>
           </Card.Body>
       </Card>
       <br></br></>
   )
}
 
export default MatchComponent