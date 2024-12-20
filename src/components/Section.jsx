import { useState, forwardRef, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { AddSection, AddSectionContent, RemoveSection, RemoveSectionContent, AddMorePoints } from "./Buttons";
import getLargestId from "../helperFuncs";

const BulletPoint = forwardRef(({ content, handleContentChange, handleBlur, editMode }, ref) => {
  return (
    <li>
      {editMode ? (
        <ContentEditable html={content.value} onChange={handleContentChange} onBlur={handleBlur} ref={ref} />
      ) : (
        <div>{content.value}</div>
      )}
    </li>
  );
});

BulletPoint.displayName = "BulletPoint";

function SectionHeader({ item, handleHeaderChange, editMode }) {
  return (
    <>
      <div className="organisation-position">
        {editMode ? (
          <>
            <ContentEditable html={item.organisation} onChange={handleHeaderChange} className="organisation" />
            <ContentEditable html={item.position} onChange={handleHeaderChange} className="position" />
          </>
        ) : (
          <>
            <div className="organisation">{item.organisation}</div>
            <div className="position">{item.position}</div>
          </>
        )}
      </div>
      <div className="location-duration">
        {editMode ? (
          <ContentEditable html={item.location} onChange={handleHeaderChange} className="location" />
        ) : (
          <div className="location">{item.location}</div>
        )}
        <div className="duration">
          {editMode ? (
            <>
              <ContentEditable html={item.startDate} onChange={handleHeaderChange} className="startDate" />
              -
              <ContentEditable html={item.endDate} onChange={handleHeaderChange} className="endDate" />
            </>
          ) : (
            <>
              <div className="startDate">{item.startDate}</div>-<div className="endDate">{item.endDate}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Section({ moveSectionBtns, editMode }) {
  // Initial values
  const initialSection = [
    {
      id: 0,
      title: "Experience",
      heading: "Experience",
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
          buttonDisable: false,
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
          buttonDisable: false,
        },
      ],
    },
    // {
    //   id: 1,
    //   title: "Projects",
    //   content: [
    //     {
    //       id: 0,
    //       organisation: "Organisation",
    //       position: "Position Title",
    //       location: "City, State",
    //       startDate: "Mmm YYYY",
    //       endDate: "Mmm YYYY",
    //       bulletPoints: [
    //         {
    //           id: 0,
    //           value:
    //             "Beginning with most recent position, describe your experience, skills, and resulting outcomes in bullet form.",
    //         },
    //         {
    //           id: 1,
    //           value:
    //             "Begin each line with an action verb and include details that will help the reader understand your accomplishments, skills, knowledge, abilities, or achievements.",
    //         },
    //         {
    //           id: 2,
    //           value: "Quantify where possible.",
    //         },
    //         {
    //           id: 3,
    //           value: "Do not use personal pronouns; each line should be a phrase rather than a full sentence.",
    //         },
    //       ],
    //       buttonDisable: false,
    //     },
    //   ],
    // },
  ];

  const [section, setSection] = useState(() => {
    const localCopy = localStorage.getItem("sections");
    return localCopy ? JSON.parse(localCopy) : initialSection;
  });

  useEffect(() => {
    // Update sections
    localStorage.setItem("sections", JSON.stringify(section));

    // Update heading in order obj.
    const [updatedHeading] = JSON.parse(localStorage.getItem("order"))
      .map((item) => {
        const newHeadings = section
          .map((sec) => {
            if (sec.title === item.title) {
              return { id: sec.id, value: sec.heading };
            }
          })
          .filter((arr) => {
            return arr !== undefined;
          });

        return newHeadings;
      })
      .filter((arr) => arr.length !== 0);

    const newOrder = JSON.parse(localStorage.getItem("order"));

    newOrder.forEach((item) => {
      if (item.title === "Experience") {
        item.heading = updatedHeading;
      }
    });

    localStorage.setItem("order", JSON.stringify(newOrder));
  }, [section]);

  function handleSectionNameChange(e, itemId) {
    setSection(
      section.map((name) => {
        if (name.id === itemId) {
          return { ...name, heading: e.target.value === "" ? name.heading : e.target.value };
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

    // Alternatively, create a DEEP copy of the object and mutate that copy.
    const changedContent = sectionCopy.map((sec) => {
      if (sec.id === sectionId) {
        const newContent = [...sec.content];

        const updatedContent = newContent.map((content) => {
          if (content.id === contentId) {
            const bulletPointsArrCopy = [...content.bulletPoints];

            const newBulletPoints = bulletPointsArrCopy.map((point) => {
              if (point.id === pointId) {
                return { ...point, value: e.target.value };
              } else {
                return point;
              }
            });

            // Enable button after adding some text for new bullet point.
            return { ...content, bulletPoints: newBulletPoints, buttonDisable: false };
          } else {
            return content;
          }
        });

        return { ...sec, content: updatedContent };
      } else {
        return sec;
      }
    });

    setSection(changedContent);
  }

  // Remove empty bulletpoint.
  function handleBlur(e, sectionId, contentId, pointId) {
    if (e.target.textContent === "") {
      // Here we update the state that's in queue from the first call in handleContentChange.
      setSection((prevSection) => {
        const updatedSection = prevSection.map((sec) => {
          if (sec.id === sectionId) {
            const updatedContent = sec.content.map((content) => {
              if (content.id === contentId) {
                const updatedBulletPoints = content.bulletPoints.filter((point) => {
                  if (point.id !== pointId) {
                    return point;
                  }
                });

                return { ...content, bulletPoints: updatedBulletPoints, buttonDisable: false };
              } else {
                return content;
              }
            });

            return { ...sec, content: updatedContent };
          } else {
            return sec;
          }
        });

        return updatedSection;
      });
    }
  }

  function handleAddMoreSectionContent(sectionId) {
    let sectionCopy = [...section];

    const newSection = sectionCopy.map((sec) => {
      if (sec.id === sectionId) {
        let newContent = [...sec.content];

        // If current section is empty, use initial values.
        if (newContent.length === 0) {
          newContent = [...initialSection[0].content].slice(0, 1); // Adds the first entry of that section in intialSection.content array.
        } else {
          // If not emtpy, add to current state
          const newEntry = newContent.length > 1 ? { ...newContent[1] } : { ...newContent[0] };
          newEntry.id = getLargestId(newContent) + 1;

          newContent = [...sec.content, newEntry];
        }

        return { ...sec, content: newContent };
      } else {
        return sec;
      }
    });

    setSection(newSection);
  }

  function handleRemoveSectionContent(sectionId, contentId) {
    const sectionCopy = [...section];

    const updatedSection = sectionCopy.map((item) => {
      if (item.id === sectionId) {
        const newContent = [...item.content];

        if (newContent.length === 1) {
          return { ...item, content: [] };
        } else {
          const updatedContent = newContent.filter((content) => {
            if (content.id !== contentId) {
              return content;
            }
          });

          return { ...item, content: updatedContent };
        }
      } else {
        return item;
      }
    });

    setSection(updatedSection);
  }

  function handleRemoveSection(sectionId) {
    const sectionCopy = [...section];

    const newSection = sectionCopy.filter((sec) => {
      if (sec.id !== sectionId) return sec;
    });

    setSection(newSection);
  }

  function handleAddNewSection() {
    const sectionCopy = [...section];

    const latestSection = { ...initialSection[initialSection.length - 1] };
    const latestId = getLargestId(sectionCopy);

    latestSection.id = latestId + 1;

    sectionCopy.push(latestSection);
    setSection(sectionCopy);
  }

  function addMoreBulletPoints(bulletPointsArr, contentId, sectionId) {
    const largestId = bulletPointsArr.length === 0 ? -1 : getLargestId(bulletPointsArr);

    const sectionCopy = [...section];

    const newBulletPoint = { id: largestId + 1, value: "" };
    const bulletPointsArrCopy = [...bulletPointsArr, newBulletPoint];

    const updatedSectionObj = sectionCopy.map((sec) => {
      if (sec.id === sectionId) {
        const updatedContent = sec.content.map((content) => {
          if (content.id === contentId) {
            // Add new bullet point and disable corresponding button.
            return { ...content, bulletPoints: bulletPointsArrCopy, buttonDisable: true };
          } else {
            return content;
          }
        });

        return { ...sec, content: updatedContent };
      } else {
        return sec;
      }
    });

    setSection(updatedSectionObj);
  }

  function focusOnElement(element) {
    // Focus on newly added bullet point.
    if (element) {
      element.el.current.focus();
    }
  }

  return (
    <>
      {section.map((sec) => {
        return (
          <div className="section-container" key={sec.id}>
            <div className="title">
              {editMode ? (
                <input type="text" value={sec.heading} onChange={(e) => handleSectionNameChange(e, sec.id)} />
              ) : (
                `${sec.heading}`
              )}
            </div>
            {editMode && (
              <div className="move-section">
                {/* Only render moveSectionBtns to first element in section array. */}
                {sec.id === 0 && moveSectionBtns}
                {/* Append the removeSection button to ADDITIONAL sections only. First section can never be removed. */}
                {sec.id !== 0 && <RemoveSection onClick={() => handleRemoveSection(sec.id)} />}
              </div>
            )}
            {/* Content under a specific section (e.g Experience will contain 2 experiences) */}
            {sec.content.map((content) => {
              return (
                <div className="section" key={content.id}>
                  <SectionHeader
                    editMode={editMode}
                    item={content}
                    handleHeaderChange={(e) => handleHeaderChange(e, sec.id, content.id)}
                  />
                  <div className="content">
                    <ul>
                      {/* Bullet-points */}
                      {content.bulletPoints.map((point) => {
                        return (
                          <BulletPoint
                            key={point.id}
                            content={point}
                            ref={(element) => point.value === "" && focusOnElement(element)}
                            bulletPointsArr={content.bulletPoints}
                            handleContentChange={(e) => handleContentChange(e, sec.id, content.id, point.id)}
                            handleBlur={(e) => handleBlur(e, sec.id, content.id, point.id)}
                            editMode={editMode}
                          />
                        );
                      })}
                      {editMode && (
                        <AddMorePoints
                          // On-click to add additional bullet point and disable button if no text input.
                          onClick={() => addMoreBulletPoints(content.bulletPoints, content.id, sec.id)}
                          buttonDisable={content.buttonDisable}
                        />
                      )}
                    </ul>
                  </div>
                  {editMode && (
                    <RemoveSectionContent
                      handleRemoveSectionContent={() => handleRemoveSectionContent(sec.id, content.id)}
                    />
                  )}
                </div>
              );
            })}
            {editMode && <AddSectionContent handleAddMoreSectionContent={() => handleAddMoreSectionContent(sec.id)} />}
            {/* Adds the 'addNewSection' button to the last element in the section array */}
            {editMode && sec.id === getLargestId(section) && <AddSection onClick={handleAddNewSection} />}
          </div>
        );
      })}
    </>
  );
}

export default Section;
