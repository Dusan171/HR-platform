import React, { useState } from 'react';
import SkillService from '../services/SkillService';

const SkillManager = () => {
    const [newSkill, setNewSkill] = useState("");

    const handleAddSkill = async () => {
        if (newSkill.trim() !== "") {
            await SkillService.createSkill(newSkill);
            alert("Skill added to catalog!");
            setNewSkill("");
        }
    };

    return (
        <div className="search-container" style={{backgroundColor: '#e9ecef', marginBottom: '10px'}}>
            <div className="search-group">
                <label>Add New Global Skill:</label>
                <div style={{display: 'flex', gap: '10px'}}>
                    <input 
                        type="text" 
                        placeholder="e.g. Docker, AWS..." 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <button className="btn btn-add" onClick={handleAddSkill}>Add to System</button>
                </div>
            </div>
        </div>
    );
};

export default SkillManager;