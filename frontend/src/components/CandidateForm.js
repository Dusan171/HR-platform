import React, { useState, useEffect } from 'react';
import CandidateService from '../services/CandidateService';
import SkillService from '../services/SkillService';

const CandidateForm = ({ candidateId, onSave, onCancel }) => {
    const [candidate, setCandidate] = useState({
        fullName: '', email: '', contactNumber: '', dateOfBirth: '', skills: []
    });
    
    const [allSkills, setAllSkills] = useState([]); 
    const [newSkillName, setNewSkillName] = useState(""); 

    useEffect(() => {
        SkillService.getAllSkills().then(data => setAllSkills(data));

        if (candidateId) {
            CandidateService.getCandidateById(candidateId).then(data => setCandidate(data));
        }
    }, [candidateId]);

    const handleToggleSkill = (skill) => {
        const isSelected = candidate.skills.some(s => s.name === skill.name);
        if (isSelected) {
            setCandidate({
                ...candidate,
                skills: candidate.skills.filter(s => s.name !== skill.name)
            });
        } else {
            setCandidate({
                ...candidate,
                skills: [...candidate.skills, { name: skill.name }]
            });
        }
    };

    const handleAddNewSkill = () => {
        if (newSkillName.trim() !== "" && !candidate.skills.some(s => s.name === newSkillName)) {
            setCandidate({
                ...candidate,
                skills: [...candidate.skills, { name: newSkillName.trim() }]
            });
            setNewSkillName("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if (candidateId) {
                await CandidateService.updateCandidate(candidateId, candidate);
                alert("Candidate updated successfully!");
            } else {
                await CandidateService.createCandidate(candidate);
                alert("Candidate created successfully!");
            }
            onSave();
        } catch (err){
            alert("Error saving candidate: " + err.message);
        }
    };

    return (
        <div className="container">
            <h2>{candidateId ? 'Update Candidate' : 'Add New Candidate'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full name:</label>
                    <input type="text" value={candidate.fullName} onChange={(e) => setCandidate({...candidate, fullName: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={candidate.email} onChange={(e) => setCandidate({...candidate, email: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Contact number:</label>
                    <input type="text" value={candidate.contactNumber} onChange={(e) => setCandidate({...candidate, contactNumber: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Date of birth:</label>
                    <input type="date" value={candidate.dateOfBirth} onChange={(e) => setCandidate({...candidate, dateOfBirth: e.target.value})} required />
                </div>

                <div className="form-group">
                    <label>Select skills from database:</label>
                    <div className="skills-selector-container">
                        {allSkills.map(skill => (
                            <div 
                                key={skill.id} 
                                onClick={() => handleToggleSkill(skill)}
                                className={`skill-item-clickable ${candidate.skills.some(s => s.name === skill.name) ? 'active' : ''}`}
                            >
                                {skill.name}
                            </div>
                        ))}
                        {allSkills.length === 0 && <small>No skills in database yet.</small>}
                    </div>

                    <label>Or add a new skill:</label>
                    <div className="input-with-button">
                        <input 
                            type="text" 
                            placeholder="Type new skill..." 
                            value={newSkillName} 
                            onChange={(e) => setNewSkillName(e.target.value)} 
                        />
                        <button type="button" className="btn btn-search" onClick={handleAddNewSkill}>Add</button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Selected skills for candidate:</label>
                    <div className="selected-skills-list">
                        {candidate.skills.map((s, index) => (
                            <span key={index} className="skill-badge skill-badge-selected">
                                {s.name} 
                                <span className="skill-remove-icon" onClick={() => handleToggleSkill(s)}>&times;</span>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="form-footer">
                    <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="btn btn-add">Save candidate</button>
                </div>
            </form>
        </div>
    );
};

export default CandidateForm;