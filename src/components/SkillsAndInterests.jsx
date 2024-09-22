import { useState } from "react";
import ContentEditable from "react-contenteditable";

function SkillsAndInterests() {
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

    setContent({ ...content, info: newInfo });
  }

  return (
    <div id="skills-interests">
      <ContentEditable html={content.title} className="title" onChange={handleTitleChange} />
      <div className="skills-interests-content">
        <ul>
          {content.info.map((item) => {
            return (
              <li key={item.id} className="heading-info">
                <ContentEditable
                  className="heading"
                  html={item.heading}
                  onChange={(e) => handleInfoChange(e, item.id, "heading")}
                />
                <ContentEditable
                  className="info"
                  html={item.value}
                  onChange={(e) => handleInfoChange(e, item.id, "value")}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SkillsAndInterests;
