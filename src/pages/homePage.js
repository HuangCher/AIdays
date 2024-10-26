import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import '../css/homePage.css';


function HomePage() {
    return (
        <Container maxWidth='xl' className="homePageDiv" 
            style={{
                backgroundColor: '#e0f7fa', 
                padding: '40px',
                borderRadius: '8px',
                textAlign: 'center',
            }}
        >
            <h1 style={{ color: '#00695c', fontSize: '2.5', fontWeight: 'bold' }}>FOR(WARD) CASTING</h1>
            <p style={{ color: '#004d40', fontSize: '1.2' }}>
                Your place for all the most important news for natural disaster planning.
                To get started, please input your city, state, and zipcode.
            </p>

            {/* form */}
            <Box
                component="form"
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
                style = {{marginBottom: '70px'}}
            >

                {/* city */}
                <TextField id="outlined-search" label="City" type="search" />
                {/* state*/}
                <TextField id="outlined-search" label="State" type="search" />
                {/* zipcode */}
                <TextField id="outlined-search" label="Zipcode" type="search" />
            </Box>
            
            <Button
            variant="contained"
            className="homePageButton"
            style={{
                background: 'linear-gradient(45deg, #00838f, #00695c)',
                color: 'white',
                fontWeight: 'bold',
                padding: '10px 20px',
                borderRadius: '20px',
            }}>
            Send
            </Button>


        </Container>
    );
}

export default HomePage;