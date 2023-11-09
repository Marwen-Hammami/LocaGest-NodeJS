import Client from '../models/client.js';
import User from '../models/user.js';

export const createClient = async (req, res) => {
  try {
    const { user: userDetails, address, creditCardNumber, rate } = req.body;

    const user = new User(userDetails);
    await user.save();

    const client = new Client({ user: user._id, address, creditCardNumber, rate });
    await client.save();

    res.status(201).json({ message: 'Client created successfully', client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().populate('user');
    res.status(200).json({ message: 'Clients fetched successfully', clients });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id).populate('user');
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client fetched successfully', client });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { user: userDetails, address, creditCardNumber, rate } = req.body;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const user = await User.findById(client.user);
    Object.assign(user, userDetails);
    await user.save();

    Object.assign(client, { address, creditCardNumber, rate });
    await client.save();

    res.status(200).json({ message: 'Client updated successfully', client });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await User.findByIdAndDelete(client.user);
    await Client.findByIdAndDelete(id);

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
