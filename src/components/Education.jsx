import { useState, useRef, Fragment } from "react";
import ContentEditable from "react-contenteditable";

function EducationSection() {
  const [defaultEducation, setEducation] = useState([
    { id: 0, university: "Example University", location: "Cambridge, MA", graduationDate: "DD/MM/YYYY" },
  ]);

  const university = useRef("");

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
    <div className="education-section">
      {defaultEducation.map((item) => {
        return (
          <Fragment key={item.id}>
            <ContentEditable
              innerRef={university}
              html={item.university}
              className="institution"
              onChange={(e) => handleUniversityChange(e, item.id)}
            />
          </Fragment>
        );
      })}
      <div className="location-duration">
        {/* <ContentEditable html={}/> */}
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
  return (
    <div id="education">
      <div className="title">Education</div>
      <EducationSection />
    </div>
  );
}

export default Education;
