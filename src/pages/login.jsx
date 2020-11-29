import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import './login.css';

const Login = () => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let history = useHistory();
    
    const formIsComplete = () => {
        return username !== '' && password !== '';
    }

    const handleClickLogin = () => {
        if (formIsComplete()) {
            let http = new XMLHttpRequest();
            http.open('POST', 'http://localhost:8081/api/login?wsdl', false);
            let body = `
            <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                <Body>
                    <isUserExist xmlns="http://service.willywangky/">
                        <arg0 xmlns="">${username}</arg0>
                        <arg1 xmlns="">${password}</arg1>
                    </isUserExist>
                </Body>
            </Envelope>`;
            http.onreadystatechange = () => {
                if (http.readyState === 4 && http.status === 200) {
                    let msg = (new DOMParser()).parseFromString(http.responseText, 'text/xml')
                    if (msg.getElementsByTagName("return")[0].innerHTML !== "false") {
                        console.log(msg)
                        const cookies = new Cookies();
                        // path : '/', meng-enable cookie buat semua page
                        cookies.set('username', username, { path: '/' })
                        cookies.set('password', password, { path: '/' })
                        history.push("/home");
                    }
                }
            }
            http.setRequestHeader('Content-Type', 'text/xml');
            http.send(body);
        }
    }
     
    return (
        <div className="Login">
            <div className="Login-container">
                <div className="title">Willy Wangky Factory</div>
                <div className='text-muted text-center'>
                    Login terlebih dahulu untuk menggunakan factory ini!
                </div>
                <Form>
                    <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>
                    <Button block size="lg" disabled={!formIsComplete()} onClick={handleClickLogin}>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;