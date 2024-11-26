import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import CircularLoading from "../components/CircularLoading";

export default function Login() {

    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setLogin((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function send(e) {
        e.preventDefault();
        setLoading(true);
        const email = login.email;
        const password = login.password;
        console.log("email and password is", email, password);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                setLoading(false);
                navigate("/task")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                
            });
    }

    return (
        <div>
        {loading?(<CircularLoading/>):(
        <div className="container">
            <div className="form-login m-0 p-1 form-loginVercel" >
                <form onSubmit={send} >
                    <h1>Please sign in</h1>
                    <div className="box">
                        <label htmlFor="validationDefault05" className="form-label">Email</label>
                        <input type="text" className="form-control" onChange={handleChange} id="validationDefault04" autoComplete="off" name="email" required />
                    </div>
                    <div className="box">
                        <label htmlFor="validationDefault05" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={handleChange} id="validationDefault05" autoComplete="off" name="password" required />
                    </div>

                    <div className="col-12">
                        <br /><button className="btn btn-primary" type="submit">Login</button>
                    </div>

                    <p >Click here to<Link to={"/signup"} className="mx-2">Create account</Link></p>
                </form>

            </div>


        </div>)}
        </div>
    )
}
