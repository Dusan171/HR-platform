import React, { useState } from 'react';
import CandidateList from './components/CandidateList';
import CandidateForm from './components/CandidateForm';

function App() {
    const [view, setView] = useState('list'); // 'list', 'add', 'edit'
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);

    const showAddForm = () => {
        setSelectedCandidateId(null);
        setView('add');
    };

    const showEditForm = (id) => {
        setSelectedCandidateId(id);
        setView('edit');
    };

    return (
        <div>
            <header style={{backgroundColor: '#333', color: 'white', padding: '10px', textAlign: 'center'}}>
                <h1>HR Platform</h1>
            </header>

            {view === 'list' ? (
                <CandidateList onAddClick={showAddForm} onEditClick={showEditForm} />
            ) : (
                <CandidateForm 
                    candidateId={selectedCandidateId} 
                    onSave={() => setView('list')} 
                    onCancel={() => setView('list')} 
                />
            )}
        </div>
    );
}

export default App;