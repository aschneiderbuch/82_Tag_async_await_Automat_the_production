// ! import
import './config.js'               // dotenv da rein
import fs from 'fs'                 // aufs File System zugreifen
import { constants } from 'fs'   // für fs.access prüfen ob Datei existiert


// ! Variablen
const DB_PATH = process.env.DB_PATH     // *  || './db_Daten.json'


// ! loadFile        mit       readFile
export const loadFile = () => {
    // Promise für fetch  resolve => resolve(data)   reject => reject(err)
    return new Promise( (resolve, reject) => {
        // liest Datei ein
        fs.readFile(DB_PATH, (err, data) => {
            if (err) reject(err)
            else {
                resolve(JSON.parse(data.toString()))
            }
        })
    })
}




// ! saveFile        mit       writeFile
export const saveFile = (data) => {
    // Promise für fetch  resolve => resolve(data)  reject => reject(err)
    return new Promise( (resolve, reject) => {
        // schreiben       null + 2  = Zeilenumbruch
        fs.writeFile( DB_PATH, JSON.stringify(data,null,2), (err) => {
            if (err) reject(err)
            else {
                resolve("Daten wurden gespeichert")
            }
        })
    })
}