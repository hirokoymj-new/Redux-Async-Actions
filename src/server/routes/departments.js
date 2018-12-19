const {Department} = require('../models/departments');
const express = require('express');
const router = express.Router();

/**
 * Returns department name by alphabetical order.
 * @example
 * // URL:
 * http://localhost:8080/api/departments
 */
router.get('/', (req, res)=>{
  Department
    .find()
    .sort({name: 1})
    .exec((err, departments)=>{
      if(err) return res.send(err);
        res.json(departments);
      })
  }
);


/**
 * Returns a single department data.
 * @params {string}, _id - Department Id
 * @example
 * // URL:
 * http://localhost:8080/api/departments/5c19564829aaef3f0af53601
 */
router.get('/:id', (req, res)=>{
  const id = req.params.id;
  Department.findById(id, (err, department)=>{
    if(err) return res.status(500).send(err);
    if(!department) return res.status(404).send(err);
    res.json(department);
  })
});

/**
 * DELETE a department.
 * HTTP Method: DELETE
 * @params {number}, _id - Department Id
 * @example
 * // URL
 * http://localhost:8080/api/departments/5c19564829aaef3f0af53601
 * @returns {json} - Deleted document
 */
router.delete('/:id', (req, res)=>{
  const id = req.params.id;

  Department.findByIdAndDelete(id, function(err, department){
    if(err) return res.status(500).send(err);
    if(!department) return res.status(404).send(err);
    res.json(department);
  });
});


/**
 * Save new department data.
 * HTTP Method: POST
 * @example
 * // URL:
 * http://localhost:8080/api/departments
 */
router.post('/', (req, res)=>{
  const {name} = req.body;
  const department = new Department({
    name
  });

  department.save(function(err){
    if(err) return res.status(500).send(err);
    if(!department) return res.status(404).send(err);
    res.json(department);
  })
});

module.exports = router; 