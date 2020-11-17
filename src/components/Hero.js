import React from 'react'
import'./Hero.css';
import './Navbar.css';

function Hero() {
    return (
        <div className = 'hero-container'>
            <div className = 'hero-items'>
                <h1>Welcome to Paw Mates</h1>
                <p>Find the perfect pet for you!</p>
                <input type='text' className='input' placeholder='Location'/>
                <button className='mt-3 is-pulled-right'>Search</button>
            </div>
        </div>
        
    )
}

export default Hero
