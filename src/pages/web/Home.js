import * as React from 'react';
import { Link as Link2 } from "react-router-dom";

//mui
import { Paper, Container, Link, Box, Typography, Grid, Tooltip, Button, CardActions, CardContent, CardMedia, CssBaseline, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';

//img
import Mx from "../../assets/mx.svg"
import Us from "../../assets/us.svg"

//images
import LSM from "./images/LSM.png"
import ASL from "./images/ASL.png"
import WFD from "./images/WFD.png"

// translation
import i18n from '../../i18in'

const cards = [
    {
      img: LSM,
      title: i18n.t('lsm'),
      body: i18n.t('aboutlsm'),
      link: 'https://mexicana.cultura.gob.mx/es/repositorio/x2abesp3qm-4',
    },
    {
      img: ASL,
      title: i18n.t('asl'),
      body: i18n.t('aboutasl'),
      link: 'https://www.nidcd.nih.gov/health/american-sign-language',
    },
    {
      img: WFD,
      title: i18n.t('fed'),
      body: i18n.t('aboutfed'),
      link: 'https://wfdeaf.org/',
    },
  ];

export default function Home() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fdfdfd',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  return (
    <Box>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            marginTop: 6,
            marginRight: 10,
          }}
        >
        <Container maxWidth="sm">
                <Typography
                component="h2"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
                >
                  {i18n.t('bienvenida')}
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    {i18n.t('explora')}
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button component={Link2} to="/lenguas" variant="contained">{i18n.t('empezar')}</Button>
                    <Button component={Link2} to="/acercade" variant="outlined">{i18n.t('acercade1')}</Button>
                </Stack>
            </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4} sx={{marginTop: -20, marginLeft: -8}}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={card.img}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.body}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={card.link} target="_blank"><Button size="small">{i18n.t('saber')}</Button></Link>
                  </CardActions>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
        <Tooltip title="" sx={{ position: "fixed", bottom: 20, right: { xs: "calc(50% - 25px)", md: -130 },}}> 
            <Grid container spacing={2}>
                <Item>
                    <Typography variant="subtitle1"><b>{i18n.t('cambiaridio')}</b></Typography>
                    <Link href="/es" underline="none" color="inherit">
                        <Typography variant="subtitle1"  gutterBottom>
                            <img src={Mx} alt="EsMx" width="30px" height="30px" align="left"/>
                            Español 
                        </Typography>
                    </Link>
                    <Link href="/en" underline="none" color="inherit">
                        <Typography variant="subtitle1" gutterBottom>
                            <img src={Us} alt="EnUs" width="30px" height="30px" align="left"/>
                            English
                        </Typography>
                    </Link>      
                </Item>
            </Grid>
        </Tooltip>
    </Box>
  );
}