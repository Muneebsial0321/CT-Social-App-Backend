const Jobs = require('../Schemas/Jobs'); // Adjust the path to your Jobs model if necessary

// Get Jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find({});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Jobss', error });
  }
};

// Get a Jobs

const getAJob = async (req, res) => {
  try {
    const {id} = req.params
    const jobs = await Jobs.findById(id);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Jobss', error });
  }
};

// Create Jobs
const createJob = async (req, res) => {
  try {
    const Jobs = new Jobs(req.body);
    await Jobs.save();
    res.status(201).json(Jobs);
  } catch (error) {
    res.status(400).json({ message: 'Error creating Jobs', error });
  }
};

// Update Jobs
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await Jobs.findByIdAndUpdate(id, req.body, { new: true });
    if (!jobs) {
      return res.status(404).json({ message: 'Jobs not found' });
    }
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: 'Error updating Jobs', error });
  }
};

// Delete Jobs
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await Jobs.findByIdAndDelete(id);
    if (!jobs) {
      return res.status(404).json({ message: 'Jobs not found' });
    }
    res.status(200).json({ message: 'Jobs deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting Jobs', error });
  }
};

module.exports = {
  getJobs,
  getAJob,
  createJob,
  updateJob,
  deleteJob
};
