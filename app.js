const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const product = require('./models/product_db');


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

mongoose
    .connect('mongodb+srv://gouse:gouse@dbase.b6dv0ru.mongodb.net/?retryWrites=true&w=majority')
    .then(function() {
        console.log('db connected');
    })
    .catch(function(error) {
        console.log(error);
    });

//INDEX
app.get('/products', async function(req, res){
 try {
    const allProducts = await product.find({});
    res.render('index',{allProducts});
 } catch (error) {
    console.log("problem while fetching products");
    
 }
});

//NEW

app.get('/products/new',function(req, res){
    res.render('new');
});

//CREATE

app.post('/products', async function(req, res){
    try {
        const newProduct =  product({
            name: req.body.name,
            price: req.body.price,
            seller: req.body.seller,
            instock: req.body.instock,
        });
        await newProduct.save();
        res.send('product insert successfully')
    } catch (error) {
        console.log('error')
    }

});

//SHOW

app.get('/products/:id', async function(req, res){
     const id = req.params.id;
    //const id2 = req.params.id2;
    const foundproducts = await Product.findById(id);
    //const foundproducts2 = await product.findById(id2);
    res.render('show',{foundproducts});
});

//EDIT

app.get('/products/:id/edit',function(req, res){
    const id = req.params.id;
    res.render('edit',{id});
});

//UPDATE

app.patch('/products/:id', async function(req, res) {
	const product = {
		name: req.body.name,
		price: req.body.price,
		seller: req.body.seller,
		inStock: req.body.inStock
	};
	await Product.findByIdAndUpdate(req.params.id, Product);
	res.send('product successfully updated');
    
});

//DELETE

app.delete('/products/:id', async function(req, res){
    await Product.findByIdAndDelete(req.params.id);
    res.send("product successfully deleted");
});
app.listen(8081, function() {
    console.log('server running on port 8080');
});
