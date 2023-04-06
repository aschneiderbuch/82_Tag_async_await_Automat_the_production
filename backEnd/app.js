// ! import
import express from 'express';        //     "dev2": "nodemon app.js --ignore db_Daten.json"
import './config.js';                    // dotenv da rein
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import { fileTypeFromBuffer } from 'file-type';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import express_validator from 'express-validator';
import nodemailer from 'nodemailer';
// in db_Daten.json     leeres [] rein

// ! import Daten
import { loadFile, saveFile } from './funktionen.js'  // *  Funktionen für fetches 



// ! Variablen
const PORT = process.env.PORT       // * || 9998                    // * Port für Backend    
const app = express()                               // *  Express-App erstellen für Server
const PORT_FRONTEND_REACT = process.env.PORT_FRONTEND_REACT    // * || 3000         // *  Port für Frontend

const DB_PATH = process.env.DB_PATH   // *  || './db_Daten.json'

// multer für Bilder und forms

// nodemailer für Email versand

// ! Middleware
app.use(morgan('dev'))                              // * morgan für Logging
// !!!! whitelist für CORS erstellen?
const whitelist = ['http://localhost:']
app.use(cors({ origin: `${whitelist}${PORT_FRONTEND_REACT}` }))       // * cors Sicherheit für Zugriff auf Frontend
app.use(express.json())                            // *  Express-App kann JSON lesen     evtl. noch multer
// * in FrontEnd        content-type: application/json


// static Routes        zum wegspeichern von Bilder die über multer hochgeladen werden


// ! GET fetch      money
// Geld => db => Kontostand
// Limit für Kontostand ? 
app.get('/api/v1/money_', (req, res) => {
    // Daten laden
    loadFile()
        .then((data) => {
            // Kontostand ausgeben
            const kontostand = data[0].Kontostand.toString()  // [0] weil db ein Array .toString damit es als Zahl kommt
            //  res.send(kontostand)
            res.json(kontostand)
        })
        .catch(err => {
            res.status(591).json({ message: err.message })
        })
})

// ! GET fetch      money          mit async await
// Geld => db => Kontostand
// Limit für Kontostand ?    // ! async
app.get('/api/v1/money' , async (req, res) => {
    // Daten fangen bzw. Promises und Errors fangen    // ! try
    try{
        // Daten laden      // ! await
        const data = await loadFile()
        const kontostand = data[0].Kontostand.toString()  // [0] weil db ein Array .toString damit es als Zahl kommt
        //  res.send(kontostand)
        res.json(kontostand)

        // Fehler fangen
    }catch (err) {
        res.status(591).json({ message: err.message })
    }
})




// ! GET fetch      workload 
// Anzahl Human input als Auslastung => db => Auslastung
app.get('/api/v1/workload_', (req, res) => {
    // Daten laden
    loadFile()
        .then((data) => {
            // Auslastung ausgeben
            res.json(data[0].Auslastung)
        })
        .catch(err => {
            res.status(592).json({ message: err.message })
        })
})

// ! GET fetch      workload                      mit async await
// Anzahl Human input als Auslastung => db => Auslastung    // ! async
app.get('/api/v1/workload',   async   (req, res) => {
    // Daten fangen bzw. Promises und Errors fangen     // ! try 
    try{
        // Daten laden      // ! await
        const data = await loadFile()
        // Auslastung ausgeben
        res.json(data[0].Auslastung)

        // Error fangen
    }catch (err) {
        res.status(592).json( { message: err.message } )
    }
})




// ! POST fetch       human     
// Human input => db => Kontostand + Auslastung
//   Input     kann    1    5    oder   10   sein  prüfen 
app.post('/api/v1/human_', (req, res) => {
    console.log(req.body) //?
    const human = req.body.human
    let preisHuman = 0
    console.log(human) //?

    if ( human == 1 ) {
         preisHuman = 10000
    }
    else if ( human == 5 ) {
         preisHuman = 50000
    }
    else if ( human == 10 ) {
         preisHuman = 100000
    }

    // Daten laden
    loadFile()
        .then(data => {
            // Kontostand + Auslastung
            // data[0].Auslastung = `${data[0].Auslastung.toString()*1 +  dataInput.toString()*1 }`  //?
            data[0].Auslastung = Number(data[0].Auslastung) + Number(human)
            data[0].Kontostand = Number(data[0].Kontostand) + Number(preisHuman)
            console.log(data)
            // Daten speichern
            saveFile(data)//?
                .then(data => {//?
                    res.status(291).json({ message: data.message })
                })
                .catch(err => {
                    res.status(593).json({ message: err.message })
                })
        })
})

// ! POST fetch       human           async await
// Human input => db => Kontostand + Auslastung
//   Input     kann    1    5    oder   10   sein  prüfen    // ! async
app.post('/api/v1/human',     async (req, res) => {
    console.log(req.body)
    const human = req.body.human
    let preisHuman = 0
    console.log(human)

    if (human == 1) {
        preisHuman = 10000
            }
            else if (human == 5) {
                preisHuman = 50000
            }
            else if (human == 10 ){
                preisHuman = 100000
            }

            // Daten fangen bzw. Promises und Errors fangen
            try {
                // Daten laden    // ! await
                const data = await loadFile() 
                // Kontostand + Auslastung
                data[0].Auslastung = Number(data[0].Auslastung ) + Number(human)
                data[0].Kontostand = Number(data[0].Kontostand) + Number(preisHuman)
                
                // ! 2. await oder 2. te try ???
                // Daten speichern   // ! await
                const data2 = await saveFile(data)
                res.status(291).json({ message: data2.message })
                
                //  Error fangen   // ! catch
            }catch (err) {
                res.status(593).json({ message: err.message })
            }
})



// ! POST fetch       sell
// Verkauf  von allem setzt db => Kontostand = 0
// Limit für Kontostand ? 
app.post('/api/v1/sell_', (req, res) => {

    // Daten laden
    loadFile()
        .then(data => {
            // Kontostand auf 0 setzen
           // data[0].Kontostand = 0
           //  data[0].Auslastung = 0
           // ! hartes löschen und neu setzen auch mit [] drum herum
           // ! falls was bei post   fetches   falsch im body steht und die db zerstört, weil dann das [] fehlt
            data = [ {"Kontostand": 0, "Auslastung": 0} ]
            // Daten speichern
            saveFile(data)
                .then(data => {
                    res.status(292).json({ message: data.message })
                })
                .catch( err => {
                    res.status(594).json({ message: err.message })
                })
        })
})


// ! POST fetch       sell        async await
// Verkauf  von allem setzt db => Kontostand = 0
// Limit für Kontostand ?    // ! async
app.post('/api/v1/sell' , async (req, res) => {
    // Daten fangen bzw. Promises und Errors fangen    // ! try
    try{
        // Daten laden   // ! await
        let data = await loadFile()   //?
        // Kontostand auf 0 setzen
        data = [ {'Kontostand': 0, 'Auslastung': 0 }]

        // Daten speichern   // ! await
        const data2 = await saveFile(data)
        res.status(292).json({ message: data2.message })
        
        // Error fangen     // ! catch
    } catch (err) {
        res.status(594).json({ message: err.message })
    }
})


// ! Server   starten     PORT
app.listen(PORT, () => {
    console.log(`Server läuft auf auf Port: ${PORT} `)
})