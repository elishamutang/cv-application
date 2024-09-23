import { useState } from "react";
import ContentEditable from "react-contenteditable";

function EducationContent({ content, handleContentChange }) {
  return (
    <li>
      <ContentEditable html={content} onChange={handleContentChange} />
    </li>
  );
}

function AddMoreBtn({ handleClick }) {
  return (
    <button onClick={handleClick} className="addMore">
      Add education
    </button>
  );
}

function Education() {
  // Initial values
  const [defaultEducation, setEducation] = useState([
    {
      id: 0,
      institution: "Example University",
      location: "Cambridge, MA",
      graduationDate: "Mmm YYYY",
      content: [
        { id: 0, value: "Degree, Concentration. GPA [Note: GPA is optional]" },
        { id: 1, value: "Thesis: [Note: Optional]" },
        { id: 2, value: "Relevant Coursework: [Note: Optional. Awards and honors can also be listed here]" },
      ],
    },
  ]);

  // Handle header of each education entry.
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

  // Handle content change within education section.
  function handleContentChange(e, contentId, itemId) {
    const newEducation = [...defaultEducation];

    const newContent = newEducation.map((item) => {
      if (item.id === itemId) {
        const newContent = [...item.content];

        newContent.map((content) => {
          if (content.id === contentId) {
            content.value = e.target.value;
          }
        });

        return { ...item, content: newContent };
      } else {
        return item;
      }
    });

    setEducation(newContent);
  }

  // Add more to education section.
  function handleClick() {
    const newEducation = [...defaultEducation];

    const newEntry = { ...newEducation[0] };
    newEntry.id = newEducation.length;

    newEducation.push(newEntry);

    setEducation(newEducation);
  }

  // console.log(defaultEducation);

  return (
    <div id="education">
      <div className="title">Education</div>
      {defaultEducation.map((item) => (
        <div key={item.id} className="education-section">
          <ContentEditable html={item.institution} className="institution" onChange={(e) => handleChange(e, item.id)} />
          <div className="location-graduationDate">
            <ContentEditable html={item.location} className="location" onChange={(e) => handleChange(e, item.id)} />
            <ContentEditable
              html={item.graduationDate}
              className="graduationDate"
              onChange={(e) => handleChange(e, item.id)}
            />
          </div>
          <div className="content">
            <ul>
              {item.content.map((content) => {
                return (
                  <EducationContent
                    key={content.id}
                    content={content.value}
                    handleContentChange={(e) => handleContentChange(e, content.id, item.id)}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      ))}
      <AddMoreBtn handleClick={handleClick} />
    </div>
  );
}

export default Education;
