import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='socialMedia'>
        <div className='socialMedia-wrap'>
          <div className='footerlogo'>
            <Link to='/' className='sociallogo'>
            <img className = 'footerlogo' src= {'/images/pawlogo.png'} alt = 'logo'/>
          Paw-Mates
            </Link>
          </div>
          <small className='legal'>© 2020 Paw Mates All Rights Reserved</small>
          
        </div>
      </section>
    </div>
  );
}

export default Footer;