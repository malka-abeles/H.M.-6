const express = require('express');
const router = express.Router();

const courses = require('../data/courses.json');

router.get('/',(req,res)=>{
    res.send(courses);
})

router.get('/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const cours=courses.find(cours => cours.id === id);
    res.send(cours||{});
})


module.exports = router;
