import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-secondary'>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to='/' className='nav-link'>
              Accueil
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/favoris' className='nav-link'>
              Favoris
            </Link>
          </li>
          <li className='nav-item dropdown'>
            <Link to='/a_voir' className='nav-link'>
              A voir
            </Link>
          </li>
        </ul>
        <form className='form-inline my-2 my-lg-0'>
          <input className='form-control mr-sm-2' type='search' placeholder='Film...' aria-label='Search' />
          <button className='btn btn-dark my-2 my-sm-0' type='submit'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
    </nav>
  );
}
