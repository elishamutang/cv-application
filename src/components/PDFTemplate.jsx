import { Page, Text, Document, StyleSheet, View, Font } from "@react-pdf/renderer";

Font.registerHyphenationCallback((word) => [word]);

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
      fontSize: "12px",
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
      fontSize: "20px",
      fontWeight: "bold",
    },
    secondLevel: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: "12px",
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
      fontSize: "12px",
      textAlign: "justify",
    },
    location: {
      alignSelf: "flex-end",
    },
    date: {
      alignSelf: "flex-end",
      marginTop: "3px",
    },
    position: {
      marginTop: "3px",
    },
    skillsAndInterests: {
      flexDirection: "row",
      fontSize: "12px",
      lineHeight: 1.5,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{localStorage.getItem("name")}</Text>
          <Text style={styles.text}>{JSON.parse(localStorage.getItem("contact"))[0].field}</Text>
          <Text style={[styles.text, styles.borderOn]}>{JSON.parse(localStorage.getItem("contact"))[1].field}</Text>
        </View>
        {/* Education Section only */}
        {/* Education Header */}
        <Text style={[styles.name, styles.sectionHeader, { marginTop: 8 }]}>Education</Text>
        {JSON.parse(localStorage.getItem("education")).map((item) => {
          return (
            <View key={item.id} style={styles.section}>
              <View style={styles.secondLevel}>
                <Text style={styles.organisation}>{item.institution}</Text>
                <View>
                  <Text style={styles.location}>{item.location}</Text>
                  <Text style={styles.date}>{item.graduationDate}</Text>
                </View>
              </View>
              <View style={styles.thirdLevel}>
                {item.content.map((content) => {
                  return (
                    <View style={styles.bulletPoint} key={content.id}>
                      <Text>• {content.value}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
        {/* Sections */}
        {/* Section Header */}
        <Text style={[styles.name, styles.sectionHeader]}>Experience</Text>
        {JSON.parse(localStorage.getItem("sections")).map((section) => {
          return (
            <View key={section.id} style={styles.section}>
              {section.content.map((item) => {
                return (
                  // Second level
                  <>
                    <View key={item.id} style={[styles.secondLevel, { marginBottom: "3px" }]}>
                      <View>
                        <Text style={styles.organisation}>{item.organisation}</Text>
                        <Text style={styles.position}>{item.position}</Text>
                      </View>
                      <View>
                        <Text style={styles.location}>{item.location}</Text>
                        <Text style={styles.date}>
                          {item.startDate} - {item.endDate}
                        </Text>
                      </View>
                    </View>
                    {/* Third level */}
                    <View style={styles.thirdLevel}>
                      {item.bulletPoints.map((point) => {
                        return (
                          <View style={styles.bulletPoint} key={point.id}>
                            <Text>• {point.value}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </>
                );
              })}
            </View>
          );
        })}
        {/* Skills And Interests */}
        {/* Header */}
        <Text style={[styles.name, styles.sectionHeader]}>Skills And Interests</Text>
        <View style={[styles.section]}>
          {JSON.parse(localStorage.getItem("skillsAndInterests")).info.map((item) => {
            return (
              <View key={item.id} style={styles.skillsAndInterests}>
                <Text
                  style={{
                    width: "100%",
                    maxWidth: "80px",
                    fontWeight: "bold",
                    fontFamily: "Helvetica-Bold",
                    textAlign: "left",
                  }}
                >
                  {item.heading}
                </Text>
                <Text style={{ width: "100%", textAlign: "left" }}>{item.value}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}
