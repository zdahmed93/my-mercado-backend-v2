const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { itemValidator } = require('./utilities/validators');

let itemsForSale = [
    {
        _id: '5fcc1422e17929040331de0e',
        title: 'Camera Pro',
        description: 'Canon 5D Mark IV',
        photo: 'https://devmastery-assets.vercel.app/marketplace/camera-pro.png',
        price: 290,
        user: '5e74cd8c7e03d41011b9331a' // This is a user id
    },
    {
      _id: '5e748a4b4c903807294d5aae',
      title: 'T-shirt',
      description: 'A dark blue T-shirt. Its size is Large (L)',
      photo: 'https://devmastery-assets.vercel.app/marketplace/t-shirt.jpeg',
      price: 20,
      user: '5e74cdf77e03d41011b9331b'
    },
    {
        _id: '507f1f77bcf86cd799439011',
        title: 'iPhone',
        description: 'An iPhone 7 Plus Silver',
        photo: 'https://devmastery-assets.vercel.app/marketplace/iphone7.jpeg',
        price: 350,
        user: '5e74cd8c7e03d41011b9331a'
    }
];

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Mercado Marketplace API v1" })
})

app.get('/items', (req, res) => {
    res.json(itemsForSale)
})

app.get('/items/:id', (req, res) => {
    const item = itemsForSale.find(i => i._id === req.params.id)
    if (item) {
        res.json(item)
    } else {
        res.status(404).json({error: "Item not found"})
    }
})

app.post('/items', (req, res) => {
    const validationResult = itemValidator.validate(req.body)
    if (validationResult.error) {
        res.json(validationResult)
    } else {
        const newItem = {
            _id: Date.now().toString(),
            ...req.body
        }
        itemsForSale.push(newItem)
        res.json({message: "Item created successfully"})
    }
})

app.put('/items/:id', (req, res) => {
    const itemToUpdateId = req.params.id
    const validationResult = itemValidator.validate(req.body, { abortEarly: false })
    if (validationResult.error) {
        res.json(validationResult)
    } else {
        let itemFound = false
        itemsForSale = itemsForSale.map(item => {
            if (item._id === itemToUpdateId) {
                itemFound = true
                return {
                    _id: item._id,
                    ...req.body
                }
            } else {
                return item
            }
        })
        if (itemFound) {
            res.json({message: "Item updated successfully"})
        } else {
            res.status(404).json({error: "Item not found"})
        }
    }
})

app.delete('/items/:id', (req, res) => {
    const itemToDeleteId = req.params.id
    const itemToDelete = itemsForSale.find(item => item._id === itemToDeleteId)
    if (!itemToDelete) {
        res.status(404).json({error: "Item not found"})
    } else {
        itemsForSale = itemsForSale.filter(item => item._id !== itemToDeleteId)
        res.json({message: "Item deleted successfully"})
    }
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Successfully connected to MongoDB');
            app.listen(PORT, () => {
                console.log(`Server is listening on port ${PORT}`);
            });
        })
        .catch(error => {
            console.log(error);
        })
