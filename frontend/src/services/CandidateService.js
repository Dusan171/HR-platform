const API_BASE_URL = "http://localhost:8080/api/candidates";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Something went wrong with the server.");
    }
    if (response.status === 204) return null;
    return await response.json();
}

const CandidateService = {
    getAllCandidates: async () => {
        const response = await fetch(API_BASE_URL);
        return handleResponse(response);
    },
     getCandidateById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        return handleResponse(response);
    },
    createCandidate: async (candidate) => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(candidate)
        });
        return handleResponse(response);
    },
    updateCandidate: async (id, candidate) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(candidate)
        });
        return handleResponse(response);
    },
    deleteCandidate: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
        return handleResponse(response);
    },
    searchByName: async (name) => {
        const response = await fetch(`${API_BASE_URL}/search?name=${encodeURIComponent(name)}`);
        return handleResponse(response);
    },
    searchBySkill: async (skillName) => {
    const response = await fetch(`${API_BASE_URL}/search/skill?skill=${encodeURIComponent(skillName)}`);
    return  handleResponse(response);
}
};

export default CandidateService;