import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
            <img className = "nav-logo" src= {'/images/pawlogo.png'} alt = "logo"/>
          Paw-Mates
            </Link>
          </div>
          <small class='legal'>© 2020 Paw Mates All Rights Reserved</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link github'
              to='/'
              target=''
              aria-label='Github'
            >
              <i class='fab fa-github' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target=''
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target=''
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target=''
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target=''
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;