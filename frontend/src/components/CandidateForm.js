import React, { useState, useEffect } from 'react';
import CandidateService from '../services/CandidateService';
import SkillService from '../services/SkillService';

const CandidateForm = ({ candidateId, onSave, onCancel }) => {
    const [candidate, setCandidate] = useState({
        fullName: '', email: '', contactNumber: '', dateOfBirth: '', skills: []
    });
    
    const [allSkills, setAllSkills] = useState([]); // Sve veštine iz baze
    const [newSkillName, setNewSkillName] = useState(""); // Za manuelni unos

    useEffect(() => {
        // 1. Učitaj sve veštine za padajući meni
        SkillService.getAllSkills().then(data => setAllSkills(data));

        // 2. Ako je Update, učitaj podatke kandidata
        if (candidateId) {
            CandidateService.getCandidateById(candidateId).then(data => setCandidate(data));
        }
    }, [candidateId]);

    const handleToggleSkill = (skill) => {
        const isSelected = candidate.skills.some(s => s.name === skill.name);
        if (isSelected) {
            // Ukloni veštinu
            setCandidate({
                ...candidate,
                skills: candidate.skills.filter(s => s.name !== skill.name)
            });
        } else {
            // Dodaj veštinu
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
        if (candidateId) {
            await CandidateService.updateCandidate(candidateId, candidate);
        } else {
            await CandidateService.createCandidate(candidate);
        }
        onSave();
    };

    return (
        <div className="container">
            <h2>{candidateId ? 'Update Candidate' : 'Add New Candidate'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" value={candidate.fullName} onChange={(e) => setCandidate({...candidate, fullName: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={candidate.email} onChange={(e) => setCandidate({...candidate, email: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Contact Number:</label>
                    <input type="text" value={candidate.contactNumber} onChange={(e) => setCandidate({...candidate, contactNumber: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" value={candidate.dateOfBirth} onChange={(e) => setCandidate({...candidate, dateOfBirth: e.target.value})} required />
                </div>

                {/* SKILLS SECTION */}
                <div className="form-group">
                    <label>Select Skills from Database:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px', border: '1px solid #ddd', padding: '10px', borderRadius: '4px', backgroundColor: '#fcfcfc' }}>
                        {allSkills.map(skill => (
                            <div 
                                key={skill.id} 
                                onClick={() => handleToggleSkill(skill)}
                                style={{
                                    padding: '5px 10px',
                                    borderRadius: '15px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    border: '1px solid #ccc',
                                    backgroundColor: candidate.skills.some(s => s.name === skill.name) ? '#28a745' : '#fff',
                                    color: candidate.skills.some(s => s.name === skill.name) ? '#fff' : '#000'
                                }}
                            >
                                {skill.name}
                            </div>
                        ))}
                        {allSkills.length === 0 && <small>No skills in database yet.</small>}
                    </div>

                    <label>Or Add a New Skill:</label>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <input 
                            type="text" 
                            placeholder="Type new skill..." 
                            value={newSkillName} 
                            onChange={(e) => setNewSkillName(e.target.value)} 
                        />
                        <button type="button" className="btn btn-search" onClick={handleAddNewSkill}>Add</button>
                    </div>
                </div>

                <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                    <label>Selected Skills for Candidate:</label>
                    <div>
                        {candidate.skills.map((s, index) => (
                            <span key={index} className="skill-badge" style={{ backgroundColor: '#28a745', color: 'white' }}>
                                {s.name} <span onClick={() => handleToggleSkill(s)} style={{ marginLeft: '5px', cursor: 'pointer', fontWeight: 'bold' }}>&times;</span>
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <button type="submit" className="btn btn-add">Save Candidate</button>
                    <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CandidateForm;