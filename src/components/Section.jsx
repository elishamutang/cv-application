import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { AddSection, RemoveSection } from "./Buttons";
import getLargestId from "../helperFuncs";

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

function Section() {
  // Initial values
  const initialSection = [
    {
      id: 0,
      title: "Experience",
      content: [
        {
          id: 0,
          organisation: "Organisation",
          position: "Position Title",
          location: "City, State",
          startDate: "Mmm YYYY",
          endDate: "Mmm YYYY",
          bulletPoints: [
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
          bulletPoints: [
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
      ],
    },
    {
      id: 1,
      title: "Projects",
      content: [
        {
          id: 0,
          organisation: "Organisation",
          position: "Position Title",
          location: "City, State",
          startDate: "Mmm YYYY",
          endDate: "Mmm YYYY",
          bulletPoints: [
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
      ],
    },
  ];

  const [section, setSection] = useState(initialSection);

  function handleSectionNameChange(e, itemId) {
    setSection(
      section.map((name) => {
        if (name.id === itemId) {
          return { ...name, title: e.target.value === "" ? name.title : e.target.value };
        } else {
          return name;
        }
      })
    );
  }

  function handleHeaderChange(e, sectionId, contentId) {
    const sectionCopy = [...section];

    const changedSection = sectionCopy.map((sec) => {
      if (sec.id === sectionId) {
        const newContent = [...sec.content];

        newContent.map((content) => {
          if (content.id === contentId) {
            content[e.currentTarget.className] = e.target.value;
          }
        });

        return { ...sec, content: newContent };
      } else {
        return sec;
      }
    });

    setSection(changedSection);
  }

  function handleContentChange(e, sectionId, contentId, pointId) {
    const sectionCopy = [...section];

    const changedContent = sectionCopy.map((sec) => {
      if (sec.id === sectionId) {
        const newContent = [...sec.content];

        newContent.map((content) => {
          if (content.id === contentId) {
            const newBulletPoints = [...content.bulletPoints];

            newBulletPoints.map((point) => {
              if (point.id === pointId) {
                point.value = e.target.value;
              }
            });

            return { ...content, bulletPoints: newBulletPoints };
          }
        });

        return { ...sec, content: newContent };
      } else {
        return sec;
      }
    });

    setSection(changedContent);
  }

  function handleClick(sectionId) {
    let sectionCopy = [...section];

    const newSection = sectionCopy.map((sec) => {
      if (sec.id === sectionId) {
        let newContent = [...sec.content];

        // If current seciton is empty, use initial values.
        if (newContent.length === 0) {
          [newContent] = initialSection
            .filter((initialSec) => {
              if (initialSec.id === sectionId) return initialSec;
            })
            .map((item) => item.content);

          newContent = [newContent[0]]; // Adds the first entry of that section in intialSection.content array.
        } else {
          // If not emtpy, add to current state
          const newEntry = newContent.length > 1 ? { ...newContent[1] } : { ...newContent[0] };
          newEntry.id = getLargestId(newContent) + 1;

          newContent.push(newEntry);
        }

        return { ...sec, content: newContent };
      } else {
        return sec;
      }
    });

    setSection(newSection);
  }

  function handleRemove(sectionId, contentId) {
    const sectionCopy = [...section];

    if (sectionCopy.length === 1) {
      setSection([]);
    } else {
      const updatedSection = sectionCopy.map((item) => {
        if (item.id === sectionId) {
          const newContent = [...item.content];

          const updatedContent = newContent.filter((content) => {
            if (content.id !== contentId) {
              return content;
            }
          });

          return { ...item, content: updatedContent };
        } else {
          return item;
        }
      });

      setSection(updatedSection);
    }
  }

  console.log(section);

  return (
    <>
      {section.map((section) => {
        return (
          <div className="section-container" id={section.title.toLowerCase()} key={section.id}>
            <div className="title">
              <input type="text" value={section.title} onChange={(e) => handleSectionNameChange(e, section.id)} />
            </div>
            {section.content.map((content) => {
              return (
                <div className="section" key={content.id}>
                  <SectionHeader
                    item={content}
                    handleHeaderChange={(e) => handleHeaderChange(e, section.id, content.id)}
                  />
                  <div className="content">
                    <ul>
                      {content.bulletPoints.map((point) => {
                        return (
                          <SectionContent
                            key={point.id}
                            content={point}
                            handleContentChange={(e) => handleContentChange(e, section.id, content.id, point.id)}
                          />
                        );
                      })}
                    </ul>
                  </div>
                  <RemoveSection handleRemove={() => handleRemove(section.id, content.id)} />
                </div>
              );
            })}
            <AddSection handleClick={() => handleClick(section.id)} sectionName={section.title.toLowerCase()} />
          </div>
        );
      })}
    </>
  );
}

export default Section;
