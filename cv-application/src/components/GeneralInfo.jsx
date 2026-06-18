import { useState } from 'react'
import '../styles/section.css'

const GeneralInfo = ({ formData, setFormData, setSubmitted }) => {
    const [editState, toggleEdit] = useState(false);

    function retrieveFormData(e) {
        e.preventDefault()
        toggleEdit(false)
        setSubmitted(true);
    }

    return (
        <div className="section">
            <span className="section-label">General Info</span>
            {editState && (
                <form onSubmit={retrieveFormData}>
                    <input
                        type='text'
                        required
                        placeholder='Enter name here...'
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <input
                        type='email'
                        placeholder='Enter email here...'
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <input
                        type='tel'
                        placeholder='Enter phone number here...'
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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

export default GeneralInfo