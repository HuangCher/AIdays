import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import '../css/homePage.css';

function HomePage() {
    return (
        <Container maxWidth = 'xl' className = "homePageDiv">
            <h1>For(ward) Casting</h1>
            <p> Your place for all the most important news for natural disaster planning.
            To get started, please input your city, state, and zipcode.</p>

            {/* form */}
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {
                        m: 1,
                        width: '25ch',
                        '& .MuiInputBase-root': {
                            color: 'white', // Change text color
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white', // Change border color
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Change label color
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

            <Button variant="contained" >
                Send
            </Button>



        </Container>
    );
}

export default HomePage;