import React  from "react";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// auth y redux
import { connect } from 'react-redux';
import { loginUser } from '../../auth/actions/userActions';
import { useHistory, useParams } from 'react-router-dom';
import { Link as Link2 } from "react-router-dom";

// Material UI
import { Checkbox, FormControlLabel, Grid, Link, Container, Button, Box, CircularProgress, Avatar, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

//import { TextField } from "@mui/material";
import { TextInput } from '../../components/FormLib';

// translation
import i18n from '../../i18in'

const Login = ({loginUser}) => {
    
    const history = useHistory();
    const { userEmail } = useParams();
    
    return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {i18n.t('sesion')}
            </Typography>
            <Formik
                initialValues={{
                    email: userEmail,
                    password: "",
                }}
                validationSchema={
                    Yup.object({
                        email: Yup.string()
                            .email(i18n.t('correoinv'))
                            .required(i18n.t('campor')),
                        password: Yup.string()
                            .min(8, i18n.t('contracor'))
                            .max(30, i18n.t('contralar'))
                            .required(i18n.t('campor')),
                    })
                }
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                    loginUser(values, history, setFieldError, setSubmitting);
                }}
            >
                {({ isSubmitting }) => (
                <Form>
                    <TextInput
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={i18n.t('correo')}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <TextInput
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={i18n.t('contra')}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label={i18n.t('recuerdame')}
                    />
                    <Box>
                    {!isSubmitting &&<Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    {i18n.t('sesion')}
                    </Button>}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {isSubmitting && (
                        <CircularProgress />
                        )}
                    </div>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Link component={Link2} to="/forgottenpassword" variant="body2">
                                    {i18n.t('olvidaste')}
                                </Link>
                            </Grid> 
                            <Grid item>
                                <Link component={Link2} to="/signup" variant="body2">
                                    {i18n.t('notienescuenta')}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
                )}
            </Formik>
        </Box>
    </Container>
  )
}


export default connect(null, {loginUser})(Login);