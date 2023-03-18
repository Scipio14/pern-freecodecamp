require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const pool = require('./db')

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create a todo
app.post('/todos',async(req,res)=>{
  try {
    const {description} =req.body
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description])
    // res.json(newTodo)
    res.status(201).json(newTodo.rows[0])
  } catch (error) {
    console.log(error)
  }
})

//get all todos
app.get('/todos',async(req,res)=>{
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
   return res.json(allTodos.rows)
  } catch (error) {
    console.log(error)
  }
})

//get a specific todo
app.get('/todos/:id',async(req,res)=>{
  try {
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
    return res.json(todo.rows[0])
  } catch (error) {
    console.log(error);
  }
})

//update a todo
app.put("/todos/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const {description} = req.body;

    const updateTodo = await pool.query("UPDATE todo SET description = $1  WHERE todo_id = $2",[description,id]);
    
    return res.json("Todo was updated");
  } catch (error) {
    console.log(error)
  }
})

//delete a todo
app.delete('/todos/:id',async(req,res)=>{
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
    res.json("Todo was deleted")
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
})
