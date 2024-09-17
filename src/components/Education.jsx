import { useState } from "react";

function Education() {
  return (
    <>
      <div className="title">Education</div>
      <div className="institution">Harvard University</div>
      <div className="location-duration">
        <p>Cambridge, MA</p>
        <p>Graduation Date</p>
      </div>
      <div className="content">
        <ul>
          <li>Degree, Concentration. GPA [Note: GPA is optional]</li>
          <li>Thesis: [Note: Optional]</li>
          <li>Relevant Coursework: [Note: Optional. Awards and honors can also be listed here]</li>
        </ul>
      </div>
    </>
  );
}

export default Education;
