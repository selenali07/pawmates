import React, { Component, useState } from 'react'
import'./Hero.css';
import './Navbar.css';
import { DropdownButton, Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom'
 
let currentPet = "dog";
let currentLocation= 27514;
class Hero extends Component {
  
   constructor(props){
       super(props);
       this.state = {
           animal: "dog",
           location: 27514,
       }
   }
   handleSubmit = (event) => {
       event.preventDefault();
       const data = this.state      
   }
   handleInputChange = (event) => {
       event.preventDefault();
      
       this.setState({
           [event.target.name]: event.target.value
       })
       if(event.target.name == "animal"){
           currentPet= event.target.value;
       }else if(event.target.name == "location"){
           currentLocation = event.target.value;
       }
       Window.value ={
           animal: currentPet,
           location: currentLocation
       }
   }
 
   render (){
       const {animal} = this.state.animal;
       const{location} = this.state.location;
       return (
       <div className = 'hero-container'>
           <div className = 'hero-items'>
               <h1>Welcome to Paw Mates</h1>
               <p>Find the perfect pet for you!</p>
               <form onSubmit ={this.handleSubmit}>
                   <input maxlength ="5" placeholder='Enter Zipcode' name = "location" className='input m-2' onChange = {this.handleInputChange}/>
                   <select type ="select" className = "input m-2" name="animal" selected = "" onChange =""placeholder = "Select Animal" onChange = {this.handleInputChange}>
                       <option value="select">Select an Animal</option>
                       <option value="dog">Dogs</option>
                       <option value="cat">Cats</option>
                   </select>
                   <button style={{color:"#000000", backgroundColor: "#CCFFCC", borderColor: "#CCFFCC"}} type = "submit"className='btn mt-3 is-pulled-right' ><Link to = "./Matches">Search</Link></button>
               </form>
           </div>
       </div>
       ) 
   }
}
export default Hero