import { StyledTitle, ExtraText, StyledFormArea, colors } from "../../components/Styles";

// Material UI
import { Container, Button, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// react-router-dom
import { useParams, Link } from "react-router-dom";

// translation
import i18n from '../../i18in'

const EmailSent = () => {
    const { userEmail, reset } = useParams();
    return (
       
            <Container component="main" align="center" >
                <Box sx={{ mt: 15 }} alignItems="center" justifyContent="center">
            <CssBaseline />
            <StyledFormArea bg={colors.dark3}>
            { reset && userEmail && (
                <div align="center">
                        <StyledTitle size={55}>
                            {i18n.t('res')}
                        </StyledTitle>
                        <ExtraText>{i18n.t('enviadores')} <b>{userEmail}</b></ExtraText>
                        <ExtraText>
                            {i18n.t('compruebares')}
                        </ExtraText>
                </div>         
            )}

            { !reset && userEmail && (
                <div align="center">
                    <StyledTitle size={55}>
                        {i18n.t('confirma')}
                    </StyledTitle>
                    <ExtraText>{i18n.t('enviadocon')} <b>{userEmail}</b></ExtraText>
                    <ExtraText>
                        {i18n.t('compruebacon')}
                    </ExtraText>
                    <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    component={Link} 
                    to="/login"
                    >
                       {i18n.t('sesion')}
                    </Button>
                </div>
            )}

            { !reset && !userEmail && (
                <div align="center">
                    <StyledTitle size={55}>
                        {i18n.t('res')}
                    </StyledTitle>
                    <ExtraText >{i18n.t('confexito')}</ExtraText>
                    <ExtraText>
                        {i18n.t('yapuedes')}
                    </ExtraText>
                    <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    component={Link} 
                    to="/login"
                    >
                        {i18n.t('sesion')}
                    </Button>
                </div>
            )}
            </StyledFormArea>
        </Box>
    </Container>
    );
}

export default EmailSent;