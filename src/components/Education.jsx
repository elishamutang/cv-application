import { forwardRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { AddMorePoints, AddSectionContent, RemoveSectionContent } from "./Buttons";
import getLargestId from "../helperFuncs";

const EducationContent = forwardRef(({ content, handleContentChange, onBlur }, ref) => {
  return (
    <li>
      <ContentEditable html={content} onChange={handleContentChange} onBlur={onBlur} ref={ref} />
    </li>
  );
});

EducationContent.displayName = "EducationContent";

function Education({ moveSectionBtns }) {
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

  console.log(education);

  return (
    <div id="education">
      <div className="title">Education</div>
      <div className="move-section">{moveSectionBtns}</div>
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
                    onBlur={(e) => handleBlur(e, content.id, item.id)}
                    ref={(element) => content.value === "" && focusOnElement(element)}
                  />
                );
              })}
              <AddMorePoints buttonDisable={item.buttonDisable} onClick={() => addNewPoint(item.id)} />
            </ul>
          </div>
          <RemoveSectionContent handleRemoveSectionContent={() => handleRemove(item.id)} />
        </div>
      ))}
      <AddSectionContent sectionName="education" handleAddMoreSectionContent={handleClick} />
    </div>
  );
}

export default Education;
