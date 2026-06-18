import '../styles/section.css'

const EducationPreview = ({ formData, submitted }) => {
    if (!submitted) return null;

    return (
        <div className="cv-section">
            <div className="cv-section-title">Education</div>
            <div className="cv-entry">
                <div className="cv-entry-header">
                    <span className="cv-entry-title">{formData.schoolName}</span>
                    <span className="cv-entry-date">{formData.dateOfStudy}</span>
                </div>
                <div className="cv-entry-subtitle">{formData.titleOfStudy}</div>
            </div>
        </div>
    )
}

export default EducationPreview