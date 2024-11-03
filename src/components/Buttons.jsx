// Remove experience under a specific section.
function RemoveSectionContent({ handleRemoveSectionContent }) {
  function hoverIn(e) {
    e.target.parentNode.classList.add("hover");
  }

  function hoverOut(e) {
    e.target.parentNode.classList.remove("hover");
  }

  return (
    <button onClick={handleRemoveSectionContent} onMouseEnter={hoverIn} onMouseLeave={hoverOut} className="removeBtn">
      Remove
    </button>
  );
}

// Button to add additional experience under a specific section.
function AddSectionContent({ handleAddMoreSectionContent }) {
  return (
    <button onClick={handleAddMoreSectionContent} className="addMore">
      Add experience
    </button>
  );
}

// Button to add new bullet points.
function AddMorePoints({ onClick, buttonDisable }) {
  return (
    <button className="addNewPoint" onClick={onClick} disabled={buttonDisable}>
      <IcRoundAddCircle />
    </button>
  );
}

// Add new section like a section for Projects.
function AddSection({ onClick }) {
  return (
    <button onClick={onClick} className="addNewSection">
      <IcRoundAddCircle></IcRoundAddCircle>
    </button>
  );
}

function RemoveSection({ onClick }) {
  return (
    <button onClick={onClick} className="removeSection">
      <IcBaselineRemoveCircle></IcBaselineRemoveCircle>
    </button>
  );
}

// Move section down.
function MoveSectionDown({ onClick }) {
  return (
    <button onClick={onClick} className="moveSectionDown">
      <IconParkSolidArrowCircleDown></IconParkSolidArrowCircleDown>
    </button>
  );
}

// Move section up.
function MoveSectionUp({ onClick }) {
  return (
    <button onClick={onClick} className="moveSectionUp">
      <IconParkSolidArrowCircleUp></IconParkSolidArrowCircleUp>
    </button>
  );
}

// Consider moving the two SVGs below to the Section component as they will be only used for that component.
function IcBaselineRemoveCircle(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5 11H7v-2h10z"
      ></path>
    </svg>
  );
}

function IcRoundAddCircle(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1"
      ></path>
    </svg>
  );
}

function IconParkSolidArrowCircleDown(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
      <defs>
        <mask id="ipSArrowCircleDown0">
          <g fill="none" strokeLinejoin="round" strokeWidth="4">
            <path
              fill="#fff"
              stroke="#fff"
              d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"
            ></path>
            <path stroke="#000" strokeLinecap="round" d="M24 15v18m9-9l-9 9l-9-9"></path>
          </g>
        </mask>
      </defs>
      <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSArrowCircleDown0)"></path>
    </svg>
  );
}

function IconParkSolidArrowCircleUp(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
      <defs>
        <mask id="ipSArrowCircleUp0">
          <g fill="none" strokeLinejoin="round" strokeWidth="4">
            <path
              fill="#fff"
              stroke="#fff"
              d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"
            ></path>
            <path stroke="#000" strokeLinecap="round" d="M24 33.5v-18m9 9l-9-9l-9 9"></path>
          </g>
        </mask>
      </defs>
      <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSArrowCircleUp0)"></path>
    </svg>
  );
}

export {
  RemoveSectionContent,
  AddSectionContent,
  AddMorePoints,
  IcBaselineRemoveCircle,
  IcRoundAddCircle,
  MoveSectionDown,
  MoveSectionUp,
  AddSection,
  RemoveSection,
};
