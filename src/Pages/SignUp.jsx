import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CircularLoading from "../components/CircularLoading";

export default function SignUp() {

    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [signup, setSignup] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setSignup((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function send(e) {
        e.preventDefault();
        setLoading(true);
        const email=signup.email;
        const password=signup.password;
        console.log("email and password is",email,password);
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                console.log(userCredential);
                
                const user = userCredential.user;
                // ...
                console.log("This is user",user);
                setLoading(false);
                navigate("/")
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                
                // ..
            });
    }

    return (
        <div>
        {loading?(<CircularLoading/>):(
        <div className="container">
            <div className="form-login m-0 p-1 form-loginVercel" >
                <form onSubmit={send} >
                    <h1>Please sign Up</h1>
                    <div className="box">
                        <label htmlFor="validationDefault05" className="form-label">Email</label>
                        <input type="text" className="form-control" onChange={handleChange} id="validationDefault04" autoComplete="off" name="email" required />
                    </div>
                    <div className="box">
                        <label htmlFor="validationDefault05" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={handleChange} id="validationDefault05" autoComplete="off" name="password" required />
                    </div>

                    <div className="col-12">
                        <br /><button className="btn btn-primary" type="submit">Sign Up</button>
                    </div>

                    
                </form>

            </div>


        </div>)}
        </div>
    )
}
