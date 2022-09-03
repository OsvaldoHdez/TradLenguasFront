import { Box, Container } from "@mui/material";
import { StyledTitle, StyledSubTitle } from '../../components/Styles';
import CssBaseline from '@mui/material/CssBaseline';

// translation
import i18n from '../../i18in'

const Acercade = () => {
    return (
        <Container component="main">
            <Box sx={{ mt: 11 }}>
                <CssBaseline />
                <StyledTitle size={55}>
                    {i18n.t('acercade')}
                </StyledTitle>
                <StyledSubTitle size={27}>
                    {i18n.t('tec')}
                </StyledSubTitle> 
                <StyledSubTitle size={20}>
                    {i18n.t('descrabout')}
                </StyledSubTitle> 
                <br></br>
                <StyledSubTitle size={18}><b>{i18n.t('personas')}</b>
                </StyledSubTitle>
                <Box sx={{marginLeft: 4}}>
                <StyledSubTitle size={16}>
                    <ul>
                        <li>Osvaldo Hernandez</li>
                        <li>Jesus Salazar</li>
                    </ul>    
                </StyledSubTitle>
                </Box>
            </Box>   
        </Container> 
    );
}

export default Acercade;