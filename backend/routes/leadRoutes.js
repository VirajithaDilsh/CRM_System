const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
    addNote,
    deleteNote,
} = require('../controllers/leadController');

const router = express.Router();

router.post('/', authMiddleware, createLead);
router.get('/', authMiddleware, getLeads);
router.get('/:id', authMiddleware, getLeadById);
router.put('/:id', authMiddleware, updateLead);
router.delete('/:id', authMiddleware, deleteLead);
router.post("/:id/notes", authMiddleware, addNote);
router.delete("/:id/notes/:noteId", authMiddleware, deleteNote);

module.exports = router;
