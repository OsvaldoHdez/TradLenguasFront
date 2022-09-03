import React, { useState } from 'react';
import { TextField, ImageListItem, ImageList, Box, CssBaseline, Button, Grid, Input, Paper, Typography, Container, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ClearIcon from '@mui/icons-material/Clear';
import ImageIcon from '@mui/icons-material/Image';
import TextFormatIcon from '@mui/icons-material/TextFormat';
// translation
import i18n from '../../i18in'

const ImageRecog = () => {

    let [imagesPrv, setImagePrev] = useState('');
    let [resulTrad, setResulTrad] = useState('');
    let [resultSplit, setResultSplit] = useState('');
    let [arregloprueba, setArregloPrueba] = useState([]);
    let [imagenTest, setImagenTest] = useState([]);
    const [disableDes, setDisableDes] = useState(true);
    const [disableRes, setDisableRes] = useState(true);
    let modelURL = '/model-asl/'

    const loadFile = (event) => {
        const image = document.getElementById("image");
        image.src = URL.createObjectURL(event.target.files[0])
    }

    const classifyImg = (e) => {
        const classifier = window.ml5.imageClassifier(modelURL + 'model.json', modelLoaded);
        function modelLoaded() {
          console.log('Model Loaded!');
        }   
        classifier.classify(document.getElementById("image"), 
              function (err, results) {
                    console.log(results[0]);
                    setImagePrev( imagesPrv += results[0].label)
                    });
    };

    const handleChange = (event) => {
        setImagePrev(event.target.value.toUpperCase());
    };
    
    const translateText = async () => {
        setImagePrev(imagesPrv.toUpperCase())
        let data = {
            q : imagesPrv.toLowerCase(),
            source: 'en',
            target: 'es'
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setResulTrad(response.data.translatedText.toUpperCase().replace(/\./g, '').normalize('NFD').replace(/[\u0300-\u036f]/g,""))
        })
        setDisableDes(false)
    }

    const clearTextfield = () => {
        setImagePrev(imagesPrv = '')
        setResulTrad(resulTrad = '')
        setResultSplit(resultSplit = '')
        setImagenTest(imagenTest = [])
        setArregloPrueba(arregloprueba = [])
    }

    const separar = () => {
        setResultSplit(resulTrad.split(""))
        setDisableRes(false)
        setDisableDes(true)
    }
  
      const result= () => {
        for (let index = 0; index < resultSplit.length; index++) {  
          setImagenTest(imagenTest.push(resultSplit[index]))
          setArregloPrueba(imagenTest)
        }
        setDisableRes(true)
    }

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
    }));
      
    return ( 
        <Container component="main" maxWidth="lg" sx={{ width: '100%' }}>
            <CssBaseline />
            <Stack direction="row" spacing={1}>
                <Item>
                    <Typography gutterBottom>
                        <p align="center"><b>{i18n.t('instrucciones')}</b></p>
                        <p align="left">{i18n.t('uno1')}</p>
                        <p align="left">{i18n.t('dos2')}</p>
                        <p align="left">{i18n.t('tres')}</p>
                        <p align="left">{i18n.t('cuatro')}</p>
                    </Typography>
                </Item>
                <Item>
                    <Input type="file" accept="image/*" onChange={loadFile} name="image" id="file" />
                    <img src="" alt="" id="image" width="315px" height="315px" />
                </Item>
                <Paper>
                    <Stack spacing={1} sx={{mt: 7, ml: 1}}>
                        <Box sx={{ textAlign: "left" }}>
                            <Button variant="outlined" size="small" endIcon={<AddBoxIcon />} onClick={classifyImg}>
                                {i18n.t('predecir')}
                            </Button>
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                            <TextField id="standard-basic" variant="standard" value={imagesPrv} size="small" onChange={handleChange}/>
                            <Button variant="outlined" size="small" disabled={!imagesPrv} onClick={translateText} >
                                <GTranslateIcon />
                            </Button>
                            <Button variant="outlined" endIcon={<ClearIcon />} onClick={clearTextfield} >
                                {i18n.t('limpiar')}
                            </Button>
                        </Box>
                        <Box sx={{ textAlign: "left" }}>
                            <TextField id="standard-basic" variant="standard" value={resulTrad} size="small"/>
                            <Button variant="outlined" size="small" disabled={disableDes} endIcon={<TextFormatIcon />} onClick={separar}>
                                {i18n.t('desplegar')}
                            </Button>
                            <TextField id="standard-basic" variant="standard" value={resultSplit} size="small" />
                            <Button variant="outlined" size="small" disabled={disableRes} endIcon={<ImageIcon />} onClick={result}>
                                {i18n.t('resultLSM')}
                            </Button>
                        </Box>
                        <ImageList sx={{ width: arregloprueba.length * 100, height: 160 }} cols={arregloprueba.length} rowHeight={140}>
                            {arregloprueba.map((item) => (
                                <ImageListItem >
                                <img
                                    src={require(`./images/LSM/${item}.png?w=164&h=164&fit=crop&auto=format`).default}
                                    srcSet={require(`./images/LSM/${item}.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x`).default}
                                    loading="lazy"
                                    alt="res"
                                />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Stack>
                </Paper>    
            </Stack>                
        </Container>
    );
} 

export default ImageRecog;