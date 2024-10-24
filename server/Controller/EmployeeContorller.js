const Employee = require('../model/data');

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const employeeData = {
            ...req.body,
            image: req.file ? `uploads/${req.file.filename}` : null // Save the image path if a file is uploaded
        };

        const employee = new Employee(employeeData);
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all employees with optional search query
exports.getAllEmployees = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.query; // Extract query parameters
        const filter = {};

        // Construct filter object based on query parameters
        if (firstName) {
            filter.firstName = { $regex: firstName, $options: 'i' }; // Case-insensitive search
        }
        if (lastName) {
            filter.lastName = { $regex: lastName, $options: 'i' };
        }
        if (email) {
            filter.email = { $regex: email, $options: 'i' };
        }

        const employees = await Employee.find(filter); // Apply filter
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });

        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
