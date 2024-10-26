import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import '../css/evacPage.css'; 

function EvacPage() {
    const protocols = [
        "AI will generate something when your red",
        "AI will generate something when your red",
        "AI will generate something when your red"
    ];

    const locations = [
        "AI will generate something based on the location the user sent in",
        "AI will generate something based on the location the user sent in",
        "AI will generate something based on the location the user sent in"
    ];

    return (
        <Container maxWidth="xl" className="evacuationProtocolsDiv">
            <Box sx={{ textAlign: 'center', marginBottom: '30px' }}>
                <Typography variant="h3" className="title">Evacuation Protocols</Typography>
                <Typography variant="h6" className="subtitle">
                    Stay safe by following these evacuation protocols.
                </Typography>
            </Box>

            <Box sx={{ margin: '20px', padding: '20px', backgroundColor: '#e0f7fa', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h5" className="protocolsHeading">Evacuation Protocols:</Typography>
                <ul className="protocolsList">
                    {protocols.map((protocol, index) => (
                        <li key={index} className="protocolItem">{protocol}</li>
                    ))}
                </ul>
            </Box>

            <Box sx={{ margin: '20px', padding: '20px', backgroundColor: '#e0f7fa', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
                <Typography variant="h5" className="locationsHeading">Recommended Evacuation Locations:</Typography>
                <ul className="locationsList">
                    {locations.map((location, index) => (
                        <li key={index} className="locationItem">{location}</li>
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

export default EvacPage;
