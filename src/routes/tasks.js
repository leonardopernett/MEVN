const express = require('express')
const router = express.Router()



const Task = require('../models/db.js')

router.get('/', async (req, res) => {
    const task = await Task.find()
      res.json(task)
      console.log(req.body)
})


router.post('/', async(req, res)=> {
       const task = Task(req.body)
       await task.save()
       res.json({
           status: 'task saved '
       }) 
})


router.get('/:id', async (req, res)=> {

    const task =  await Task.findById(req.params.id)
     res.json(task)
 })
 
 

router.put('/:id', async (req,res)=> {

    const task = await Task.findByIdAndUpdate(req.params.id, req.body)

      res.json(task)
})


router.delete('/:id', async (req,res)=> {

     await Task.findByIdAndRemove(req.params.id)

      res.json({
          status: 'taks deleted'
      })

      console.log(req.body)
})


module.exports= router