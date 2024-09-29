import { forwardRef } from "react";

function RemoveSection({ handleRemoveSectionContent }) {
  return (
    <button onClick={handleRemoveSectionContent} className="removeBtn">
      Remove
    </button>
  );
}

function AddSection({ sectionName, handleAddMoreSectionContent }) {
  return (
    <button onClick={handleAddMoreSectionContent} className="addMore">
      Add {sectionName}
    </button>
  );
}

const AddMorePoints = forwardRef(({ onClick, buttonDisable }, ref) => {
  return (
    <button className="addNewBulletPoint" onClick={onClick} disabled={buttonDisable} ref={ref}>
      <IcRoundAddCircle></IcRoundAddCircle>
    </button>
  );
});

AddMorePoints.displayName = "AddMorePoints";

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

export { RemoveSection, AddSection, AddMorePoints, IcBaselineRemoveCircle, IcRoundAddCircle };
