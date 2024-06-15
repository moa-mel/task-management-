const express = require('express')
const router = express.Router()
const {getTasks, getTask, updateTask, createTask, deleteTask} = require('../controller/taskController')

//get all rooms
router.get('/', getTasks) 
//get a room
router.get('/:id', getTask)
//create room
router.post('/create', createTask)
//update room
router.put('/update/:id', updateTask)
//delete room
router.delete('/delete/:id', deleteTask)

module.exports = router;