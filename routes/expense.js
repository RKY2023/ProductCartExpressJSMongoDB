const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/expense', expenseController.postExpense);
router.get('/expense', expenseController.getExpense);
router.post('/expense/delete', expenseController.deleteExpense);
router.post('/expense/edit', expenseController.editExpense);
router.post('/expense/update', expenseController.updateExpense);

module.exports = router;
