import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import PDFTemplate from "../components/PDFTemplate";

export default function ViewPDF() {
  const styles = StyleSheet.create({
    body: {
      border: "none",
      width: "100%",
      height: "100%",
    },
  });

  return (
    <PDFViewer style={styles.body}>
      <PDFTemplate />
    </PDFViewer>
  );
}
