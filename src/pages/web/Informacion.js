import { Typography, Box, Link, Grid } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import mx from './images/mx.png'

// translation
import i18n from '../../i18in'


const Informacion = () => {
    return (
        <Box sx={{ mt: 12 }}>
            <CssBaseline />
            <Typography variant="h3" gutterBottom component="div" align="center" >
                {i18n.t('ls1')}
            </Typography>
            <Typography variant="h5" gutterBottom component="div" align="left">
                {i18n.t('infosub')}
            </Typography>
            <Typography variant="body1" gutterBottom component="div" align="justify" sx={{ marginTop: 2}}>
                {i18n.t('infocuerpo')}
            </Typography>
            <Grid sx={{display: 'flex', justifyContent: 'center'}}>
                <img src={mx} alt="mx" width="421" height="253"/>
            </Grid>
            <Typography variant="body2" gutterBottom component="div" align="center" sx={{ marginTop: 7}}>
                {i18n.t('infofin')} <Link href="https://www.gob.mx/conadis/articulos/lengua-de-senas-mexicana-lsm?idiom=es" target="_blank">{i18n.t('infoclic')}</Link>
            </Typography>
        </Box>
    );
}

export default Informacion;