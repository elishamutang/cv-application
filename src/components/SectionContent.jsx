import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";

function SectionContent() {
  const [defaultValues, setValues] = useState({
    organisation: "Organisation",
    position: "Position Title",
    location: "City, State",
    startDate: "MMM YYYY",
    endDate: "MMM YYYY",
  });

  const organisationText = useRef("");
  const positionTitleText = useRef("");
  const cityAndState = useRef("");
  const startDate = useRef("");
  const endDate = useRef("");

  function handleOrganisationChange(e) {
    setValues({ ...defaultValues, organisation: e.target.value });
  }

  function handlePositionChange(e) {
    setValues({ ...defaultValues, position: e.target.value });
  }

  function handleBlur() {
    console.log(organisationText.current.innerHTML);
    console.log(positionTitleText.current.innerHTML);
    console.log(cityAndState.current.innerHTML);
  }

  return (
    <>
      <div className="company-position">
        <ContentEditable
          innerRef={organisationText}
          html={defaultValues.organisation}
          onBlur={handleBlur}
          onChange={handleOrganisationChange}
        />
        <ContentEditable
          innerRef={positionTitleText}
          html={defaultValues.position}
          onBlur={handleBlur}
          onChange={handlePositionChange}
        />
      </div>
      <div className="location-duration">
        <ContentEditable
          innerRef={cityAndState}
          html={defaultValues.location}
          onBlur={handleBlur}
          onChange={(e) => setValues({ ...defaultValues, location: e.target.value })}
        />
        <div className="duration">
          <ContentEditable
            innerRef={startDate}
            html={defaultValues.startDate}
            onBlur={handleBlur}
            onChange={(e) => setValues({ ...defaultValues, startDate: e.target.value })}
          />
          -
          <ContentEditable
            innerRef={endDate}
            html={defaultValues.endDate}
            onBlur={handleBlur}
            onChange={(e) => setValues({ ...defaultValues, endDate: e.target.value })}
          />
        </div>
      </div>
      <div className="content">
        {/* Needs to be changed to content editable elements */}
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
