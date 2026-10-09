import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const role = localStorage.getItem('role') || 'CITIZEN';
  const [grievances, setGrievances] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newGrievance, setNewGrievance] = useState({ title: '', description: '' });

  useEffect(() => {
    // Mocking API fetch based on role
    // Admin: GET /api/admin/grievances
    // Officer: GET /api/officer/grievances
    // Citizen: GET /api/citizen/grievances
    
    setGrievances([
      { id: 1, title: 'Pothole on Main St', description: 'Deep pothole causing traffic issues', status: 'PENDING', createdBy: 'john@example.com' },
      { id: 2, title: 'Streetlight Broken', description: 'Streetlight at 5th avenue is not working', status: 'RESOLVED', createdBy: 'jane@example.com' },
    ]);
  }, [role]);

  const handleUpdateStatus = (id, newStatus) => {
    // Officer: PUT /api/officer/grievances/{id}/status
    setGrievances(prev => prev.map(g => g.id === id ? { ...g, status: newStatus } : g));
  };

  const handleAssignOfficer = (id) => {
    // Admin: PUT /api/admin/grievances/{id}/assign
    alert(`Assigning officer to grievance ${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Citizen: POST /api/citizen/grievances
    const newEntry = {
      id: Date.now(),
      title: newGrievance.title,
      description: newGrievance.description,
      status: 'PENDING',
      createdBy: 'you'
    };
    setGrievances([newEntry, ...grievances]);
    setShowForm(false);
    setNewGrievance({ title: '', description: '' });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2>{role} Dashboard</h2>
        {role === 'CITIZEN' && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <PlusCircle size={18} /> {showForm ? 'Cancel' : 'New Grievance'}
          </button>
        )}
      </div>

      {showForm && role === 'CITIZEN' && (
        <div className="card mb-8 animate-fade-in">
          <h3 className="mb-4">Submit New Grievance</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" className="form-input" required value={newGrievance.title} onChange={e => setNewGrievance({...newGrievance, title: e.target.value})} placeholder="E.g. Broken Pipe" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" rows="3" required value={newGrievance.description} onChange={e => setNewGrievance({...newGrievance, description: e.target.value})} placeholder="Describe the issue in detail..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2">
        {grievances.map(g => (
          <div key={g.id} className="card">
            <div className="flex justify-between items-center mb-2">
              <h3>{g.title}</h3>
              <span className={`badge ${g.status === 'PENDING' ? 'badge-pending' : 'badge-resolved'}`}>
                {g.status}
              </span>
            </div>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{g.description}</p>
            <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>By: {g.createdBy}</span>
              
              <div className="flex gap-2">
                {role === 'OFFICER' && g.status === 'PENDING' && (
                  <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }} onClick={() => handleUpdateStatus(g.id, 'RESOLVED')}>
                    <CheckCircle size={14} /> Resolve
                  </button>
                )}
                {role === 'ADMIN' && (
                  <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }} onClick={() => handleAssignOfficer(g.id)}>
                    Assign Officer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
