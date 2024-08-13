import React from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, Box } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const SignUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center">
          Sign Up
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12} container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Google />}
                  onClick={() => {
                    // Handle Google sign-up here
                    console.log('Sign up with Google');
                  }}
                >
                  Sign Up with Google
                </Button>
              </Grid>
              {/* Add more social buttons here */}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
