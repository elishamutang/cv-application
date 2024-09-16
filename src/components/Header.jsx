import { useState } from "react";

function Header() {
  const [fullName, setFullName] = useState("John Doe");

  function handleName(e) {
    setFullName(e.target.value);
  }

  return (
    <div id="name">
      <input type="text" id="fullName" value={fullName} onChange={handleName} />
    </div>
  );
}

export default Header;
