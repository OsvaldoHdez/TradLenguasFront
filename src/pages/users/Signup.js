import React  from "react";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// auth y redux
import { connect } from 'react-redux';
import { signupUser } from '../../auth/actions/userActions';
import { useHistory } from 'react-router-dom';
import { Link as Link2 } from "react-router-dom";

// MaterialUI
import { Grid, Link, Container, Button, Box, CircularProgress, Avatar, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import { TextField } from "@mui/material";
import { TextInput } from '../../components/FormLib';

// translation
import i18n from '../../i18in'

const Signup = ({signupUser}) => {
    const history = useHistory();

    return (
    <Container 
        component="main"
        maxWidth="xs" 
       >
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
                {i18n.t('registrarse')}
            </Typography>
            <Formik
                initialValues={{
                    nombre: "",
                    apellido: "",
                    birthday: "",
                    email: "",
                    password: "",
                    repeatPassword: ""
                }}
                validationSchema={
                    Yup.object({
                        nombre: Yup.string().required(i18n.t('campor')),
                        apellido: Yup.string().required(i18n.t('campor')),
                        birthday: Yup.date().required(i18n.t('campor')),
                        email: Yup.string()
                            .email(i18n.t('correoinv'))
                            .required(i18n.t('campor')),
                        password: Yup.string()
                            .min(8, i18n.t('contracor'))
                            .max(30, i18n.t('contralar'))
                            .required(i18n.t('campor')),
                        repeatPassword: Yup.string()
                        .required(i18n.t('campor'))
                        .oneOf([Yup.ref("password")], i18n.t('contrano'))
                    })
                }
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                    signupUser(values, history, setFieldError, setSubmitting)
                }}
            >
                {({ isSubmitting }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                    <TextInput
                    margin="normal"
                    required
                    fullWidth
                    id="nombre"
                    label={i18n.t('nombre')}
                    name="nombre"
                    autoComplete="nombre"
                    autoFocus
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextInput
                    margin="normal"
                    required
                    fullWidth
                    id="apellido"
                    label={i18n.t('apellido')}
                    name="apellido"
                    autoComplete="apellido"
                    />
                     </Grid>
                     <Grid item xs={12} sm={7}>
                        <TextInput
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={i18n.t('correo')}
                        name="email"
                        autoComplete="email"
                        />
                    </Grid>
                     <Grid item xs={12} sm={5}>
                        <TextInput
                        margin="normal"
                        required
                        fullWidth
                        name="birthday"
                        label={i18n.t('fechanac')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        type="date"
                        id="birthday"
                        autoComplete="birthday"
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextInput
                    margin="normal"
                    required
                    fullWidth
                    name="repeatPassword"
                    label={i18n.t('contrarep')}
                    type="password"
                    id="repeatPassword"
                    autoComplete="current-repeatPassword"
                    />
                    </Grid>
                    </Grid>
                    <Box>
                    {!isSubmitting &&<Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    {i18n.t('registrarse')}
                    </Button>}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {isSubmitting && (
                        <CircularProgress />
                        )}
                    </div>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={Link2} to="/login" variant="body2">
                                {i18n.t('yatienes')}
                            </Link>
                        </Grid>
                    </Grid>
                </Form>
                )}
            </Formik>
        </Box>
    </Container>
  )
}


export default connect(null, {signupUser})(Signup);