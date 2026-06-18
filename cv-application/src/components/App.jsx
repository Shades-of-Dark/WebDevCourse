import { useState } from 'react'
import '../styles/App.css'
import GeneralInfo from './GeneralInfo'
import Education from './Education'
import Experience from './Experience'
import GeneralInfoPreview from './GeneralInfoPreview'
import EducationPreview from './EducationPreview'
import ExperiencePreview from './ExperiencePreview'

function App() {
  const today = new Date().toLocaleDateString('en-CA');

  const [generalData, setGeneralData] = useState({ name: '', email: '', phone: '' });
  const [generalSubmitted, setGeneralSubmitted] = useState(false);

  const [educationData, setEducationData] = useState({ schoolName: '', titleOfStudy: '', dateOfStudy: today });
  const [educationSubmitted, setEducationSubmitted] = useState(false);

  const [experienceData, setExperienceData] = useState({ companyName: '', positionTitle: '', responsibilities: '', startDate: today, endDate: today });
  const [experienceSubmitted, setExperienceSubmitted] = useState(false);

  return (
    <div className="app-layout">

      <div className="editor-panel">
        <span className="editor-title">CV Builder</span>
        <GeneralInfo
          formData={generalData}
          setFormData={setGeneralData}
          setSubmitted={setGeneralSubmitted}
        />
        <Education
          formData={educationData}
          setFormData={setEducationData}
          setSubmitted={setEducationSubmitted}
        />
        <Experience
          formData={experienceData}
          setFormData={setExperienceData}
          setSubmitted={setExperienceSubmitted}
        />
      </div>

      <div className="cv-panel">
        {!generalSubmitted && !educationSubmitted && !experienceSubmitted && (
          <p className="cv-empty">Fill out a section on the left — your CV preview will appear here.</p>
        )}
        <GeneralInfoPreview formData={generalData} submitted={generalSubmitted} />
        <EducationPreview formData={educationData} submitted={educationSubmitted} />
        <ExperiencePreview formData={experienceData} submitted={experienceSubmitted} />
      </div>

    </div>
  );
}

export default App