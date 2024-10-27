import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import '../css/homePage.css';

function HomePage() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");

    const handleSubmit = (event) => {
        console.log("submitting");
        event.preventDefault(); // Prevent the default form submission
        if (city && state && zipcode) { // Check if all fields are filled
            navigate("/dashboard"); // Navigate to Dashboard.js
        } else {
            alert("Please fill in all fields."); // Alert if any field is empty
        }
    };

    return (
        <Container maxWidth='xl' className="homePageDiv" 
            style={{
                backgroundColor: '#e0f7fa', 
                padding: '40px',
                borderRadius: '8px',
                textAlign: 'center',
            }}
        >
            <h1 style={{ color: '#00695c', fontSize: '2.5rem', fontWeight: 'bold' }}>FOR(WARD) CASTING</h1>
            <p style={{ color: '#004d40', fontSize: '1.2rem' }}>
                Your place for all the most important news for natural disaster planning.
                To get started, please input your city, state, and zipcode.
            </p>

            {/* form */}
            <Box
                component="form"
                onSubmit={handleSubmit} // Add onSubmit handler
                sx={{
                    '& .MuiTextField-root': {
                        m: 2,
                        width: '25ch',
                        '& .MuiInputBase-root': {
                            color: '#004d40', // Change text color
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#004d40', // Change border color
                        },
                        '& .MuiInputLabel-root': {
                            color: '#004d40', // Change label color
                        }
                    }
                }}
                noValidate
                autoComplete="off"
                style={{ marginBottom: '70px' }}
            >
                <TextField 
                    id="outlined-city" 
                    label="City" 
                    type="text" 
                    value={city} // Bind city state
                    onChange={(e) => setCity(e.target.value)} // Update city state
                />
                <TextField 
                    id="outlined-state" 
                    label="State" 
                    type="text" 
                    value={state} // Bind state state
                    onChange={(e) => setState(e.target.value)} // Update state state
                />
                <TextField 
                    id="outlined-zipcode" 
                    label="Zipcode" 
                    type="text" 
                    value={zipcode} // Bind zipcode state
                    onChange={(e) => setZipcode(e.target.value)} // Update zipcode state
                />
            </Box>
            
            <Button
                type="submit" // Set button type to submit
                variant="contained"
                className="homePageButton"
                style={{
                    background: 'linear-gradient(45deg, #00838f, #00695c)',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: '20px',
                }}
                onClick={handleSubmit}
            >
                Send
            </Button>
        </Container>
    );
}

export default HomePage;
