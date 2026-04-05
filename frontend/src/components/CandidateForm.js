import React, { useState, useEffect } from 'react';
import CandidateService from '../services/CandidateService';

const CandidateForm = ({ candidateId, onSave, onCancel }) => {
    const [candidate, setCandidate] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        dateOfBirth: '',
        skills: [] 
    });
 
    const [skillsText, setSkillsText] = useState("");

    useEffect(() => {
        if (candidateId) {
            CandidateService.getCandidateById(candidateId).then(data => {
                setCandidate(data);
                const names = data.skills.map(s => s.name).join(", ");
                setSkillsText(names);
            });
        }
    }, [candidateId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const skillObjects = skillsText.split(",")
            .map(s => s.trim())
            .filter(s => s !== "")
            .map(name => ({ name }));

        const candidateToSave = { ...candidate, skills: skillObjects };

        if (candidateId) {
            await CandidateService.updateCandidate(candidateId, candidateToSave);
        } else {
            await CandidateService.createCandidate(candidateToSave);
        }
        onSave();
    };

    return (
        <div className="container">
            <h2>{candidateId ? 'Update Candidate' : 'Add New Candidate'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" value={candidate.fullName} 
                           onChange={(e) => setCandidate({...candidate, fullName: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={candidate.email} 
                           onChange={(e) => setCandidate({...candidate, email: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Contact Number:</label>
                    <input type="text" value={candidate.contactNumber} 
                           onChange={(e) => setCandidate({...candidate, contactNumber: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" value={candidate.dateOfBirth} 
                           onChange={(e) => setCandidate({...candidate, dateOfBirth: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Skills (comma separated):</label>
                    <input type="text" value={skillsText} placeholder="e.g. Java, C#, SQL"
                           onChange={(e) => setSkillsText(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-add">Save</button>
                <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default CandidateForm;