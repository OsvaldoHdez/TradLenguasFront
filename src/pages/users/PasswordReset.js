// Formik
import { Formik, Form } from 'formik';
import { TextInput } from '../../components/FormLib';
import * as Yup from 'yup';

// MaterialUI
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Button, Box, CircularProgress, Avatar, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

// auth y redux
import { connect } from 'react-redux';
import { resetPassword } from '../../auth/actions/userActions';
import { useHistory, useParams } from 'react-router-dom';

// translation
import i18n from '../../i18in'

const PassowordReset = ({resetPassword}) => {
    const history = useHistory();
    const { userId, resetString } = useParams();

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
                <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {i18n.t('restablecer')}
            </Typography>
                <Formik
                    initialValues={{
                        newPassword: "",
                        confirmNewPassword: "",
                        userId,
                        resetString
                    }}
                    validationSchema={
                        Yup.object({
                            newPassword: Yup.string()
                            .min(8, i18n.t('contracor'))
                            .max(30, i18n.t('contralar'))
                            .required(i18n.t('campor')),
                            confirmNewPassword: Yup.string().required(i18n.t('campor')).oneOf([Yup.ref("newPassword")], i18n.t('contrano'))
                        })
                    }
                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                        resetPassword(values, history, setFieldError, setSubmitting);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            
                            <TextInput
                                margin="normal"
                                required
                                fullWidth
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                label={i18n.t('newcontra')}
                                autoComplete="new-password"
                                autoFocus
                            />

                            <TextInput
                                margin="normal"
                                required
                                fullWidth
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                type="password"
                                label={i18n.t('newcontracon')}
                                autoComplete="confirm-newpassword"
                            />

                            <Box>
                                {!isSubmitting &&<Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}>
                                        {i18n.t('resta')}
                                </Button>}
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

export default connect(null, {resetPassword})(PassowordReset);