import '../styles/section.css'

const ExperiencePreview = ({ formData, submitted }) => {
    if (!submitted) return null;

    return (
        <div className="cv-section">
            <div className="cv-section-title">Experience</div>
            <div className="cv-entry">
                <div className="cv-entry-header">
                    <span className="cv-entry-title">{formData.positionTitle}</span>
                    <span className="cv-entry-date">{formData.startDate} — {formData.endDate}</span>
                </div>
                <div className="cv-entry-subtitle">{formData.companyName}</div>
                <div className="cv-entry-body">{formData.responsibilities}</div>
            </div>
        </div>
    )
}

export default ExperiencePreview