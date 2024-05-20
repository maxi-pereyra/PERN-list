const pool =  require('../db')

const getAllTasks = async (req,res) => {
    res.send('retrieven')
}

const getTask =async (req,res) => {
    res.send(' retrieving a one of task')
}

const createTask = async (req,res) => {
    const {title,description} = req.body
    const result = await pool.query("INSERT INTO list (title , description) VALUES ($1,$2)",[
    title,
    description])
    console.log(result)
    res.send('creating a list of task')
    /*
        catch(error){next(error)}
    */
}

const deleteTask = async (req,res) => {
    res.send('deleting a list of task')
}

const upDateTask = async (req,res) => {
    res.send('updating a list of task')
}

module.exports = {
    getAllTasks: getAllTasks,
    getTask: getTask,
    createTask: createTask,
    deleteTask: deleteTask,
    upDateTask: upDateTask
}