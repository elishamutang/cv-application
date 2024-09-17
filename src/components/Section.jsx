import { useState } from "react";

import SectionContent from "./SectionContent";

function Section() {
  const [sectionName, setSectionName] = useState("Experience");

  return (
    <div className="section">
      {/* Needs to be input */}
      <div className="title">{sectionName}</div>
      <SectionContent />
    </div>
  );
}

export default Section;
