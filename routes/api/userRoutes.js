const router = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../../controllers/userController');


module.exports = router;