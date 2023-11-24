import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';


const Navbar = ({ logout, isAuthenticated }) => {
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <a className='nav-link' href='#!' onClick={(e) => {e.preventDefault();}}>Dashboard</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='#!' onClick={(e) => {e.preventDefault();}}>Journal</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='#!' onClick={(e) => {e.preventDefault();}}>Habits</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='#!' onClick={(e) => {e.preventDefault();}}>Projects</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='#!' onClick={(e) => {e.preventDefault();}}>Tasks</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='#!' onClick={(e) => {e.preventDefault();}}>ContentRatings</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='#!' onClick={(e) => {e.preventDefault();}}>Notes</a>
            </li>
            <li className='nav-item'>
                <a className='nav-link' href='#!' onClick={logout_user}>Logout</a>
            </li>
        </Fragment>
    );

    return (
        <Fragment>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <Link className='navbar-brand' to='/'>EKULMA</Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </ul>
                </div>
            </nav>
            {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);
