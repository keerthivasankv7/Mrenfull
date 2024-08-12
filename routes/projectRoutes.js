const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// Create a new project
router.post('/projects', async (req, res) => {
    const { title, description, imageUrl } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            imageUrl,
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a project by ID
router.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a project by ID
router.put('/projects/:id', async (req, res) => {
    const { title, description, imageUrl } = req.body;

    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.title = title || project.title;
        project.description = description || project.description;
        project.imageUrl = imageUrl || project.imageUrl;

        await project.save();
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a project by ID
router.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.remove();
        res.status(200).json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
