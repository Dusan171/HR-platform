import React, { useState } from 'react';
import CandidateList from './components/CandidateList';
import CandidateForm from './components/CandidateForm';
import SkillManager from './components/SkillManager'; 

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
            <header className="main-header">
                <h1>HR Platform</h1>
            </header>

            <div className="container">
                {view === 'list' ? (
                    <>
                        <SkillManager />
                        <CandidateList onAddClick={showAddForm} onEditClick={showEditForm} />
                    </>
                ) : (
                    <CandidateForm 
                        candidateId={selectedCandidateId} 
                        onSave={() => setView('list')} 
                        onCancel={() => setView('list')} 
                    />
                )}
            </div>
        </div>
    );
}

export default App;