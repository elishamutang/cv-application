import { Page, Text, Document, StyleSheet, View, Font } from "@react-pdf/renderer";
import { Fragment } from "react";

Font.registerHyphenationCallback((word) => [word]);

export default function PDFTemplate() {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
      padding: "32px",
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
      marginBottom: "4px",
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
    heading: {
      width: "100%",
      maxWidth: "100px",
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      textAlign: "left",
    },
    topSection: {
      marginTop: "8px",
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

        {/* Sections will be printed out based on the order that was set in Editing mode. */}
        {JSON.parse(localStorage.getItem("order")).map((item, idx) => {
          if (item.title === "Education") {
            return (
              // Education section
              <View key={item.title} style={styles.section}>
                {/* Education header */}
                <Text style={[styles.name, styles.sectionHeader, idx === 0 && styles.topSection]}>{item.heading}</Text>

                {/* Education content */}
                {JSON.parse(localStorage.getItem("education")).map((item) => {
                  return (
                    <View key={item.id}>
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
              </View>
            );
          } else if (item.title === "Skills and Interests") {
            // Skills And Interests
            return (
              <View key={item.title} style={styles.section} wrap={false}>
                {/* Header */}
                <Text style={[styles.name, styles.sectionHeader, idx === 0 && styles.topSection]}>{item.heading}</Text>

                {/* Content */}
                <View wrap={false}>
                  {JSON.parse(localStorage.getItem("skillsAndInterests")).info.map((item) => {
                    return (
                      <View key={item.id} style={styles.skillsAndInterests}>
                        <Text style={styles.heading}>{item.heading}</Text>
                        <Text style={{ width: "100%", textAlign: "left" }}>{item.value}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          } else {
            // Sections
            // Loop through each section.
            return (
              <Fragment key={item.title}>
                {JSON.parse(localStorage.getItem("sections")).map((section) => {
                  return (
                    // Section container
                    <View key={section.id} style={styles.section}>
                      {/* Header */}
                      <Text style={[styles.name, styles.sectionHeader, idx === 0 && styles.topSection]}>
                        {section.heading}
                      </Text>

                      {/* Content */}
                      {section.content.map((item) => {
                        return (
                          // Content container
                          <View key={item.id}>
                            {/* Second level */}
                            <View style={[styles.secondLevel, { marginBottom: "3px" }]}>
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
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </Fragment>
            );
          }
        })}
      </Page>
    </Document>
  );
}
