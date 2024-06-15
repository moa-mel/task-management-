const Task = require('../model/taskModel')
const asyncHandler = require('express-async-handler')



// Helper function to parse date
const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(year, month - 1, day); // Months are zero-indexed in JavaScript Date
};

//get all tasks
const getTasks = asyncHandler(async(req, res) =>{
    try{
        const tasks = await Task.find({});
        res.status(200).json(tasks)
    } catch(error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//get a task
const getTask =  asyncHandler(async(req, res) =>{
    try{
        const {id} = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task)
    } catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

//create task
const createTask =  asyncHandler(async(req, res)=>{
    try{
        const { duedate, title, description } = req.body;
        const parsedDate = parseDate(duedate);
        const task = await Task.create({duedate: parsedDate, title, description})
        res.status(200).json(task);
    } catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

//update task
const updateTask = asyncHandler(async(req, res) =>{
    try{
        const {id} = req.params;
        const { duedate, title, description } = req.body;
        const parsedDate = parseDate(duedate);
        const task = await Task.findByIdAndUpdate(id, {duedate: parsedDate, title, description}, { new: true });
        // we cannot find any room in database
        if(!task){
            return res.status(404).json({message: `cannot find any task with ID ${id}`})
        }
        const updatedTask = await Task.findById(id);
        res.status(200).json(updatedTask)
    } catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

//delete task
const deleteTask = asyncHandler(async(req, res) =>{
    try{
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({message: `cannot find any task with ID ${id}`})
        }
        res.status(200).json(task)
    } catch(error){
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    getTasks, getTask, deleteTask, updateTask, createTask
}