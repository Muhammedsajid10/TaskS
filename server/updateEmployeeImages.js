const mongoose = require('mongoose');
const Employee = require('./model/data'); 
const connectDB = require('./mongoose/config'); 


connectDB();

// Update employee image paths
const updateEmployeeImages = async () => {
  try {
    const result = await Employee.updateMany({}, [
      { $set: { image: { $concat: ['uploads/', { $arrayElemAt: [{ $split: ['$image', '\\'] }, -1] }] } } }
    ]);
    
    console.log('Update result:', result); 

    if (result.modifiedCount) {
      console.log(`${result.modifiedCount} employees updated.`);
    } else {
      console.log('No employees were updated.');
    }
  } catch (err) {
    console.error('Error updating images:', err);
  } finally {
    mongoose.connection.close(); // Close the connection after updating
  }
};

updateEmployeeImages();
