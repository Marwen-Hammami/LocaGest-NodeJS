import Admin from '../models/admin.js';
import User from '../models/user.js';

export const createAdmin = async (req, res) => {
  try {
    const { user: userDetails, role, active } = req.body;

    const user = new User(userDetails);
    await user.save();

    const admin = new Admin({ user: user._id, role, active });
    await admin.save();

    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().populate('user');
    res.status(200).json({ message: 'Admins fetched successfully', admins });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id).populate('user');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json({ message: 'Admin fetched successfully', admin });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { user: userDetails, role, active } = req.body;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const user = await User.findById(admin.user);
    Object.assign(user, userDetails);
    await user.save();

    Object.assign(admin, { role, active });
    await admin.save();

    res.status(200).json({ message: 'Admin updated successfully', admin });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    await User.findByIdAndDelete(admin.user);
    await Admin.findByIdAndDelete(id);

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
