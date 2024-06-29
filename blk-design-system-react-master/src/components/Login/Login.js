import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import '../../assets/css/CustomCSS/Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log("Calling API Login.........")
            const response = await axios.post('http://localhost:5000/users/login', {
                email: email,
                password: password
            });
            console.log(`response.data = ${JSON.stringify(response.data)}`);
            // handle successful login here (e.g., redirect, save token, etc.)
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="loginForm" onSubmit={handleSubmit}>
                <h1 className="WebsiteName">InvestIQ</h1>
                <label className="loginLabel">Email</label>
                <Input
                    className="Input-Field"
                    placeholder="Email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className="loginLabel">Password</label>
                <Input
                    className="Input-Field"
                    placeholder="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="forgotPassword">Forgot Password?</div>
                <Button className="btn-round loginButton" color="primary" type="submit">
                    Login
                </Button>
                <section className="signup">
                    <p className="DontHaveAccount">Don't have an account?</p>
                    <Link to="/signup" className="signup-link">Sign up</Link>
                </section>
            </form>
        </div>
    );
};

export default Login;
