const express = require('express'); 
const app = express(); 
const PORT = 3000; 


const workersController = require('./controllers/workers');
const coursesController = require('./controllers/courses');

app.use('/workers', workersController);
app.use('/courses', coursesController);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error in the router, please try later');
  });


app.get("*",function (req,res){
	res.status(404).send("יש לך טעות בכתובת");
})



app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
);

