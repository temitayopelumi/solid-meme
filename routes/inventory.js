const express = require('express');

const router = express.Router()

const {getAllItems, getItem, createItem, updateItem, deleteItem, restoreItem } = require ('../controllers/inventory')

router.route('/').post(createItem).get(getAllItems)
router.route('/:id').get(getItem).patch(updateItem)
router.route('/delete/:id').patch(deleteItem)
router.route('/restore/:id').patch(restoreItem)
module.exports = router