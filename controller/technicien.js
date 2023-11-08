// controller.js
import Technician from '../models/technicien.js';
import User from '../models/user.js';

// Create a new technician
export const createTechnician = async (req, res) => {
    try {
      const { user: userDetails, specialization, experience } = req.body;
  
      // First, create the User
      const user = new User(userDetails);
      await user.save();
  
      // Then, create the Technician with the User's ObjectId
      const technician = new Technician({ user: user._id, specialization, experience });
      await technician.save();
  
      const populatedTechnician = await Technician.findById(technician._id).populate('user');
      res.status(201).json({ message: 'Technician created successfully', technician: populatedTechnician });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  };

  

// Get all technicians
export const getTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find().populate('user');
    res.status(200).json({ message: 'Technicians fetched successfully', technicians });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
// Update a technician by id
export const updateTechnician = async (req, res) => {
    try {
      const { id } = req.params;
      const { user, specialization, experience } = req.body;
      const technician = await Technician.findByIdAndUpdate(id, { user, specialization, experience }, { new: true });
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
      } else {
        res.status(200).json({ message: 'Technician updated successfully', technician });
      }
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  
  // Delete a technician by id
  export const deleteTechnician = async (req, res) => {
    try {
      const { id } = req.params;
      const technician = await Technician.findByIdAndDelete(id);
      if (!technician) {
        res.status(404).json({ message: 'Technician not found' });
      } else {
        res.status(200).json({ message: 'Technician deleted successfully', technician });
      }
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  };
  
