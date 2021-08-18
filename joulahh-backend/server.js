import express from 'express';
import data from './data.js';
// import path from 'path';


const app = express();

// const __dirname = path.resolve();
// app.use('/images',express.static(path.join(__dirname,'images'))); 
app.use((req, res, next) => {            
    res.setHeader('Access-Control-Allow-Origin','*'); 
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');  
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization'); 
    next();
 })   

 

app.get('/api/products/:id', (req, res) => {
    console.log('id tooye server :>> ', req.params.id);
    const product = data.products.find(product => product._id === req.params.id);
    console.log('product :>> ', product);
    if(product){
        res.status(201).json(product);
    }
    else{
        res.status(404).send({message:'Product Not Found!'});
    }
})
app.get('/', (req, res) => {
    res.send(data.products);
    console.log('data.products',data.products)
    console.log('miw"e /')
})
// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// })







let port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('server started')
});