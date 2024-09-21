import { useState } from "react";
import ContentEditable from "react-contenteditable";

function EducationSection({ education, educationList, handleChange }) {
  const ShowAddBtn = () => {
    const lastIndex = education.id + 1;

    if (lastIndex === educationList.length) {
      return <button className="addMore">Add more</button>;
    }
  };

  return (
    <div className="education-section">
      <ContentEditable html={education.institution} className="institution" onChange={handleChange} />
      <div className="location-graduationDate">
        <ContentEditable html={education.location} className="location" onChange={handleChange} />
        <ContentEditable html={education.graduationDate} className="graduationDate" onChange={handleChange} />
      </div>
      <div className="content">
        <ul>
          <li>Degree, Concentration. GPA [Note: GPA is optional]</li>
          <li>Thesis: [Note: Optional]</li>
          <li>Relevant Coursework: [Note: Optional. Awards and honors can also be listed here]</li>
        </ul>
      </div>
      <ShowAddBtn />
    </div>
  );
}

function Education() {
  const [defaultEducation, setEducation] = useState([
    { id: 0, institution: "Example University", location: "Cambridge, MA", graduationDate: "Mmm YYYY" },
  ]);

  function handleChange(e, itemId) {
    setEducation(
      defaultEducation.map((item) => {
        if (item.id === itemId) {
          return { ...item, [e.currentTarget.className]: e.target.value };
        } else {
          return item;
        }
      })
    );
  }

  console.log(defaultEducation);

  return (
    <div id="education">
      <div className="title">Education</div>
      {defaultEducation.map((item) => (
        <EducationSection
          education={item}
          educationList={defaultEducation}
          handleChange={(e) => handleChange(e, item.id)}
          key={item.id}
        />
      ))}
    </div>
  );
}

export default Education;
