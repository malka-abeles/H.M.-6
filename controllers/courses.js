const express = require('express');
const router = express.Router();
const fsPromises =require('fs').promises;

const courses = require('../data/courses.json');

router.post('/',async(req,res)=>{
    const data = req.body;
    courses.push(data);
    await fsPromises.writeFile('./data/courses.json',JSON.stringify(courses));
    res.send();
})

router.delete('/:id',async(req,res)=>{
    const id=parseInt( req.params.id);
    const course = courses.find(course=> course.id===id);
    const i=courses.indexOf(course);
    courses.splice(i,1);
    await fsPromises.writeFile('./data/courses.json',JSON.stringify(courses));
    res.send();
})

router.put('/',async(req,res)=>{
    const id=req.body.id;
    const course = courses.find(course=> course.id===id);
    const i=courses.indexOf(course);
    if(i){
        courses[i].description= req.body.description;
    }
})

router.get('/',(req,res)=>{
    res.send(courses);
})

router.get('/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const cours=courses.find(cours => cours.id === id);
    if(cours== null)
        res.status(404).send();
    else
        res.send(cours);
})


module.exports = router;
