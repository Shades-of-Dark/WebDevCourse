import { useState } from 'react'
import '../styles/section.css'

const Education = ({ formData, setFormData, setSubmitted }) => {
    const [editState, toggleEdit] = useState(false);

    function retrieveFormData(e) {
        e.preventDefault()
        toggleEdit(false)
        setSubmitted(true);
    }

    return (
        <div className="section">
            <span className="section-label">Education</span>
            {editState && (
                <form onSubmit={retrieveFormData}>
                    <input
                        type='text'
                        required
                        placeholder='Enter school name here...'
                        value={formData.schoolName}
                        onChange={e => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
                    />
                    <input
                        type='text'
                        required
                        placeholder='Enter title of study here...'
                        value={formData.titleOfStudy}
                        onChange={e => setFormData(prev => ({ ...prev, titleOfStudy: e.target.value }))}
                    />
                    <input
                        type='date'
                        required
                        value={formData.dateOfStudy}
                        onChange={e => setFormData(prev => ({ ...prev, dateOfStudy: e.target.value }))}
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

export default Education