const API_BASE_URL = "http://localhost:8080/api/skills";

const handleResponse = async (response) => {
    if(!response.ok){
        const errorData = await response.json().catch(()=>({}));
        throw new Error(errorData.message || "Failed to manage skills.");
    }
    if (response.status === 204) return null; 
    return await response.json();
};
const SkillService = {
    getAllSkills: async () => {
        const response = await fetch(API_BASE_URL);
        return handleResponse(response);
    },
    createSkill: async (skillName) => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: skillName })
        });
        return handleResponse(response);
    }
};

export default SkillService;