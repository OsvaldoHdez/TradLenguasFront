import React, { useState, useEffect } from 'react';
import { TextField, ImageListItem, ImageList, Box, CssBaseline, Button, Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Signimage } from "./images/LSM"
import { SignimageKey } from "./images/LSM/keyboard"
import axios from 'axios';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ClearIcon from '@mui/icons-material/Clear';
import ImageIcon from '@mui/icons-material/Image';
import TextFormatIcon from '@mui/icons-material/TextFormat';
// translation
import i18n from '../../i18in'

const TraductorLSM = () => {

    let [imagesPrv, setImagePrev] = useState('');
    let [resulTrad, setResulTrad] = useState('');
    let [resultSplit, setResultSplit] = useState('');
    let [arregloprueba, setArregloPrueba] = useState([]);
    let [imagenTest, setImagenTest] = useState([]);
    const [disableDes, setDisableDes] = useState(true);
    const [disableRes, setDisableRes] = useState(true);
    let modelURL = '/model-lsm/'
    const classifyImg = (e) => {
      
      const classifier = window.ml5.imageClassifier(modelURL + 'model.json', modelLoaded);
      function modelLoaded() {
        console.log('Model Loaded!');
      }   
        let image = document.createElement('img'); 
        
        image.src = SignimageKey[e]
        
        classifier.classify(image, 
            function (err, results) {
                  console.log(results[0]);
                  setImagePrev( imagesPrv += results[0].label)
                  });
    };
    
    
    const itemData = [
        {
          img: Signimage['Q'],
          title: 'Q',
        },
        {
          img: Signimage['W'],
          title: 'W',
        },
        {
          img: Signimage['E'],
          title: 'E',
        },
        {
          img: Signimage['R'],
          title: 'R',
        },
        {
          img: Signimage['T'],
          title: 'T',
        },
        {
          img: Signimage['Y'],
          title: 'Y',
        },
        {
          img: Signimage['U'],
          title: 'U',
        },
        {
          img: Signimage['I'],
          title: 'I',
        },
        {
          img: Signimage['O'],
          title: 'O',
        },
        {
          img: Signimage['P'],
          title: 'P',
        },
      ];

      const itemData1 = [
        {
          img: Signimage['A'],
          title: 'A',
        },
        {
          img: Signimage['S'],
          title: 'S',
        },
        {
          img: Signimage['D'],
          title: 'D',
        },
        {
          img: Signimage['F'],
          title: 'F',
        },
        {
          img: Signimage['G'],
          title: 'G',
        },
        {
          img: Signimage['H'],
          title: 'H',
        },
        {
          img: Signimage['J'],
          title: 'J',
        },
        {
          img: Signimage['K'],
          title: 'K',
        },
        {
          img: Signimage['L'],
          title: 'L',
        },
        {
          img: Signimage['Ñ'],
          title: 'Ñ',
        },
      ];

      const itemData2 = [
        {
          img: Signimage['Z'],
          title: 'Z',
        },
        {
          img: Signimage['X'],
          title: 'X',
        },
        {
          img: Signimage['C'],
          title: 'C',
        },
        {
          img: Signimage['V'],
          title: 'V',
        },
        {
          img: Signimage['B'],
          title: 'B',
        },
        {
          img: Signimage['N'],
          title: 'N',
        },
        {
          img: Signimage['M'],
          title: 'M',
        },
      ];

      const handleChange = (event) => {
        setImagePrev(event.target.value.toUpperCase());
      };

      const translateText = async () => {
        setImagePrev(imagesPrv.toUpperCase())
        let data = {
            q : imagesPrv.toLowerCase(),
            source: 'es',
            target: 'en'
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setResulTrad(response.data.translatedText.toUpperCase().replace(/\./g, ''))
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
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fdfdfd',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      
    return (
        <Box sx={{ marginLeft: 0 }}>   
          <CssBaseline />
            <Box>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  <ImageList sx={{ width: 1200, height: 160 }} cols={10} rowHeight={140}>
                      {itemData.map((item,) => (
                      <ImageListItem key={item.img}>
                          <img
                              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt={item.title}
                              id={item.title}
                              loading="lazy"
                              onClick={(e) => classifyImg(item.title, e)}
                          />
                      </ImageListItem>
                      ))}
                  </ImageList>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  <ImageList sx={{ width: 1200, height: 160 }} cols={10} rowHeight={140}>
                      {itemData1.map((item) => (
                      <ImageListItem key={item.img}>
                          <img
                              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt={item.title}
                              id={item.title}
                              loading="lazy"
                              onClick={(e) => classifyImg(item.title, e)}
                          />
                      </ImageListItem>
                      ))}
                  </ImageList>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'center', marginLeft: 20}}>
                  <ImageList sx={{ width: 800, height: 155 }} cols={7} rowHeight={140}>
                      {itemData2.map((item) => (
                      <ImageListItem key={item.img}>
                          <img
                              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt={item.title}
                              id={item.title}
                              loading="lazy"
                              onClick={(e) => classifyImg(item.title, e)}
                          />
                      </ImageListItem>
                      ))}
                  </ImageList>
              </Box> 
            </Box>
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'left',}}>
              <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <TextField id="standard-basic" variant="standard" value={imagesPrv} size="small" onChange={handleChange}/>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" size="small" disabled={!imagesPrv} onClick={translateText} >
                        <GTranslateIcon />
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" endIcon={<ClearIcon />} onClick={clearTextfield} >
                        {i18n.t('limpiar')}
                      </Button>
                  </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField id="standard-basic" variant="standard" value={resulTrad} size="small"/>
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="small" disabled={disableDes} endIcon={<TextFormatIcon />} onClick={separar}>
                    {i18n.t('desplegar')}
                  </Button>
                </Grid>
              </Grid> 
              <Grid container spacing={2}>
                <Grid item>
                  <TextField id="standard-basic" variant="standard" value={resultSplit} size="small" />
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="small" disabled={disableRes} endIcon={<ImageIcon />} onClick={result}>
                    {i18n.t('resultASL')}
                  </Button>  
                </Grid>
              </Grid> 
            </Grid>
            <Grid item>
              <Box sx={{display: 'flex', justifyContent: 'right'}}>
                <ImageList sx={{ width: arregloprueba.length * 100, height: 160 }} cols={arregloprueba.length} rowHeight={140}>
                  {arregloprueba.map((item) => (
                    <ImageListItem >
                      <img
                        src={require(`./images/ASL/${item}.jpg?w=164&h=164&fit=crop&auto=format`).default}
                        srcSet={require(`./images/ASL/${item}.jpg?w=164&h=164&fit=crop&auto=format&dpr=2 2x`).default}
                        loading="lazy"
                        alt="res"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid sx={{ display: 'flex', justifyContent: "left", marginTop: -46, marginLeft: -21}}>
            <Item>
              <Typography gutterBottom component="div">
                <p align="center"><b>{i18n.t('instrucciones')}</b></p>
                <p align="left">{i18n.t('uno')}</p>
                <p align="left">{i18n.t('dos')}</p>
                <p align="left">{i18n.t('tres')}</p>
                <p align="left">{i18n.t('cuatro')}</p>
              </Typography>
              </Item>
        </Grid>
    </Box> 
    
    );
} 

export default TraductorLSM;