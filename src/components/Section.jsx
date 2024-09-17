import { useState } from "react";

import SectionContent from "./SectionContent";

function Section() {
  const [sectionName, setSectionName] = useState("Experience");

  function handleSectionNameChange(e) {
    setSectionName(e.target.value);

    if (e.target.value === "") {
      setSectionName("Experience");
    }
  }

  return (
    <div className="section">
      <div className="title">
        <input type="text" value={sectionName} onChange={handleSectionNameChange} />
      </div>
      <SectionContent />
    </div>
  );
}

export default Section;
