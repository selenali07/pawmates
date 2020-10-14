import React from 'react'
import '../App.css';
import'./Hero.css';
import './Navbar.css';

function Hero() {
    return (
        <div className = 'hero-container'>
        <img alt = "hero" src="/images/hero.jpg"/>
        <div className = 'hero-items'>
        <h1>Welcome to Paw Mate</h1>
        <p>Find the perfect pet for you!</p>
        <input type="text" className="input" placeholder="Location" />
        </div>
        </div>
        
    )
}

export default Hero
