const API_BASE_URL = "http://localhost:8080/api/candidates";

const CandidateService = {
    getAllCandidates: async () => {
        const response = await fetch(API_BASE_URL);
        return await response.json();
    },
     getCandidateById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        return await response.json();
    },
    createCandidate: async (candidate) => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(candidate)
        });
        return await response.json();
    },
    updateCandidate: async (id, candidate) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(candidate)
        });
        return await response.json();
    },
    deleteCandidate: async (id) => {
        await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    },
    searchByName: async (name) => {
        const response = await fetch(`${API_BASE_URL}/search?name=${encodeURIComponent(name)}`);
        return await response.json();
    },
    searchBySkill: async (skillName) => {
    const response = await fetch(`${API_BASE_URL}/search/skill?skill=${encodeURIComponent(skillName)}`);
    return await response.json();
}
};

export default CandidateService;