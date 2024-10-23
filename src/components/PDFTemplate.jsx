import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";

export default function PDFTemplate() {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
      padding: "16px",
      fontFamily: "Helvetica",
      display: "flex",
    },
    name: {
      fontSize: "40px",
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      padding: "2% 0",
    },
    text: {
      fontSize: "14px",
    },
    header: {
      width: "100%",
      borderBottom: "1px solid black",
      alignItems: "center",
    },
    borderOn: {
      paddingBottom: "2%",
    },
    section: {
      display: "flex",
      textAlign: "center",
      width: "100%",
    },
    sectionHeader: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    secondLevel: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: "14.4px",
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
    },
    thirdLevel: {
      alignItems: "flex-start",
      marginTop: "8px",
      marginBottom: "8px",
      lineHeight: 1.5,
    },
    bulletPoint: {
      display: "flex",
      flexDirection: "row",
      fontSize: "14.4px",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{localStorage.getItem("name")}</Text>
          <Text style={styles.text}>{JSON.parse(localStorage.getItem("contact"))[0].field}</Text>
          <Text style={[styles.text, styles.borderOn]}>{JSON.parse(localStorage.getItem("contact"))[1].field}</Text>
        </View>
        {JSON.parse(localStorage.getItem("education")).map((item) => {
          return (
            <View key={item.id} style={[styles.section, { marginTop: 32 }]}>
              <Text style={[styles.name, styles.sectionHeader]}>Education</Text>
              <View style={styles.secondLevel}>
                <Text style={[styles.organisation, styles.left]}>{item.institution}</Text>
                <View style={styles.right}>
                  <Text style={styles.location}>{item.location}</Text>
                  <Text style={styles.date}>{item.graduationDate}</Text>
                </View>
              </View>
              <View style={styles.thirdLevel}>
                {item.content.map((content) => {
                  return (
                    <View style={styles.bulletPoint} key={content.id}>
                      <Text>•</Text>
                      <Text> {content.value}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}
