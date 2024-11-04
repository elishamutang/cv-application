import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFTemplate from "./PDFTemplate";

export function ResetLocalStorage({ onClick, editMode }) {
  if (editMode) {
    return (
      <button className="reset" onClick={onClick}>
        Reset
      </button>
    );
  }
}

export function Mode({ active, onClick, editMode }) {
  return (
    <button className={active ? "mode active" : "mode"} onClick={onClick}>
      {editMode ? "Editing" : "Viewing"}
    </button>
  );
}

export function PrintToPDF({ onClick }) {
  if (isMobile) {
    return (
      <button>
        <PDFDownloadLink document={<PDFTemplate />} fileName="yourcv.pdf" style={{ color: "white", width: 100 }}>
          {({ blob, url, loading, error }) => {
            return loading ? "Loading.." : "Print PDF";
          }}
        </PDFDownloadLink>
      </button>
    );
  }

  return (
    <button className="printToPDF" onClick={onClick}>
      {/*  Use react router to direct user to a separate tab to view PDF */}
      <Link to="../ViewPDF" target="_blank">
        Print PDF
      </Link>
    </button>
  );
}

export default function MainNav({ children, editMode }) {
  return <div className={editMode ? "mainNav" : "mainNav viewing"}>{children}</div>;
}
