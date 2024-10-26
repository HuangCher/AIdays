import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import '../css/naviPage.css';

function NaviPage() {
    return (
        <Container maxWidth="xl" className="naviPageDiv">
            <nav className="navbar">
                <button className="navButton">Safety Tips</button>
                <button className="navButton">Evacuation</button>
                <button className="navButton">Alerts</button>
                <button className="navButton">Sign Up</button>

            </nav>

            <div className="content">
                <h1 className="alertMessage">You are in a Red Zone</h1>
                <h1 className="alertMessage">[MAP GOES HERE]</h1>
            </div>
        </Container>
    );
}

export default NaviPage;
