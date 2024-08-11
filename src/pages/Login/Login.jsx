import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardBody, CardTitle, Alert
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

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
      params: {
        email: email
      }
    });

    const accounts = response.data;

    const user = accounts.find(account => account.password === password);

    if (user) {
      login(user);
      navigate('/app/home');
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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <CardTitle tag="h3" className="text-center mb-4">Login</CardTitle>
              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}
              <Form>
                <FormGroup className="d-flex align-items-center">
                  <Label for="email" className="mr-2" style={{ minWidth: '80px' }}>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="d-flex align-items-center">
                  <Label for="password" className="mr-2" style={{ minWidth: '80px' }}>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Button color="primary" block onClick={handleLogin}>Login</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
