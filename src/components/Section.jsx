import { useState } from "react";
import ContentEditable from "react-contenteditable";

function SectionContent({ content, handleContentChange }) {
  return (
    <li>
      <ContentEditable html={content.value} onChange={handleContentChange} />
    </li>
  );
}

function SectionHeader({ item, handleHeaderChange }) {
  return (
    <>
      <div className="organisation-position">
        <ContentEditable html={item.organisation} onChange={handleHeaderChange} className="organisation" />
        <ContentEditable html={item.position} onChange={handleHeaderChange} className="position" />
      </div>
      <div className="location-duration">
        <ContentEditable html={item.location} onChange={handleHeaderChange} className="location" />
        <div className="duration">
          <ContentEditable html={item.startDate} onChange={handleHeaderChange} className="startDate" />
          -
          <ContentEditable html={item.endDate} onChange={handleHeaderChange} className="endDate" />
        </div>
      </div>
    </>
  );
}

function AddMoreBtn() {
  return <button className="addMore">Add experience</button>;
}

function Section() {
  const [sectionName, setSectionName] = useState("Experience");
  const [defaultExperience, setExperience] = useState([
    {
      id: 0,
      organisation: "Organisation",
      position: "Position Title",
      location: "City, State",
      startDate: "Mmm YYYY",
      endDate: "Mmm YYYY",
      content: [
        {
          id: 0,
          value:
            "Beginning with most recent position, describe your experience, skills, and resulting outcomes in bullet form.",
        },
        {
          id: 1,
          value:
            "Begin each line with an action verb and include details that will help the reader understand your accomplishments, skills, knowledge, abilities, or achievements.",
        },
        {
          id: 2,
          value: "Quantify where possible.",
        },
        {
          id: 3,
          value: "Do not use personal pronouns; each line should be a phrase rather than a full sentence.",
        },
      ],
    },
    {
      id: 1,
      organisation: "Organisation",
      position: "Position Title",
      location: "City, State",
      startDate: "Mmm YYYY",
      endDate: "Mmm YYYY",
      content: [
        {
          id: 0,
          value:
            "With next-most recent position, describe your experience, skills, and resulting outcomes in bullet form.",
        },
        {
          id: 1,
          value:
            "Begin each line with an action verb and include details that will help the reader understand your accomplishments, skills, knowledge, abilities, or achievements.",
        },
        {
          id: 2,
          value: "Quantify where possible.",
        },
        {
          id: 3,
          value: "Do not use personal pronouns; each line should be a phrase rather than a full sentence.",
        },
      ],
    },
  ]);

  function handleSectionNameChange(e) {
    setSectionName(e.target.value);

    if (e.target.value === "") {
      setSectionName("Experience");
    }
  }

  function handleHeaderChange(e, itemId) {
    setExperience(
      defaultExperience.map((item) => {
        if (item.id === itemId) {
          return { ...item, [e.currentTarget.className]: e.target.value };
        } else {
          return item;
        }
      })
    );
  }

  function handleContentChange(e, contentId, itemId) {
    const changedExperience = [...defaultExperience];

    const changedContent = changedExperience.map((item) => {
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

    setExperience(changedContent);
  }

  // console.log(defaultExperience);

  return (
    <div className="section-container" id="experience">
      <div className="title">
        <input type="text" value={sectionName} onChange={handleSectionNameChange} />
      </div>
      {defaultExperience.map((item) => {
        return (
          <div className="section" key={item.id}>
            <SectionHeader item={item} handleHeaderChange={handleHeaderChange} />
            <div className="content">
              <ul>
                {item.content.map((content) => {
                  return (
                    <SectionContent
                      key={content.id}
                      content={content}
                      handleContentChange={(e) => handleContentChange(e, content.id, item.id)}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
      <AddMoreBtn />
    </div>
  );
}

export default Section;
