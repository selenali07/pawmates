import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footerlogo'>
            <Link to='/' className='sociallogo'>
            <img className = 'footerlogo' src= {'/images/pawlogo.png'} alt = 'logo'/>
          Paw-Mates
            </Link>
          </div>
          <small className='legal'>© 2020 Paw Mates All Rights Reserved</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link github'
              to='/'
              target=''
              aria-label='Github'
            >
              <i className='fab fa-github' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target=''
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target=''
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target=''
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target=''
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;