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

    const loadAll = async () => {
        try{
            const data = await CandidateService.getAllCandidates();
            setCandidates(data);
            setNameSearch("");
            setSkillSearch("");
        } catch (err) {
            alert("Could not load candidates: " + err.message);
        }
    };

    const handleNameSearch = async () => {
        if(nameSearch.trim() === "") return;
            try{
                const data = await CandidateService.searchByName(nameSearch);
                setCandidates(data);
            } catch (err){
                alert("Search failed: " + err.message);
            }
        
    };

    const handleSkillSearch = async () => {
        if(skillSearch.trim() === "") return;
            try{
                const data = await CandidateService.searchBySkill(skillSearch);
                setCandidates(data);
            } catch (err) {
                alert("Search failed: " + err.message);
            }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this candidate?")) {
            try {
                await CandidateService.deleteCandidate(id);
                loadAll();
            } catch (err){
                alert("Delete failed: " + err.message);
            }
        }
    };

    return (
        <div className="container">
            <h2>Job candidates</h2>

            <div className="search-container">
                <div className="search-group">
                    <label>Search by Full name:</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Marko" 
                        value={nameSearch}
                        onChange={(e) => setNameSearch(e.target.value)}
                    />
                    <button className="btn btn-search" onClick={handleNameSearch}>Search</button>
                </div>

                <div className="search-group">
                    <label>Search by skill:</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Java" 
                        value={skillSearch}
                        onChange={(e) => setSkillSearch(e.target.value)}
                    />
                    <button className="btn btn-add" onClick={handleSkillSearch}>Search</button>
                </div>

               <div className="search-group">
                <div className="label-spacer"></div> 
                   <button className="btn btn-reset btn-full-width" onClick={loadAll}>Reset All</button>
              </div>
            </div>

            <button className="btn btn-add" style={{marginBottom: '20px'}} onClick={onAddClick}>
                + Add new candidate
            </button>
            
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Date of birth</th>
                            <th>Contact info</th>
                            <th>Skills</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(candidates) && candidates.map(c => (
                            <tr key={c.id}>
                                <td><strong>{c.fullName}</strong></td>
                                <td>{c.dateOfBirth}</td>
                                <td className="contact-cell">
                                    📞 {c.contactNumber}<br/>
                                    📧 {c.email}
                                </td>
                                <td>
                                    {c.skills && c.skills.map(s => (
                                        <span key={s.id} className="skill-badge">{s.name}</span>
                                    ))}
                                </td>
                                <td>
                                    <div style={{display: 'flex', gap: '5px'}}>
                                        <button className="btn btn-update" onClick={() => onEditClick(c.id)}>Update</button>
                                        <button className="btn btn-delete" onClick={() => handleDelete(c.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CandidateList;