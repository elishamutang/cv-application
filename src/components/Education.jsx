import { forwardRef, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { AddMorePoints, AddSectionContent, RemoveSectionContent } from "./Buttons";
import getLargestId from "../helperFuncs";

const EducationContent = forwardRef(({ content, handleContentChange, onBlur, editMode }, ref) => {
  return (
    <li>
      {editMode ? (
        <ContentEditable html={content} onChange={handleContentChange} onBlur={onBlur} ref={ref} />
      ) : (
        <div>{content}</div>
      )}
    </li>
  );
});

EducationContent.displayName = "EducationContent";

function Education({ moveSectionBtns, editMode }) {
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
      buttonDisable: false,
    },
  ];

  // Declare initial state
  // If details stored in local storage, fetch them and set them as initial state else use initialEducation.
  const [education, setEducation] = useState(() => {
    const storedEducation = localStorage.getItem("education");
    return storedEducation ? JSON.parse(storedEducation) : initialEducation;
  });

  // Call useEffect to set state in local storage.
  useEffect(() => {
    localStorage.setItem("education", JSON.stringify(education));
  }, [education]);

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

        return { ...item, content: newContent, buttonDisable: false };
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

      const newEntry = { ...initialEducation[0] }; // Take section from initialEducation
      const largestIdVal = getLargestId(education);

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
  }

  function addNewPoint(itemId) {
    // Prepare new entry
    const newEntry = { id: getLargestId(education[0].content) + 1, value: "" };

    const updatedEducation = education.map((item) => {
      if (item.id === itemId) {
        const updatedContent = [...item.content];

        updatedContent.push(newEntry);

        return { ...item, content: updatedContent, buttonDisable: true };
      } else {
        return item;
      }
    });

    setEducation(updatedEducation);
  }

  function handleBlur(e, contentId, itemId) {
    if (e.currentTarget.textContent === "") {
      setEducation((prevEducation) => {
        const updatedEducation = prevEducation.map((item) => {
          if (item.id === itemId) {
            const updatedContent = item.content.filter((content) => {
              if (content.id !== contentId) {
                return content;
              }
            });

            return { ...item, content: updatedContent, buttonDisable: false };
          } else {
            return item;
          }
        });

        return updatedEducation;
      });
    }
  }

  function focusOnElement(element) {
    if (element) {
      element.el.current.focus();
    }
  }

  return (
    <div id="education">
      <div className="title">Education</div>
      {editMode && <div className="move-section">{moveSectionBtns}</div>}
      {education.map((item) => (
        <div key={item.id} className="education-section">
          {editMode ? (
            <ContentEditable
              html={item.institution}
              className="institution"
              onChange={(e) => handleChange(e, item.id)}
            />
          ) : (
            <div className="institution">{item.institution}</div>
          )}

          <div className="location-graduationDate">
            {editMode ? (
              <ContentEditable html={item.location} className="location" onChange={(e) => handleChange(e, item.id)} />
            ) : (
              <div className="location">{item.location}</div>
            )}

            {editMode ? (
              <ContentEditable
                html={item.graduationDate}
                className="graduationDate"
                onChange={(e) => handleChange(e, item.id)}
              />
            ) : (
              <div className="graduationDate">{item.graduationDate}</div>
            )}
          </div>
          <div className="content">
            <ul>
              {item.content.map((content) => {
                return (
                  <EducationContent
                    key={content.id}
                    content={content.value}
                    handleContentChange={(e) => handleContentChange(e, content.id, item.id)}
                    onBlur={(e) => handleBlur(e, content.id, item.id)}
                    ref={(element) => content.value === "" && focusOnElement(element)}
                    editMode={editMode}
                  />
                );
              })}
              {editMode && <AddMorePoints buttonDisable={item.buttonDisable} onClick={() => addNewPoint(item.id)} />}
            </ul>
          </div>
          {editMode && <RemoveSectionContent handleRemoveSectionContent={() => handleRemove(item.id)} />}
        </div>
      ))}
      {editMode && <AddSectionContent sectionName="education" handleAddMoreSectionContent={handleClick} />}
    </div>
  );
}

export default Education;
