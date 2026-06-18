import '../styles/section.css'

const GeneralInfoPreview = ({ formData, submitted }) => {
    if (!submitted) return null;

    return (
        <div className="cv-section cv-section--general">
            <div className="cv-name">{formData.name}</div>
            <div className="cv-contact">
                {formData.email && <span>{formData.email}</span>}
                {formData.email && formData.phone && <span className="cv-dot">·</span>}
                {formData.phone && <span>{formData.phone}</span>}
            </div>
            <div className="cv-divider" />
        </div>
    )
}

export default GeneralInfoPreview
