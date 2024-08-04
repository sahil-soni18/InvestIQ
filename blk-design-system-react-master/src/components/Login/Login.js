import React, { useState, useContext, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import '../../assets/css/CustomCSS/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginContext } from "../../context/ContextAPI";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const loginState = useContext(loginContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (loginSuccess) {
            navigate("/blk-design-system-react");
        }
    }, [loginSuccess, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            const response = await axios.post('http://localhost:5000/users/login', {
                email,
                password
            });
    
            if (response.data.loggedIn) {
                loginState.setIsLoggedIn(true);
                loginState.setEmail(email);
                setLoginSuccess(true);

                // Save login state to localStorage
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('email', email);
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
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
                <Button className="btn-round loginButton" color="primary" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </Button>
                {error && <div className="error">{error}</div>}
                <section className="signup">
                    <p className="DontHaveAccount">Don't have an account?</p>
                    <Link to="/signup" className="signup-link">Sign up</Link>
                </section>
            </form>
        </div>
    );
};

export default Login;
