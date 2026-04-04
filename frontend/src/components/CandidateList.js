import React, { useState, useEffect } from 'react';
import CandidateService from '../services/CandidateService';
import '../App.css';

const CandidateList = ({ onAddClick, onEditClick }) => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        CandidateService.getAllCandidates().then(data => setCandidates(data));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await CandidateService.deleteCandidate(id);
            setCandidates(candidates.filter(c => c.id !== id));
        }
    };

    return (
        <div className="container">
            <h2>Job Candidates</h2>
            <button className="btn btn-add" onClick={onAddClick}>Add New Candidate</button>
            
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Skills</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(c => (
                        <tr key={c.id}>
                            <td>{c.fullName}</td>
                            <td>{c.email}</td>
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