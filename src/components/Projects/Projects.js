import React, { useState, useEffect } from 'react';
import './Projects.css';
import ProjectPopUp from './ProjectPopUp';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/projects')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const addProject = (project) => {
        fetch('http://localhost:3001/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(response =>response.json())
        .then(newProject => {
            setProjects([...projects, newProject]);
        })
        .catch(error => console.error('Error adding project:', error));
    }

    return (
        <div className='projects'>
            <div className='header'>
                <h2>Projects</h2>
                <button className='add-project' onClick={togglePopup}>
                    <i className='fa-solid fa-plus'></i>
                </button>
            </div>
            <div className='projects-container'>
                {projects.map((project) => (
                    <button key={project._id} className='title'>
                        <p>{project.projectName}</p>
                    </button>
                ))}
            </div>
            <ProjectPopUp show={showPopup} onClose={togglePopup} onAddProject={addProject} />
        </div>
    );
}

export default Projects;