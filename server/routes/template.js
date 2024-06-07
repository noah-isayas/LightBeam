import express from 'express';
import Template from '../models/Template.js';

const router = express.Router();

// Endpoint to save template state
router.post('/save', async (req, res) => {
    const { data } = req.body;

    try {
        const updatedTemplate = await Template.findOneAndUpdate({}, { data }, { upsert: true, new: true });
        res.json(updatedTemplate);
    } catch (error) {
        console.error("Error saving template state:", error);
        res.status(500).send("Error saving template state");
    }
});

// Endpoint to retrieve template state
router.get('/get', async (req, res) => {
    try {
        const template = await Template.findOne({});
        res.json(template ? template.data : {});
    } catch (error) {
        console.error("Error retrieving template state:", error);
        res.status(500).send("Error retrieving template state");
    }
});

// Endpoint to delete a specific item from the template
router.post('/delete', async (req, res) => {
    const { type, index } = req.body;

    try {
        const template = await Template.findOne({});
        if (template) {
            if (type === 'employee') {
                template.data.employees.splice(index, 1);
            } else if (type === 'event') {
                template.data.events.splice(index, 1);
            } else if (type === 'pressItem') {
                template.data.pressItems.splice(index, 1);
            }
            await template.save();
            res.json(template.data);
        } else {
            res.status(404).send("Template not found");
        }
    } catch (error) {
        console.error("Error deleting template item:", error);
        res.status(500).send("Error deleting template item");
    }
});

export default router;

