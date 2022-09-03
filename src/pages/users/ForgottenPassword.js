// Formik
import { Formik, Form } from 'formik';
import { TextInput } from '../../components/FormLib';
import * as Yup from 'yup';

// MaterialUI
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Button, Box, CircularProgress, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// auth y redux
import { connect } from 'react-redux';
import { forgottenPassword } from '../../auth/actions/userActions';
import { useHistory, useParams } from 'react-router-dom';

// translation
import i18n from '../../i18in'

const ForgottenPass = ({forgottenPassword}) => {
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
                {i18n.t('restablecer')}
            </Typography>
                <Formik
                    initialValues={{
                        email: userEmail,
                        redirectUrl: "http://localhost:3000/passwordreset"
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string()
                            .email(i18n.t('correoinv'))
                            .required(i18n.t('campor')),
                        })
                    }
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        forgottenPassword(values, history, setFieldError, setSubmitting);
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
                            

                            <Box>
                                {!isSubmitting &&
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        {i18n.t('enviar')}
                                    </Button>
                                }
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    {isSubmitting && (
                                        <CircularProgress />
                                    )}
                                </div>
                            </Box>
                    </Form>
                    )}
                </Formik>
                </Box>
                </Container>
    )
}

export default connect(null, {forgottenPassword})(ForgottenPass);