require('dotenv').config();
require('express-async-errors');
const inventoryRouter = require('./routes/inventory')
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml')


const express = require('express');
const app = express()



const NotFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('<h1>Inventory API</h1><a href="/api-docs">Documentation</a>');
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1/items', inventoryRouter)
app.get('/check', (req, res) => {
    res.status(200).json({message:"working"});
});



app.use(NotFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () =>{
    try {
        app.listen(process.env.PORT, ()=>
        console.log('server is up'))
    } 
    catch (error) {
        console.log(error)
    }
};

start();