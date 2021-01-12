import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

const LoginScreen = ({ history }) => {

    const {dispatch} = useContext(AuthContext);

    const loggedUser = {
        name: 'Albus'
    }

    const handleLogin = () => {
        const lastPage = localStorage.getItem('lastPage') || '/';
        
        dispatch(
            {type: types.login, payload: loggedUser }
        )

        history.replace(lastPage);
    }

    return (
        <div className="container mt-5">
            <h1>Login HeroApp</h1>
            <hr />

            <button className="btn btn-primary" onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}

export default LoginScreen
