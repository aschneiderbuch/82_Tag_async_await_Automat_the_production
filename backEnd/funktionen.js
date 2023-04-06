// ! import
import './config.js'               // dotenv da rein
import fs from 'fs'                 // aufs File System zugreifen
import { constants } from 'fs'   // für fs.access prüfen ob Datei existiert
// import fs from "fs/promises";         // anstatt fs.promises.readFile    wichtig für   async await   damit Promis anstatt Callback zurückgegeben wird

// ! Variablen
const DB_PATH = process.env.DB_PATH     // *  || './db_Daten.json'


// ! loadFile        mit       readFile        Promise selber bauen
export const loadFile_ = () => {
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

loadFile_() //?

// ! loadFile        mit       readFile        Promise wird automatisch zurückgegeben mit     async await
// ! async
export const loadFile = async () => {
    // try zum abfangen von Fehlern us     // ! try
    try {
        // prüfen ob Datei existiert  // ! await
        const data = await fs.promises.readFile(DB_PATH)
        return JSON.parse(data.toString())
    } catch (err) {
        throw err
    } finally {
        console.log("loadFile Async wurde ausgeführt")
    }
    }

    loadFile() //?

// ! saveFile        mit       writeFile
export const saveFile_ = (data) => {
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



// ! saveFile        mit       writeFile     Promise wird automatisch zurückgegeben mit   async await
// ! async
export const saveFile = async (dataInput) =>{
    // try zum abfangen der Promises wie Ergebnis und Error      // ! try
    try{
        // schreiben       null + 2  = Zeilenumbruch
        // await macht aus Promise ein Ergebnis    und speichert es in   const   data     // ! await
       const data = await fs.promises.writeFile(DB_PATH,JSON.stringify(dataInput,null,2))
         return "Daten wurden gespeichert"
        // err abfangen
    }catch (err){
        // err weitergeben - ausgeben
        console.log(err)
        throw err
    }finally{
        console.log("saveFile Async wurde ausgeführt")
    }
}

