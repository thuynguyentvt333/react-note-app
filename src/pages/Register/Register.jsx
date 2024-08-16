import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Form, FormGroup, Input, Container, Col, Card, CardBody, CardTitle, Alert
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import img_register from '../../assets/images/img_register.jpg';
import bcrypt from 'bcryptjs';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async () => {
        if (!username || !email || !password) {
        setError('Please fill in all fields');
        setSuccess('');
        return;
        }

        try {
            // tìm id cao nhất sau đó + 1 để tạo id mới
            const response = await axios.get('http://localhost:5000/accounts');
            const existingAccounts = response.data;

            const newId = existingAccounts.length > 0
                ? Math.max(...existingAccounts.map(account => Number(account.id))) + 1
                : 1;

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                id: newId.toString(),
                username: username,
                email: email,
                password: hashedPassword,
                avatar: '',
                gender: ''
            };

            await axios.post('http://localhost:5000/accounts', newUser);

            setSuccess('Account created successfully!');
            setError('');
            navigate('/login');
        } catch (error) {
            console.error('Error registering', error);
            setError('An error occurred during registration');
            setSuccess('');
        }
    };

    return (
        <Container className="register-container">
        <Col md="6" className="register-form-container">
            <Card className="register-card">
            <CardBody>
                <CardTitle tag="h3" className="register-title">Create Your Account</CardTitle>
                {error && <Alert color="danger" className="register-alert">{error}</Alert>}
                {success && <Alert color="success" className="register-alert">{success}</Alert>}
                <Form>
                <FormGroup className="form-group">
                    <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="register-input"
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="register-input"
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
                    className="register-input"
                    />
                </FormGroup>
                <Button block className="register-button" onClick={handleRegister}>SUBMIT</Button>
                </Form>
                <div className="register-login-link">
                <a href="/login">Already a member? Log in</a>
                </div>
            </CardBody>
            </Card>
        </Col>
        <Col md="6" className="register-image-container">
            <img src={img_register} alt="Register Illustration" className="register-image" />
        </Col>
        </Container>
    );
};

export default Register;
