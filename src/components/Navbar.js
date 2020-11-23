import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='nav'>
        <div className='navcontainer'>
          <Link to='/' className='navlogo' onClick={closeMobileMenu}>
          <img className = 'navlogo' src= {'/images/pawlogo.png'} alt = 'logo'/>
          Paw-Mates
          </Link>
          <div className='menuicon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='navitem'>
              <Link to='/' className='navlinks' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='navitem'>
              <Link
                to='/list'
                className='navlinks'
                onClick={closeMobileMenu}
              >
                List
              </Link>
            </li>
            <li className='navitem'>
              <Link
                to='/matches'
                className='navlinks'
                onClick={closeMobileMenu}
              >
                Matches
              </Link>
            </li>
            <li className='navitem'>
             <Link
               to='/maps'
               className='navlinks'
               onClick={closeMobileMenu}
             >
               Maps
             </Link>
           </li>
            <li className='navitem'>
              <Link
                to='/profile'
                className='navlinks'
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;