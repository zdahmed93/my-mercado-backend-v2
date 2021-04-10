const express = require('express');
const mongoose = require('mongoose');

const { itemValidator } = require('./utilities/validators');
const Item = require('./models/Item');

require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Mercado Marketplace API v1" })
})

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        if (item) {
            res.status(200).json(item)
        } else {
            res.status(404).json({ error: "Item not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.post('/items', async (req, res) => {
    try {
        const validationResult = itemValidator.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            res.status(400).json(validationResult)
        } else {
            const item = new Item({
                title: req.body.title,
                description: req.body.description,
                photo: req.body.photo,
                price: req.body.price
            })
            await item.save()
            res.status(201).json({message: "Item created successfully"})
        }    
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.put('/items/:id', async (req, res) => {
    try {
        const itemToUpdateId = req.params.id
        const validationResult = itemValidator.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            res.json(validationResult)
        } else {
            const item = await Item.findByIdAndUpdate(itemToUpdateId, req.body)
            if (!item) {
                res.status(404).json({error: "Item not found"})
            } else {
                res.status(200).json({message: "Item updated successfully"})
            }
        }     
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.delete('/items/:id', async (req, res) => {
    try {
        const itemToDeleteId = req.params.id
        const result = await Item.deleteOne({ _id: itemToDeleteId })
        if (result.deletedCount === 1) {
            res.json({message: "Item deleted successfully"})
        } else {
            res.status(404).json({error: "Item not found"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => {
            console.log('Successfully connected to MongoDB');
            app.listen(PORT, () => {
                console.log(`Server is listening on port ${PORT}`);
            });
        })
        .catch(error => {
            console.log(error);
        })
