const express = require('express');
const router = express.Router();
const employeeController = require('../Controller/EmployeeContorller');
const { upload } = require('../middlware/uploadMiddleware');


router.post('/', upload, employeeController.createEmployee);  // Create employee with image upload
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;







