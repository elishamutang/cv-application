function RemoveSection() {
  return <button className="removeBtn">Remove</button>;
}

function AddSection({ sectionName, handleClick }) {
  return (
    <button onClick={handleClick} className="addMore">
      Add {sectionName}
    </button>
  );
}

export { RemoveSection, AddSection };
