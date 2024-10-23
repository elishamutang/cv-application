import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import PDFTemplate from "../components/PDFTemplate";

export default function ViewPDF() {
  const styles = StyleSheet.create({
    body: {
      border: "none",
      width: "100%",
      height: "100%",
      // Wait until author has addressed media query issue raised on 23/10/24.
      // "@media min-width: 800px": {
      //   width: "100%",
      //   height: "100%",
      // },
    },
  });

  return (
    <PDFViewer style={styles.body}>
      <PDFTemplate />
    </PDFViewer>
  );
}
