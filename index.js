const express = require('express');
const bodyparser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const product_controller = require('./product_controller');

const app = express();

app.use(bodyparser.json());

massive(process.env.CONNECTION_STRING).then(dbInstance=>{
    app.set('db', dbInstance)
}).catch(err=>console.log(err));

app.post('/api/products', product_controller.create);
app.get('/api/products', product_controller.getAll);
app.get('/api/products/:id', product_controller.getOne);
app.put('/api/products/:id', product_controller.update);
app.delete('/api/products/:id', product_controller.delete)

const port = process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Server listening on port ${port}`);});