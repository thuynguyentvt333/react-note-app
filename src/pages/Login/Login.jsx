import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
    Button, Form, FormGroup, Input, Container, Card, CardBody, CardTitle, Alert
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Login.scss';
import img_login from '../../assets/images/img_login.jpg';
import bcrypt from 'bcryptjs';

const Login = () =>  {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/accounts', {
        params: { email: email }
      });

      const users = response.data;

      if (users.length === 0) {
        setError('Invalid email or password');
        setSuccess('');
        return;
      }

      const user = users[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        login(user);
        navigate('/app');
      } else {
        setError('Invalid email or password');
        setSuccess('');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      setError('An error occurred during login');
      setSuccess('');
    }
  };

  return (
    <Container className="login-container">
        <div md="6" className="login-image-container">
          <img src={img_login} alt="Login Illustration" className="login-image" />
        </div>
        <div md="6" className="login-form-container">
          <Card className="login-card">
            <CardBody>
              <CardTitle tag="h3" className="login-title">Log in to Your Notebook</CardTitle>
              {error && <Alert color="danger" className="login-alert">{error}</Alert>}
              {success && <Alert color="success" className="login-alert">{success}</Alert>}
              <Form>
                <FormGroup className="form-group">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                  />
                </FormGroup>
                <Button block className="login-button" onClick={handleLogin}>SUBMIT</Button>
              </Form>
              <div className="login-register-link">
                <a href="/register">Not a member? Register</a>
              </div>
            </CardBody>
          </Card>
        </div>
    </Container>
  );
}

export default Login;
