import 'dotenv/config'
import moment from 'moment'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGIND_SENDER_ID,
  appId: process.env.APP_ID,
  databaseURL: process.env.DB_URL,
};

const initializeFirebase = initializeApp(firebaseConfig)
const db = getDatabase(initializeFirebase);
const refDb = ref(db, 'weather')

export function addCurrentWeather(humidity, temperature){
  moment.locale('pt-br')
  const currentDate = moment().format('L');
  const currentHour = moment().format('LTS');

  return new Promise((resolve, reject) => {
    const newWeatherRef = push(refDb)
    set(newWeatherRef, {
        date: currentDate,
        hour: currentHour,
        humidity: humidity,
        temperature: temperature
    })
    resolve(newWeatherRef)
  }, (error) => {
    reject(error)
  })
}

export async function listWeather(){
    return new Promise((resolve, reject) => {
        onValue(refDb, (snapshot) => {
            const weather = snapshot.val();
            resolve(weather);
        }, (error) => {
            reject(error)
        })
    })
  
}