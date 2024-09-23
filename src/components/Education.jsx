import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { AddSection, RemoveSection } from "./Buttons";

function EducationContent({ content, handleContentChange }) {
  return (
    <li>
      <ContentEditable html={content} onChange={handleContentChange} />
    </li>
  );
}

function Education() {
  // Initial values
  const initialEducation = [
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
  ];

  const [education, setEducation] = useState(initialEducation);

  // Handle header of each education entry.
  function handleChange(e, itemId) {
    setEducation(
      education.map((item) => {
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
    const newEducation = [...education];

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
    let newEducation;

    if (education.length === 0) {
      newEducation = [...initialEducation];
    } else {
      newEducation = [...education];

      const newEntry = { ...newEducation[0] };

      const getIds = newEducation.map((item) => {
        return item.id;
      });

      const largestIdVal = Math.max(...getIds);

      newEntry.id = largestIdVal + 1;

      newEducation.push(newEntry);
    }

    setEducation(newEducation);
  }

  // Remove education section.
  function handleRemove(itemId) {
    const newEducation = [...education];

    if (newEducation.length === 1) {
      setEducation([]);
    } else {
      const updatedEducation = newEducation.filter((item) => {
        if (item.id !== itemId) {
          return item;
        }
      });

      setEducation(updatedEducation);
    }

    // console.log(newEducation);
  }

  // console.log(education);

  return (
    <div id="education">
      <div className="title">Education</div>
      {education.map((item) => (
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
          <RemoveSection handleRemove={() => handleRemove(item.id)} />
        </div>
      ))}
      <AddSection sectionName="education" handleClick={handleClick} />
    </div>
  );
}

export default Education;
