import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import '../css/safetyPage.css';

function SafetyPage() {
    const tips = [
        "AI will generate something when your red",
        "AI will generate something when your red",
        "AI will generate something when your red",
    ];

    return (
        <Container 
            maxWidth="xl" 
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }} // Add this style
            className="safetyTipsDiv"
        >
            <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
                <Typography variant="h3" className="title">Safety Tips</Typography>
                <Typography variant="h6" className="subtitle">
                    Be prepared for natural disasters with these essential tips.
                </Typography>
            </Box>

            <Box 
                sx={{ 
                    margin: '20px', 
                    padding: '20px', 
                    backgroundColor: '#e0f7fa', 
                    borderRadius: '8px', 
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
                    flex: 1 // Make this Box grow to fill available space
                }}
            >
                <Typography variant="h5" className="tipsHeading">Here are some important safety tips:</Typography>
                <ul className="tipsList">
                    {tips.map((tip, index) => (
                        <li key={index} className="tipItem">{tip}</li>
                    ))}
                </ul>
            </Box>

            <Button
                variant="contained"
                className="backButton"
                onClick={() => window.history.back()} >
                Back to Home
            </Button>
        </Container>
    );
}

export default SafetyPage;
