const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duedate: {
            type: Date,
            required: true
        }
    },
    {
        timestamp: true
    }
)


const Task = mongoose.model("Task", taskSchema);

module.exports = Task