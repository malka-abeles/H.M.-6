const express = require('express');
const router = express.Router();

const workers = require('../data/workers.json');

const fsPromises = require('fs').promises; 

router.post('/', async(req, res) => {
  let data = req.body;
  workers.push(data);
  await fsPromises.writeFile( './data/workers.json',JSON.stringify(workers))
  res.send('Data Received: '+ JSON.stringify(data));
});

router.delete('/:id', async (req,res)=>{
  const workerId = parseInt(req.params.id);
  const worker = workers.find(worker => worker.id === workerId);
  const i=workers.indexOf(worker);
  workers.splice(i,1);
  await fsPromises.writeFile( './data/workers.json',JSON.stringify(workers))
  res.send('Succeeded');
})

router.put('/:id',async(req,res)=>{
  const workerId = parseInt(req.params.id);
  const position = req.body.position;
  const department = req.body.department;
  const startDate = req.body.startDate;
  const worker = workers.find(worker => worker.id === workerId);
  console.log(position+" "+department+" "+startDate+" "+worker);
  if(worker!=null){
    const i=workers.indexOf(worker);
    if(position){
     workers[i].position=position;
    }
    if(department){
      workers[i].department=department;
    }
    if(startDate){
     workers[i].startDate=startDate;
    }
  }
  // const filePath = path.join(__dirname, '../data/workers.json');
  await fsPromises.writeFile('./data/workers.json',JSON.stringify(workers))
  res.send('Succeeded');
})
// Get worker details by ID
router.get('/:id', (req, res) => {   
  const workerId = parseInt(req.params.id);
  const worker = workers.find(worker => worker.id === workerId);
  if(worker==null)
    res.status(404).send();
  else
    res.send(worker);
});

// Get list of all workers
router.get('/', (req, res) => {
  const position = req.query.position;
  const department = req.query.department;
  const startDate = req.query.startDate;

  // Apply filters if provided
  let filteredWorkers = workers;
  
  if (position) {
    filteredWorkers = filteredWorkers.filter(worker => worker.position != position);
  }
  if (department) {
    filteredWorkers = filteredWorkers.filter(worker => worker.department === department);
  }
  if (startDate) {
    filteredWorkers = filteredWorkers.filter(worker => worker.startDate > startDate);
  }

  if(filteredWorkers[0]==null)
    res.status(404).send();
  else
    res.send(filteredWorkers);
});

// router.post('/',function(){
// });

module.exports = router;
