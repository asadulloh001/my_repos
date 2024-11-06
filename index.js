import express from 'express'
import { config } from 'dotenv';
import generalRouter from './src/routes/index.js'
import { connectDB } from './src/config.js';

config()  

const app = express()
app.use(express.json())

app.use('/api/v1', generalRouter)
 
const port = process.env.PORT
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
    connectDB()
})  