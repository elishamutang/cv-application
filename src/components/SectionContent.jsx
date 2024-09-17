import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";

function SectionContent() {
  const [defaultValues, setValues] = useState({
    organisation: "Organisation",
    position: "Position Title",
    city: "City",
    state: "State",
    from: "MMM YYYY",
    to: "MMM YYYY",
  });

  const text = useRef("");

  function handleOrganisationChange(e) {
    setValues({ ...defaultValues, organisation: e.target.value });
  }

  function handlePositionChange(e) {
    setValues({ ...defaultValues, position: e.target.value });
  }

  function handleBlur() {
    console.log(text.current.innerHTML);
  }

  return (
    <>
      <div className="company-position">
        {/* Fix these components */}
        <ContentEditable
          innerRef={text}
          html={defaultValues.organisation}
          onBlur={handleBlur}
          onChange={handleOrganisationChange}
        />
        <ContentEditable
          innerRef={text}
          html={defaultValues.position}
          onBlur={handleBlur}
          onChange={handlePositionChange}
        />
      </div>
      <div className="location-duration">
        <p>
          {defaultValues.city}, {defaultValues.state}
        </p>
        <p>
          {defaultValues.from} - {defaultValues.to}
        </p>
      </div>
      <div className="content">
        <ul>
          <li>
            Beginning with most recent position, describe your experience, skills, and resulting outcomes in bullet
            form.
          </li>
          <li>
            Begin each line with an action verb and include details that will help the reader understand your
            accomplishments, skills, knowledge, abilities, or achievements.
          </li>
          <li>Quantify where possible.</li>
          <li>Do not use personal pronouns; each line should be a phrase rather than a full sentence.</li>
        </ul>
      </div>
    </>
  );
}

export default SectionContent;
