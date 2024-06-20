const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/add-user', userController.postUser);
router.get('/user/get-user', userController.getUser);
router.post('/user/delete-user', userController.deleteUser);

router.get('/user', userController.getPage);


module.exports = router;
