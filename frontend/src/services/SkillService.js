const API_BASE_URL = "http://localhost:8080/api/skills";

const SkillService = {
    getAllSkills: async () => {
        const response = await fetch(API_BASE_URL);
        return await response.json();
    },
    createSkill: async (skillName) => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: skillName })
        });
        return await response.json();
    }
};

export default SkillService;