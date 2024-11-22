import express from 'express'
import cors from 'cors'
import { addCurrentWeather, listWeather} from './firebase/index.js'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3004
app.use(express.urlencoded({ extended: true }))
app.use(cors());

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
        res.status(201).json({ message: 'Temperatura atual do sensor foi sincronizada!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Não é possível sincronizar a temperatura atual do sensor.' });
    }
})

app.listen(PORT)