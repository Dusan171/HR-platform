import React, { useState, useEffect } from 'react';
import CandidateService from '../services/CandidateService';
import '../App.css';

const CandidateList = ({ onAddClick, onEditClick }) => {
    const [candidates, setCandidates] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [skillSearch, setSkillSearch] = useState("");

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = () => {
        CandidateService.getAllCandidates().then(data => {
            setCandidates(data);
            setNameSearch("");
            setSkillSearch("");
        });
    };

    const handleNameSearch = async () => {
        if(nameSearch.trim() === "") return;
        const data = await CandidateService.searchByName(nameSearch);
        setCandidates(data);
    };

    const handleSkillSearch = async () => {
        if(skillSearch.trim() === "") return;
        const data = await CandidateService.searchBySkill(skillSearch);
        setCandidates(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await CandidateService.deleteCandidate(id);
            loadAll();
        }
    };

    return (
        <div className="container">
            <h2>Job Candidates</h2>

            <div className="search-container">
                <div className="search-group">
                    <label>Search by Name:</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Marko" 
                        value={nameSearch}
                        onChange={(e) => setNameSearch(e.target.value)}
                    />
                    <button className="btn btn-search" style={{marginTop: '5px'}} onClick={handleNameSearch}>Search Name</button>
                </div>

                <div className="search-group">
                    <label>Search by Skill:</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Java" 
                        value={skillSearch}
                        onChange={(e) => setSkillSearch(e.target.value)}
                    />
                    <button className="btn btn-search" style={{marginTop: '5px', backgroundColor: '#28a745'}} onClick={handleSkillSearch}>Search Skill</button>
                </div>

                <button className="btn btn-reset" onClick={loadAll}>Reset All</button>
            </div>

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
                    {Array.isArray(candidates) &&candidates.map(c => (
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