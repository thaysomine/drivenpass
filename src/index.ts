import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'dotenv/config';
import dotenv from 'dotenv';

import client from './database/index.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);

// TODO: this is a temporary solution to get the app to work
async function main() {
    await client.$connect();
    console.log('Connected to the database');
}
main(); 

app.listen(+process.env.PORT || 5000, () => console.log(`Server started at port ${process.env.PORT}`));