import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import axios from 'axios';
import * as fp from "fingerpose";
import { Signimage } from "./images/ASL";
import { ImageList, ImageListItem, Button, Box, CssBaseline, TextField, Container, Grid, Typography, Paper, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import Handsigns from "./handsigns/ASL"
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ClearIcon from '@mui/icons-material/Clear';
import ImageIcon from '@mui/icons-material/Image';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextFormatIcon from '@mui/icons-material/TextFormat';
// translation
import i18n from '../../i18in';
import Lista from './images/ListaASL.png';

const Handrecog = () => {
    const [disableDes, setDisableDes] = useState(true);
    const [disableRes, setDisableRes] = useState(true);
    let [arregloprueba, setArregloPrueba] = useState([]);
    let [imagenTest, setImagenTest] = useState([]);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [emoji, setEmoji] = useState(null);
    let [letter, setLetter] = useState('');
    let [palabra, setPalabra] = useState('');
    let [resultText, setResultText] = useState('');
    let [resultImage, setResultImage] = useState('');

    const runHandpose = async () => {
        const net = await window.handpose.load();
        console.log("Handpose model loaded.");
        //  Loop and detect hands
        setInterval(() => {
        detect(net);
        }, 100);
    };

    const detect = async (net) => {
        // Check data is available
        if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
        ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Set canvas height and width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Make Detections
        const hand = await net.estimateHands(video);
        console.log(hand);

        if (hand.length > 0) {
            const GE = new fp.GestureEstimator([
              Handsigns.aSign,
              Handsigns.bSign,
              Handsigns.cSign,
              Handsigns.dSign,
              Handsigns.eSign,
              Handsigns.fSign,
              Handsigns.gSign,
              Handsigns.hSign,
              Handsigns.iSign,
              Handsigns.jSign,
              Handsigns.kSign,
              Handsigns.lSign,
              Handsigns.mSign,
              Handsigns.nSign,
              Handsigns.oSign,
              Handsigns.pSign,
              Handsigns.qSign,
              Handsigns.rSign,
              Handsigns.sSign,
              Handsigns.tSign,
              Handsigns.uSign,
              Handsigns.vSign,
              Handsigns.wSign,
              Handsigns.xSign,
              Handsigns.ySign,
              Handsigns.zSign,
            ]);
            const gesture = await GE.estimate(hand[0].landmarks, 4);
            if (gesture.gestures !== undefined && gesture.gestures.length > 0) {

              const confidence = gesture.gestures.map(
                (prediction) => prediction.confidence
              );
              const maxConfidence = confidence.indexOf(
                Math.max.apply(null, confidence)
              );
              setEmoji(gesture.gestures[maxConfidence].name);
              setLetter(gesture.gestures[maxConfidence].name);           
            }
          }
   
        const ctx = canvasRef.current.getContext("2d");
        drawHand(hand, ctx);
        }
    };
    
    useEffect(()=>{runHandpose()},[]);

    const SaveLetter = () => {
        if(letter === 'A'){setPalabra(palabra += 'A')}
        if(letter === 'B'){setPalabra(palabra += 'B')}
        if(letter === 'C'){setPalabra(palabra += 'C')}
        if(letter === 'D'){setPalabra(palabra += 'D')} 
        if(letter === 'E'){setPalabra(palabra += 'E')}
        if(letter === 'F'){setPalabra(palabra += 'F')}
        if(letter === 'G'){setPalabra(palabra += 'G')}
        if(letter === 'H'){setPalabra(palabra += 'H')}
        if(letter === 'I'){setPalabra(palabra += 'I')}
        if(letter === 'J'){setPalabra(palabra += 'J')}
        if(letter === 'K'){setPalabra(palabra += 'K')}
        if(letter === 'L'){setPalabra(palabra += 'L')}
        if(letter === 'M'){setPalabra(palabra += 'M')}
        if(letter === 'N'){setPalabra(palabra += 'N')}
        if(letter === 'O'){setPalabra(palabra += 'O')}
        if(letter === 'P'){setPalabra(palabra += 'P')}
        if(letter === 'Q'){setPalabra(palabra += 'Q')}
        if(letter === 'R'){setPalabra(palabra += 'R')}
        if(letter === 'S'){setPalabra(palabra += 'S')}
        if(letter === 'T'){setPalabra(palabra += 'T')}
        if(letter === 'U'){setPalabra(palabra += 'U')}
        if(letter === 'V'){setPalabra(palabra += 'V')}
        if(letter === 'W'){setPalabra(palabra += 'W')}
        if(letter === 'X'){setPalabra(palabra += 'X')}
        if(letter === 'Y'){setPalabra(palabra += 'Y')}
        if(letter === 'Z'){setPalabra(palabra += 'Z')}  
    }

    const handleChange = (event) => {
      setPalabra(event.target.value.toUpperCase());
    };

    const translateText = async () => {
      setResultText(palabra.toUpperCase())
      let data = {
          q : palabra.toLowerCase(),
          source: 'en',
          target: 'es'
      }
      axios.post(`https://libretranslate.de/translate`, data)
      .then((response) => {
          setResultText(response.data.translatedText.toUpperCase().replace(/\./g, '').normalize('NFD').replace(/[\u0300-\u036f]/g,""))
      })
      setDisableDes(false)
    }
    
    const clearTextfield = () => {
      setPalabra(palabra = '')
      setResultText(resultText = '')
      setResultImage(resultImage = '')
      setImagenTest(imagenTest = [])
      setArregloPrueba(arregloprueba = [])
    }

    const separar = () => {
      setResultImage(resultText.split(""))
      setDisableRes(false)
      setDisableDes(true)
    }

    const result= () => {
      for (let index = 0; index < resultImage.length; index++) {  
        setImagenTest(imagenTest.push(resultImage[index]))
        setArregloPrueba(imagenTest)
      }
      setDisableRes(true)
    }

    let imagenes = arregloprueba.map(item => <img src={require(`./images/LSM/${item}.png?w=164&h=164&fit=crop&auto=format`).default} alt={item} loading="lazy" />);

    const Item = styled(Paper)(({ theme }) => ({
      padding: theme.spacing(1),
      textAlign: 'center',
    }));

    return (
      <Container component="main" maxWidth="lg" sx={{ width: '100%' }}>
        <CssBaseline />
        <Stack direction="row" spacing={1}>
          <Stack spacing={2}>
            <Webcam
                ref={webcamRef}
                style={{
                  position: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: "auto",
                  right: "auto",
                  textAlign: "center",
                  zindex: 9,
                  width: 640,
                  height: 480,
                }}
              />

              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: "auto",
                  right: "auto",
                  textAlign: "center",
                  zindex: 9,
                  width: 640,
                  height: 480,
                }}
              />
              {/* NEW STUFF */}
              {emoji !== null ? (
                <img
                  alt="sign images"
                  src={Signimage[emoji]}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: "auto",
                    bottom: "auto",
                    right: "auto",
                    textAlign: "center",
                    height: 100,
                  }}
                />
              ) : (
                ""
              )}
            <Item>
              <Typography variant="h6" gutterBottom  sx={{ justifyContent: 'center' }}>
                {i18n.t('lista')}
              </Typography>
              <img
                src={Lista}
                alt="img"
                width="600" height="120"
              />
            </Item>
          </Stack>
          <Stack spacing={2}>
            <Item>
              <Typography gutterBottom>
                <p align="center"><b>{i18n.t('instrucciones')}</b></p>
                <p align="left">{i18n.t('uno11')}</p>
                <p align="left">{i18n.t('dos')}</p>
                <p align="left">{i18n.t('tres')}</p>
                <p align="left">{i18n.t('cuatro')}</p>
              </Typography>
            </Item>
            <Paper> 
              <Container component="main" maxWidth="sm" sx={{ mt: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" size="small" endIcon={<AddBoxIcon />} onClick={SaveLetter} >
                    {i18n.t('guardarletra')}
                  </Button>
                  <Button variant="outlined" endIcon={<ClearIcon />} onClick={clearTextfield} >
                    {i18n.t('limpiar')}
                  </Button>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <TextField id="standard-basic" variant="standard" value={palabra} onChange={handleChange} size="small"/>
                  <Button variant="outlined" size="small" disabled={!palabra} onClick={translateText} >
                    <GTranslateIcon />
                  </Button>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <TextField id="standard-basic" variant="standard" value={resultText} size="small"/>
                  <Button variant="outlined" disabled={disableDes} endIcon={<TextFormatIcon />} size="small" onClick={separar}>
                    {i18n.t('desplegar')}
                  </Button>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <TextField id="standard-basic" variant="standard" value={resultImage} size="small"/>
                  <Button variant="outlined" size="small" disabled={disableRes} endIcon={<ImageIcon />} onClick={result}>
                    {i18n.t('resultLSM')}
                  </Button>
                </Stack>
                <Box sx={{ mt: 1 }}>
                  <ImageList sx={{ width: 300, height: 800 }} cols={3} rowHeight={100}>
                    <ImageListItem>
                      {imagenes}
                    </ImageListItem>
                  </ImageList>
                </Box>
              </Container>
            </Paper>
          </Stack>
        </Stack>
      </Container>   
    );
}

export default Handrecog;