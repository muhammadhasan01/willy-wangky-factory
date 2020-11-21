import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
            <div class="Login">
                <div class="Login-container">
                    <h1>Willy Wangky Factory</h1>
                    <Form>
                        <h2>Login</h2>
                        <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={this.email}
                            onChange={(e) => this.setState({email : e.target.value})}
                        />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.password}
                            onChange={(e) => this.setState({password : e.target.value})}
                        />
                        </Form.Group>
                        <Button block size="lg" type="submit" disabled={false}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}