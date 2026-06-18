import { useState } from 'react'
import '../styles/section.css'

const Experience = ({ formData, setFormData, setSubmitted }) => {
    const [editState, toggleEdit] = useState(false);

    function retrieveFormData(e) {
        e.preventDefault()
        toggleEdit(false)
        setSubmitted(true);
    }

    return (
        <div className="section">
            <span className="section-label">Experience</span>
            {editState && (
                <form onSubmit={retrieveFormData}>
                    <input
                        type='text'
                        required
                        placeholder='Enter company name here...'
                        value={formData.companyName}
                        onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    />
                    <input
                        type='text'
                        required
                        placeholder='Enter position title here...'
                        value={formData.positionTitle}
                        onChange={e => setFormData(prev => ({ ...prev, positionTitle: e.target.value }))}
                    />
                    <input
                        type='text'
                        required
                        placeholder='Enter responsibilities here...'
                        value={formData.responsibilities}
                        onChange={e => setFormData(prev => ({ ...prev, responsibilities: e.target.value }))}
                    />
                    <label className="date-label">From</label>
                    <input
                        type='date'
                        required
                        value={formData.startDate}
                        onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                    <label className="date-label">Until</label>
                    <input
                        type='date'
                        required
                        value={formData.endDate}
                        onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                    <button className="btn-submit">Save</button>
                </form>
            )}
            <button className="btn-edit" onClick={() => toggleEdit(prev => !prev)}>
                {editState ? 'Cancel' : 'Edit'}
            </button>
        </div>
    )
}

export default Experience