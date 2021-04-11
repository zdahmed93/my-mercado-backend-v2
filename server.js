const express = require('express');
const mongoose = require('mongoose');

const itemsRouter = require('./routes/items');

require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Mercado Marketplace API v1" })
});

app.use('/items', itemsRouter);

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
