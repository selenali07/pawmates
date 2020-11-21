import React, { Component, useState } from 'react'
import'./Hero.css';
import './Navbar.css';
import { DropdownButton, Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom'

let animal1 = "dog";
let location1= 27514;
 
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
        console.log("data is:",data)
        
    }
    handleInputChange = (event) => {
        event.preventDefault();
        
        this.setState({
            [event.target.name]: event.target.value
        })
        if(event.target.name == "animal"){
            animal1= event.target.value;
 
        }else if(event.target.name == "location"){
            location1 = event.target.value;
 
        }
        Window.value ={
            animal: animal1,
            location: location1
        }
        console.log("window.value",Window.value);
    }

    render (){
        const {animal} = this.state.animal;
        const{location} = this.state.location;
        return (
        <div className = 'hero-container'>
            <div className = 'hero-items'>
                <h1>Welcome to Paw Mates</h1>
                <p>Find the perfect pet for you!</p>
        <p>Animal is {animal}</p>
                <form onSubmit ={this.handleSubmit}>
                    <input type ="text"  placeholder='Location' name = "location" className='input' onChange = {this.handleInputChange}/>
                    
                    <select type ="select" className = "input" name="animal" selected = "" onChange =""placeholder = "Select Animal" onChange = {this.handleInputChange}>
                        <option value="select">Select an Animal</option>
                        <option value="dog">Dogs</option>
                        <option value="cat">Cats</option>
                    </select>
                    <button type = "submit"className='mt-3 is-pulled-right' ><Link to = "./Matches">Search</Link></button>
                </form>
            </div>
        </div>
        )  
    }
}
 
export default Hero
