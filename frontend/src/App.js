import React, { useState } from 'react';
import CandidateList from './components/CandidateList';
import CandidateForm from './components/CandidateForm';
import SkillManager from './components/SkillManager'; // Uvoziš novu komponentu

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
            <header style={{backgroundColor: '#333', color: 'white', padding: '10px', textAlign: 'center', marginBottom: '20px'}}>
                <h1>HR Platform - Talent Tracker</h1>
            </header>

            <div className="container">
                {view === 'list' ? (
                    <>
                        {/* 1. Deo za upravljanje globalnim veštinama (Tačka 3 zadatka) */}
                        <SkillManager />
                        
                        {/* 2. Glavna tabela sa kandidatima i pretragom */}
                        <CandidateList onAddClick={showAddForm} onEditClick={showEditForm} />
                    </>
                ) : (
                    /* 3. Forma za Add/Update kandidata */
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