const express = require('express');
const router = express.Router();
const engine = require('ejs');


const Task = require('../models/task');
const Jobs = require('../models/jobs');
const Addcv = require('../models/curriculums');
const Dstr = require('../models/districts');
const JobCan = require('../models/candidates');
const Posi = require('../models/positions');
const Cach = require('../models/cachuelos');


// Initilization
//require('../passport/local-auth');

//const Jobs = require('../models/tests');

/*
// GET DATA FROM TASK.find, this is an example
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks);
    res.render('index', {
        tasks
    });
});
*/

//POST we add new info into the form - this is an example
router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');

});

// EDIT we edit info into the form - this is an example
router.get('/edit/:id', async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    console.log(task)
    res.render('edit', { task });
  });

// EDIT from the FORM to be edited - this is an example
router.post('/edit/:id', async (req, res, next) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
  });
  
// Delete from the FORM to be deleted - this is an example
  router.get('/delete/:id', async (req, res, next) => {
    let { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
  });

  // TURN button COLOR - this is an example
  router.get('/turn/:id', async (req, res, next) => {
    let { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
  });

  // GET from db for TEST web site
router.get('/test', async (req, res) => {
  //const tests = await Tests.find();
  //console.log(test);
  //res.render('test', {tasks});
  res.render('test');
});

/* THESE ARE THE METHODS THAT I AM GOING TO USE INTO BCHPE CONSULTING WEB SITE */

// GET all JOBS from database
router.get('/ofertas-laborales', async (req, res) => {
  const jobs = await Jobs.find();
  console.log(jobs);
  res.render('jobs', {jobs});
  });


// GET the BLOG SITE 
router.get('/blog', async (req, res) => {
  //const tests = await Tests.find();
  //console.log(test);
  //res.render('test', {
  //    tasks
 // });
  res.render('blog');
});


// GET THE HOMEPAGE SITE
/*
router.get('/', async (req, res) => {
  //const tests = await Tests.find();
  //console.log(test);
  //res.render('test', {
  //    tasks
 // });
  res.render('home');
});
*/

// GET THE HOMEPAGE SITE
router.get('/', async (req, res) => {
  //const tests = await Tests.find();
  //console.log(test);
  //res.render('test', {
  //    tasks
 // });
  res.render('home');
});

// GET THE CURRICULUM SITE AND DISTRICTS/ POSITION INTO THE DROPDOWN
router.get('/formulario-trabajos', async (req, res) => {
  const yo = await Dstr.find().sort({'district': 1});
  const pos = await Posi.find({ "position": { "$exists": true } }).sort({'position': 1});
  console.log(yo);
  console.log(pos);
  res.render('curriculum', {yo,pos});

});

//POST from the FORM add curriculum - need to change
router.post('/agregar-curriculum', async (req, res) => {
  const addcurriculum = new Addcv(req.body);
  await addcurriculum.save();
  console.log(addcurriculum);
  req.flash('success', 'Muchas gracias por enviar tus datos!. Puedes ir a la seccion "Avisos" para revisar las posiciones disponibles');
  res.redirect('/formulario-trabajos');
  //res.send('thanks');

});


// GET from Jobs button (Jobs description)
router.get('/ofertas-laborales/ofertas-descripcion/:id', async (req, res, next) => {
  const jobs = await Jobs.findById(req.params.id);
  console.log(jobs)
  res.render('jobs_description', { jobs });
  
  //res.render('jobs_description');
});

// POST CURRICULUM FROM JOBS LIST
router.post('/apply-candidates', async (req, res, next) => {
  const applycandidate = new JobCan(req.body);
  await applycandidate.save();
  console.log(applycandidate)
  res.send("Thank you");
});

// GET the Package SITE 
router.get('/paquetes', async (req, res) => {
  //const tests = await Tests.find();
  //console.log(test);
  //res.render('test', {
  //    tasks
 // });
  res.render('packages');
});


router.get('/cachuelos', async (req, res) => {
  const cach = await Cach.find();
  //console.log(test);
  res.render('cachuelos', {cach});
  //res.render('cachuelos');
});


module.exports = router;


