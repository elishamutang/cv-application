import { Fragment, useState, forwardRef } from "react";
import ContentEditable from "react-contenteditable";
import { AddSection, RemoveSection, AddMorePoints, IcBaselineRemoveCircle, IcRoundAddCircle } from "./Buttons";
import getLargestId from "../helperFuncs";

const SectionContent = forwardRef(({ content, handleContentChange }, ref) => {
  return (
    <li>
      <ContentEditable html={content.value} onChange={handleContentChange} ref={ref} />
    </li>
  );
});

SectionContent.displayName = "SectionContent";

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
      ],
    },
  ];

  const [section, setSection] = useState(initialSection);
  const [buttonState, setButtonState] = useState(false);

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

  function handleAddMoreSectionContent(sectionId) {
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

  function handleRemoveSectionContent(sectionId, contentId) {
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

  function handleRemoveSection(sectionId) {
    const sectionCopy = [...section];

    const newSection = sectionCopy.filter((sec) => {
      if (sec.id !== sectionId) return sec;
    });

    setSection(newSection);
  }

  function handleAddNewSection() {
    const sectionCopy = [...section];

    const latestSection = { ...initialSection[1] };
    const latestId = getLargestId(sectionCopy);

    latestSection.id = latestId + 1;

    sectionCopy.push(latestSection);
    setSection(sectionCopy);
  }

  function addMoreBulletPoints(bulletPointsArr, contentId, sectionId) {
    const largestId = getLargestId(bulletPointsArr);

    const sectionCopy = [...section];
    const bulletPointsArrCopy = [...bulletPointsArr];

    const newBulletPoint = { id: largestId + 1, value: "" };
    bulletPointsArrCopy.push(newBulletPoint);

    sectionCopy.forEach((sec) => {
      if (sec.id === sectionId) {
        sec.content.forEach((content) => {
          if (content.id === contentId) {
            content.bulletPoints = bulletPointsArrCopy;
          }
        });
      }
    });

    setSection(sectionCopy);
  }

  console.log(buttonState);

  return (
    <>
      {section.map((sec) => {
        return (
          <div className="section-container" id={sec.title.toLowerCase()} key={sec.id}>
            <div className="title">
              <input type="text" value={sec.title} onChange={(e) => handleSectionNameChange(e, sec.id)} />
              {/* Append the removeSection button to ADDITIONAL sections only. First section can never be deleted. */}
              {sec.id !== 0 ? (
                <button onClick={() => handleRemoveSection(sec.id)} className="removeSection">
                  <IcBaselineRemoveCircle />
                </button>
              ) : (
                ""
              )}
            </div>
            {/* Content under a specific section (e.g Experience will contain 2 experiences) */}
            {sec.content.map((content) => {
              return (
                <div className="section" key={content.id}>
                  <SectionHeader item={content} handleHeaderChange={(e) => handleHeaderChange(e, sec.id, content.id)} />
                  <div className="content">
                    <ul>
                      {/* Bullet-points */}
                      {content.bulletPoints.map((point) => {
                        return (
                          <Fragment key={point.id}>
                            <SectionContent
                              content={point}
                              // Update this ref attribute and make an external function for it.
                              // ref={point.value === "" ? (element) => element.el.current.focus() : null}
                              bulletPointsArr={content.bulletPoints}
                              handleContentChange={(e) => handleContentChange(e, sec.id, content.id, point.id)}
                            />
                            {point.id === getLargestId(content.bulletPoints) ? (
                              <AddMorePoints
                                onClick={() => addMoreBulletPoints(content.bulletPoints, content.id, sec.id)}
                              />
                            ) : (
                              ""
                            )}
                          </Fragment>
                        );
                      })}
                    </ul>
                  </div>
                  <RemoveSection handleRemoveSectionContent={() => handleRemoveSectionContent(sec.id, content.id)} />
                </div>
              );
            })}
            <AddSection
              handleAddMoreSectionContent={() => handleAddMoreSectionContent(sec.id)}
              sectionName={sec.title.toLowerCase()}
            />
            {/* Adds the 'addNewSection' button to the last element in the section array */}
            {sec.id === getLargestId(section) ? (
              <button onClick={handleAddNewSection} className="addNewSection">
                <IcRoundAddCircle />
              </button>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </>
  );
}

export default Section;
