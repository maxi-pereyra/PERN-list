const { Router } = require('express')
//const pool = require('../db.js')
const { getAllTasks,
    getTask,
    createTask,
    deleteTask,
    upDateTask } = require('../controllers/tasks.controllers')

const router = Router();

router.get('/', getAllTasks)    

router.get('/tasks/10', getTask)

router.post('/tasks', createTask)

router.delete('/tasks', deleteTask)

router.put('/tasks', upDateTask)

module.exports = router