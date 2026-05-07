const Lead = require("../models/Lead");

// CREATE LEAD
const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    console.error("CREATE LEAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL LEADS
const getLeads = async (req, res) => {
  try {
    const { status, leadSource, assignedSalesPerson, search } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (leadSource) filter.leadSource = leadSource;
    if (assignedSalesPerson) {
      filter.assignedSalesPerson = assignedSalesPerson;
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
    console.error("GET LEADS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE LEAD
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("notes.createdBy", "name email");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(lead);
  } catch (error) {
    console.error("GET LEAD BY ID ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE LEAD
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(lead);
  } catch (error) {
    console.error("UPDATE LEAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE LEAD
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("DELETE LEAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ADD NOTE
const addNote = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Note content is required" });
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const newNote = {
      content,
      createdBy: req.user._id || req.user.id,
    };

    lead.notes.push(newNote);

    await lead.save();

    const updatedLead = await Lead.findById(req.params.id)
      .populate("notes.createdBy", "name email");

    res.status(200).json(updatedLead);
  } catch (error) {
    console.error("ADD NOTE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
// DELETE NOTE
const deleteNote = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.notes = lead.notes.filter(
      (note) => note._id.toString() !== req.params.noteId
    );

    await lead.save();

    res.status(200).json(lead);
  } catch (error) {
    console.error("DELETE NOTE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  addNote,
  deleteNote,
};