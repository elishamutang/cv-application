import { useState } from "react";
import ContentEditable from "react-contenteditable";

function EducationContent({ content, handleContentChange }) {
  return (
    <li>
      <ContentEditable html={content} onChange={handleContentChange} />
    </li>
  );
}

function ShowAddBtn({ education, educationList }) {
  const lastIndex = education.id + 1;

  if (lastIndex === educationList.length) {
    return <button className="addMore">Add education section</button>;
  }
}

function Education() {
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
    {
      id: 1,
      institution: "Goofy Goobers",
      location: "Austin, TX",
      graduationDate: "Mmm YYYY",
      content: [
        { id: 0, value: "Testing" },
        { id: 1, value: "Testing 123" },
      ],
    },
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
          <ShowAddBtn education={item} educationList={defaultEducation} />
        </div>
      ))}
    </div>
  );
}

export default Education;
