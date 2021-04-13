const express = require('express');

const { getAllItems, getOneItem, createItem, updateItem, deleteItem } = require('../controllers/items')

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getOneItem);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;