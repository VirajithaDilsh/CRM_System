const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead
} = require('../controllers/leadController');

const router = express.Router();

router.post('/', authMiddleware, createLead);
router.get('/', authMiddleware, getLeads);
router.get('/:id', authMiddleware, getLeadById);
router.put('/:id', authMiddleware, updateLead);
router.delete('/:id', authMiddleware, deleteLead);

module.exports = router;
