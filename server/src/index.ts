import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import * as dynamoose from 'dynamoose';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import courseRoutes from './routes/courseRoutes';

// ROUTES IMPORT

// CONFIGURATIONS

dotenv.config();

// console.log('Environment variables:', {
//     NODE_ENV: process.env.NODE_ENV,
//     PORT: process.env.PORT,
//     isProduction: process.env.NODE_ENV === 'production'
//   });


const isProduction = process.env.NODE_ENV === 'production';
if(!isProduction){
    dynamoose.aws.ddb.local();
}

const app =  express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// ROUTES

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/courses',courseRoutes)

// SERVER

const port = process.env.PORT || 3000;

if(!isProduction){
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}