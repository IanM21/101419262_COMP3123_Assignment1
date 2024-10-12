const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');

exports.createEmployee = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name, email, position, salary, department } = req.body;

        let employee = await Employee.findOne({ email });
        if (employee) {
            return res.status(400).json({ message: 'Employee already exists' });
        }

        // check if salary is a number
        if (isNaN(salary) || typeof salary !== 'number') {
            return res.status(400).json({ message: 'Salary must be a valid number' });
        }

        employee = new Employee({ first_name, last_name, email, position, salary, department });

        await employee.save();

        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: employee.id
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;

        if (!employeeId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid employee ID format' });
        }

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid employee ID format' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.eid;
        const updateFields = req.body;

        if (!employeeId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid employee ID format' });
        }

        let employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        for (const [key, value] of Object.entries(updateFields)) {
            if (employee.schema.obj.hasOwnProperty(key)) {
                employee[key] = value;
            }
        }
        await employee.save();
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid employee ID format' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.eid;

        if (!employeeId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid employee ID format' });
        }

        let employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await employee.deleteOne();

        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid employee ID format' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}