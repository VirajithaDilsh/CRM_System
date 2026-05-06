const Lead = require('../models/Lead');

const createLead = async (req, res) => {
    try {
        const lead=await Lead.create(req.body);
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

const getLeads = async (req, res) => {
  try {
    const { status, leadSource, assignedSalesperson, search } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (leadSource) {
      filter.leadSource = leadSource;
    }

    if (assignedSalesperson) {
      filter.assignedSalesperson = assignedSalesperson;
    }

    if (search) {
      filter.$or = [
        { leadName: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeadById = async (req, res) => {
    try {
        const lead=await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

const updateLead = async (req, res) => {
    try {
        const lead=await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators: true });
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

const deleteLead = async (req, res) => {
    try {
        const lead=await Lead.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};
const addNote = async (req, res) => {
  try {
    const { content } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const newNote = {
      content,
      createdBy: req.user.id, // from token
    };

    lead.notes.push(newNote);

    await lead.save();

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead
};  
