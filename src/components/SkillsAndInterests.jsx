import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { AddMorePoints } from "./Buttons";
import getLargestId from "../helperFuncs";

function SkillsAndInterests({ moveSectionBtns, editMode }) {
  const initialContent = {
    title: "Skills and Interests",
    info: [
      {
        id: 0,
        heading: "Technical",
        value: "List computer software and programming languages and your level of fluency",
      },
      {
        id: 1,
        heading: "Language",
        value: "List foreign languages and your level of fluency",
      },
      {
        id: 2,
        heading: "Laboratory",
        value: "List scientific / research lab techniques or tools [If Applicable]",
      },
      {
        id: 3,
        heading: "Interests",
        value: "List activities you enjoy that may spark interview conversation",
      },
    ],
    buttonDisable: false,
  };

  const [content, setContent] = useState(() => {
    const gotLocal = localStorage.getItem("skillsAndInterests");

    return gotLocal ? JSON.parse(gotLocal) : initialContent;
  });

  useEffect(() => {
    localStorage.setItem("skillsAndInterests", JSON.stringify(content));

    // Update title in order array to reflect in PDF.
    const updatedHeading = JSON.parse(localStorage.getItem("order")).map((item) => {
      if (item.title === initialContent.title) {
        return { ...item, heading: content.title };
      } else {
        return { ...item };
      }
    });

    localStorage.setItem("order", JSON.stringify(updatedHeading));
  }, [content]);

  function handleTitleChange(e) {
    setContent({ ...content, title: e.target.value });
  }

  function handleInfoChange(e, itemId, itemKey) {
    const newInfo = [...content.info];

    newInfo.map((item) => {
      if (item.id === itemId) {
        item[itemKey] = e.target.value;
      }
    });

    setContent({ ...content, info: newInfo, buttonDisable: false });
  }

  // Remove element if user leaves BOTH heading and info fields blank.
  function handleBlur(itemId) {
    const infoCopy = [...content.info];

    const checkBlanks = () => {
      for (let i = 0; i < infoCopy.length; i++) {
        if (infoCopy[i].id === itemId) {
          if (infoCopy[i].heading === "" && infoCopy[i].value === "") {
            return true;
          } else {
            return false;
          }
        }
      }
    };

    if (checkBlanks()) {
      setContent((prevContent) => {
        const updatedInfo = prevContent.info.filter((item) => {
          if (item.id !== itemId) {
            return item;
          }
        });

        return { ...prevContent, info: updatedInfo, buttonDisable: false };
      });
    }
  }

  function addNewPoint() {
    const infoCopy = [...content.info];

    const newEntry = { id: getLargestId(infoCopy) + 1, heading: "Insert title...", value: "Edit here.." };
    infoCopy.push(newEntry);

    setContent((prevContent) => {
      return { ...prevContent, info: infoCopy, buttonDisable: true };
    });
  }

  return (
    <div id="skills-interests">
      <div className="title">
        {editMode ? <input type="text" value={content.title} onChange={handleTitleChange} /> : `${content.title}`}
      </div>
      {editMode && <div className="move-section">{moveSectionBtns}</div>}
      <div className="skills-interests-content">
        <ul>
          {content.info.map((item) => {
            return (
              <li key={item.id} className="heading-info">
                {editMode ? (
                  <>
                    <ContentEditable
                      className="heading"
                      html={item.heading}
                      onChange={(e) => handleInfoChange(e, item.id, "heading")}
                      onBlur={() => handleBlur(item.id)}
                    />
                    <ContentEditable
                      className="info"
                      html={item.value}
                      onChange={(e) => handleInfoChange(e, item.id, "value")}
                      onBlur={() => handleBlur(item.id)}
                    />
                  </>
                ) : (
                  <>
                    <div className="heading">{item.heading}</div>
                    <div className="info">{item.value}</div>
                  </>
                )}
              </li>
            );
          })}
          {editMode && <AddMorePoints buttonDisable={content.buttonDisable} onClick={addNewPoint} />}
        </ul>
      </div>
    </div>
  );
}

export default SkillsAndInterests;
