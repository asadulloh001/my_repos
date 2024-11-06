import express from 'express'
import { config } from 'dotenv';
import { connectDB } from './src/config.js';
import authRouter from './src/routes/author.routes.js';
import catRouter from './src/routes/collection.routes.js';

config()

const app = express()
app.use(express.json())

app.use('/api/v1/author', authRouter)
app.use('/api/v1/category', catRouter)


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB()
})