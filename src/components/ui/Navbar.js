import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const Navbar = () => {

    const {user, dispatch} = useContext(AuthContext);
    const history = useHistory();

    const handleLogOut = () => {
        history.replace('/login')

        dispatch(
            {type: types.logout}
        )
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Heroes App
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/search"
                    >
                        Búsqueda
                    </NavLink>
                </div>
            </div>

            <div>
                <ul className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info">
                        {user.name}
                    </span>

                    <button 
                        className="btn btn-outline-danger"
                        onClick={handleLogOut} 
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}