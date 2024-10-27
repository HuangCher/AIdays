// MainPage.js
import React from 'react';
import { Container } from '@mui/material';
import Map from './Map';
import SafetyPage from './safetyPage'; // Ensure your file names match
import HurricaneTracker from './HurricaneTracker'; // Import the new component

function MainPage() {
    return (
        <Container 
            maxWidth="xl" 
            style={{ 
                padding: 0, // Remove padding for full width
                display: 'flex', // Use flexbox layout
                height: '100vh' // Fill the entire viewport height
            }}
        >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}> {/* Safety and Hurricane Tracker on the left */}
                <div style={{ flex: 1, backgroundColor: '#e0f7fa' }}> {/* SafetyPage */}
                    <SafetyPage />
                </div>
                <div style={{ flex: 1, backgroundColor: '#b2ebf2' }}> {/* HurricaneTracker */}
                <HurricaneTracker lat="29.6516" lon="-82.3248" area="FL" />
                </div>
            </div>
            <div style={{ flex: 1, backgroundColor: '#b2ebf2' }}> {/* Map on the right */}
                <Map />
            </div>
        </Container>
    );
}

export default MainPage;
