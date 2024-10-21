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
  return (
    <button className="printToPDF" onClick={onClick}>
      {/* Consider using react router to direct user to a separate tab to view PDF */}
      <PDFDownloadLink document={<PDFTemplate />} fileName="test.pdf" style={{ color: "white" }}>
        {({ blob, url, loading, error }) => {
          return loading ? "Loading" : "Print to PDF";
        }}
      </PDFDownloadLink>
    </button>
  );
}

export default function MainNav({ children, editMode }) {
  return <div className={editMode ? "mainNav" : "mainNav viewing"}>{children}</div>;
}
