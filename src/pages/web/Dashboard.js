import { StyledTitle, StyledFormArea, colors, ExtraText } from "../../components/Styles";

// Material UI
import { Container, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// auth
import { connect } from "react-redux";

// translation
import i18n from '../../i18in'

const Dashboard = ({ user }) => {
    return (
        <Container component="main" align="center" >
                <Box sx={{ mt: 15 }} alignItems="center" justifyContent="center">
                <CssBaseline />
                <StyledFormArea bg={colors.dark3}>
                    <StyledTitle size={55}>
                        {i18n.t('bievenido')}, {user.nombre} {user.apellido}!
                    </StyledTitle>
                    <ExtraText >{user.email}</ExtraText>
                    <ExtraText >
                        {new Date(user.birthday).toLocaleDateString()}
                    </ExtraText>
                </StyledFormArea>
                </Box>
        </Container>
        
    );
}

const mapStateToProps = ({session}) => ({
    user: session.user
})

export default connect(mapStateToProps)(Dashboard);