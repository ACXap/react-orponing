import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class NavControlB extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Link className="nav-link active s-lg" to='/'>Орпонизация</Link>
                    <Link className="nav-link" to='/orponing-service'>Сервис орпонизации</Link>
                    <Link className="nav-link" to='/logs'>События</Link>
                    <Link className="nav-link" to='/about'>Помощь</Link>
                </Nav>
            </Navbar>
        );
    }
}