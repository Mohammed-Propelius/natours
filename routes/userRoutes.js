const express = require('express');
const {getAllUsers,createUsers,getUser,updateUser,deleteUser} = require('../controller/userController')
const userRoutes = express.Router()

userRoutes.route('/').get(getAllUsers).post(createUsers)
userRoutes.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
module.exports = userRoutes
