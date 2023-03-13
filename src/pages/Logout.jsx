import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { Error, Loader } from '../components';

const Logout = () => {
    const navigate = useNavigate();

    const logout = async () => {

        try {
            await signOut(auth);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        logout();
        navigate('/login')
    }, []);

    if (false) return <Loader title="Loading artists..." />;

    // if (error) return <Error />;

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-black text-left mt-4 mb-10">Logged Out</h2>

        </div>
    );
};

export default Logout;
