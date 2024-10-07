import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { AddMorePoints } from "./Buttons";
import getLargestId from "../helperFuncs";

function SkillsAndInterests({ moveSectionBtns }) {
  const [content, setContent] = useState({
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
  });

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

    const newEntry = { id: getLargestId(infoCopy) + 1, heading: "", value: "Edit here.." };
    infoCopy.push(newEntry);

    setContent((prevContent) => {
      return { ...prevContent, info: infoCopy, buttonDisable: true };
    });
  }

  function focusOnElement(element) {
    if (element) {
      element.el.current.focus();
    }
  }

  return (
    <div id="skills-interests">
      <div className="title">
        <input type="text" value={content.title} onChange={handleTitleChange} />
      </div>
      <div className="move-section">{moveSectionBtns}</div>
      <div className="skills-interests-content">
        <ul>
          {content.info.map((item) => {
            return (
              <li key={item.id} className="heading-info">
                <ContentEditable
                  className="heading"
                  html={item.heading}
                  onChange={(e) => handleInfoChange(e, item.id, "heading")}
                  onBlur={() => handleBlur(item.id)}
                  ref={(element) => item.heading === "" && focusOnElement(element)}
                />
                <ContentEditable
                  className="info"
                  html={item.value}
                  onChange={(e) => handleInfoChange(e, item.id, "value")}
                  onBlur={() => handleBlur(item.id)}
                />
              </li>
            );
          })}
          <AddMorePoints buttonDisable={content.buttonDisable} onClick={addNewPoint} />
        </ul>
      </div>
    </div>
  );
}

export default SkillsAndInterests;
