import React, { useState, useEffect } from 'react';
import CandidateService from '../services/CandidateService';
import '../App.css';

const CandidateList = ({ onAddClick, onEditClick }) => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        loadCandidates();
    }, []);

    const loadCandidates = () => {
        CandidateService.getAllCandidates().then(data => setCandidates(data));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this candidate?")) {
            await CandidateService.deleteCandidate(id);
            loadCandidates();
        }
    };

    return (
        <div className="container">
            <h2>Job Candidates</h2>
            <button className="btn btn-add" style={{marginBottom: '20px'}} onClick={onAddClick}>
                Add New Candidate
            </button>
            
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Date of Birth</th>
                        <th>Contact info</th>
                        <th>Skills</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(c => (
                        <tr key={c.id}>
                            <td><strong>{c.fullName}</strong></td>
                            <td>{c.dateOfBirth}</td>
                            <td style={{fontSize: '13px'}}>
                                📞 {c.contactNumber}<br/>
                                📧 {c.email}
                            </td>
                            <td>
                                {c.skills && c.skills.map(s => (
                                    <span key={s.id} className="skill-badge">{s.name}</span>
                                ))}
                            </td>
                            <td>
                                <button className="btn btn-update" onClick={() => onEditClick(c.id)}>Update</button>
                                <button className="btn btn-delete" onClick={() => handleDelete(c.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateList;