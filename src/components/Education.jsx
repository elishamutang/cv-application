import { useState } from "react";
import ContentEditable from "react-contenteditable";

function EducationSection({ education, handleUniversityChange, className }) {
  return (
    <div className="education-section">
      <ContentEditable html={education.university} className={className} onChange={handleUniversityChange} />
      <div className="location-duration">
        <ContentEditable html={education.location} />
        <p>Graduation Date</p>
      </div>
      <div className="content">
        <ul>
          <li>Degree, Concentration. GPA [Note: GPA is optional]</li>
          <li>Thesis: [Note: Optional]</li>
          <li>Relevant Coursework: [Note: Optional. Awards and honors can also be listed here]</li>
        </ul>
      </div>
    </div>
  );
}

function Education() {
  const [defaultEducation, setEducation] = useState([
    { id: 0, university: "Example University", location: "Cambridge, MA", graduationDate: "DD/MM/YYYY" },
  ]);

  function handleUniversityChange(e, itemId) {
    setEducation(
      defaultEducation.map((item) => {
        if (item.id === itemId) {
          return { ...defaultEducation, university: e.target.value };
        } else {
          return defaultEducation;
        }
      })
    );
  }

  return (
    <div id="education">
      <div className="title">Education</div>
      {defaultEducation.map((item) => (
        <EducationSection
          key={item.id}
          education={item}
          onChange={(e) => handleUniversityChange(e, item.id)}
          className="institution"
        />
      ))}
    </div>
  );
}

export default Education;
