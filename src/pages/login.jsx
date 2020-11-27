import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import './login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    formIsComplete() {
        return this.state.email !== '' && this.state.password !== '';
    }

    handleClickLogin = () => {
        if (this.formIsComplete()) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div class="Login">
                <div class="Login-container">
                    <div class="title">Willy Wangky Factory</div>
                    <div class='text-muted text-center'>
                    Login terlebih dahulu untuk menggunakan factory ini!
                    </div>
                    <Form>
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
                        <Button block size="lg" disabled={!this.formIsComplete()} onClick={this.handleClickLogin}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}