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
         <div className="skill-manager-box">
            <div className="search-group">
                <label>Add new skill to system catalog:</label>
                <div className="input-with-button">
                    <input 
                        type="text" 
                        placeholder="e.g. Docker, AWS..." 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <button className="btn btn-add" onClick={handleAddSkill}>Add to system</button>
                </div>
            </div>
        </div>
    );
};

export default SkillManager;