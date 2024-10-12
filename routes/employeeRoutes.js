const express = require('express');
const { check } = require('express-validator');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.get('/employee', employeeController.getEmployees);

router.post('/employee', [
    check('first_name', 'First name is required').notEmpty(),
    check('last_name', 'Last name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('position', 'Position is required').notEmpty(),
    check('salary', 'Salary is required').notEmpty(),
    check('department', 'Department is required').notEmpty()
], employeeController.createEmployee);

router.get('/employee/:id', employeeController.getEmployee);

router.put('/employee/:eid', employeeController.updateEmployee);

router.delete('/employee/:eid', employeeController.deleteEmployee);

module.exports = router;