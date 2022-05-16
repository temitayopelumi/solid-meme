require('dotenv').config();
require('express-async-errors');
const inventoryRouter = require('./routes/inventory')


const express = require('express');
const app = express()



const NotFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.use('/api/v1/items', inventoryRouter)
app.get('/check', (req, res) => {
    res.status(200).json({message:"working"});
});



app.use(NotFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () =>{
    try {
        app.listen(3000, ()=>
        console.log('server is up'))
    } 
    catch (error) {
        console.log(error)
    }
};

start();