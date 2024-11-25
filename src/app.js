import express from 'express'
import cors from 'cors'
import { addCurrentWeather, listWeather} from './firebase/index.js'
import setupWebSocketServer from './app-ws.js';
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3004
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

app.get('/', (req, res) => { 
  res.send("Bem-vindo à API de Temperaturas")
})

app.get('/listWeather', async (req, res) => {
  try {
    const weatherData = await listWeather();
    res.json(weatherData); 
  } catch (error) {
    console.error(error);
    res.status(404).send('Não é possível listar as temperaturas');
  }
});

app.post('/addWeather', async (req, res) => {
  try {
        const { humidity, temperature } = req.body;
        if (!humidity || !temperature) {
            return res.status(500).json({ message: 'Todos os campos devem ser preenchidos' });  
        }
        await addCurrentWeather(humidity, temperature);
        const message = JSON.stringify({ event: 'update', data: { humidity, temperature } });
        wss.broadcast(message);
        res.status(201).json({ message: 'Temperatura atual do sensor foi sincronizada!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Não é possível sincronizar a temperatura atual do sensor.' });
    }
})

const server = app.listen(PORT)
const wss = setupWebSocketServer(server);