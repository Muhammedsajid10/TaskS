import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import '../styles/EmployeeList.css';

const API_URL = 'http://localhost:5000/api/employees/';

const EmployeeList = ({ searchTerm }) => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, [searchTerm]); 
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: { firstName: searchTerm } // Add search term as a query parameter
      });
      setEmployees(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleShow = (employee = null) => {
    setSelectedEmployee(employee);
    setIsEditMode(!!employee);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleSave = async (employee) => {
    try {
      if (isEditMode) {
        const response = await axios.put(`${API_URL}${employee._id}`, employee);
        console.log('Updated employee:', response.data);
      } else {
        const response = await axios.post(API_URL, employee);
        console.log('Added employee:', response.data);
      }

      await fetchEmployees();
      handleClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      console.log('Deleted employee:', response.data);

      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employee-list-container m-4">
      <h2 style={{ fontFamily: 'system-ui' }}>Employee</h2>
      <Button variant="primary" className="add-employee-btn" onClick={() => handleShow()}>
        +
      </Button>
      <div className="employee-list">
        {employees.map((employee, index) => (
          <EmployeeCard
            key={index}
            employee={employee}
            onEdit={() => handleShow(employee)}
            onDelete={() => handleDelete(employee._id)}
          />
        ))}
      </div>

      <AddEmployeeModal
        show={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        employee={selectedEmployee}
      />
    </div>
  );
};

const EmployeeCard = ({ employee, onEdit, onDelete }) => (
  <div className="employee-card">
    <div className="employee-header">
      <div className="avatar-container">
        {employee.image ? (
          <img
            src={`http://localhost:5000/${employee.image}`}
            alt={`${employee.firstName[0]} ${employee.lastName[0]}`}
            className="employee-avatar"
          />
        ) : (
          <div className="avatar-placeholder">
            {`${employee.firstName[0]}${employee.lastName[0]}`}
          </div>
        )}
      </div>
      <span className="employee-badge">#EMP{employee._id.slice(-4)}</span>
      <h4>{employee.firstName} {employee.lastName}</h4>
      <p>{employee.email}</p>
    </div>
    <div className="employee-body">
      <div className="designation-wrapper">
        <div className='d-flex flex-column'>
          <div>
          <p className="department"><strong>{employee.department}</strong></p>
            
          </div>
          <div>
          <p>Department</p>
          </div>
        </div>

        <div className='d-flex flex-column'>
          <div>
          <p className="designation"><strong>{employee.designation}</strong></p>
            
          </div>
          <div>
          <p>Designation</p>
          </div>
        </div>
        
        
      </div>



      <div className="designation-wrapper">
        <div className='d-flex flex-column'>
          <div>
          <p><strong>{new Date(employee.dateOfJoining).toLocaleDateString()}</strong></p>
            
          </div>
          <div>
          <p>Date of Joining</p>
          </div>
        </div>

        <div className='d-flex flex-column'>
          <div>
          <p><strong>{employee.salary.toLocaleString()}</strong></p>
            
          </div>
          <div>
          <p>Salary</p>
          </div>
        </div>
        
        
      </div>


      
      
    </div>
    <div className="employee-actions">
      <FaEdit className="icon" onClick={onEdit} title="Edit" />
      <FaTrash className="icon" onClick={onDelete} title="Delete" />
    </div>
  </div>
);

const AddEmployeeModal = ({ show, handleClose, handleSave, employee }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    designation: '',
    dateOfJoining: '',
    salary: '',
    image: null, 
  });

  useEffect(() => {
    if (employee) setFormData(employee);
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] }); // Handle file upload
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    await handleSave(formDataToSend);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{employee ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="designation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="dateOfJoining">
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="salary">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeList;
