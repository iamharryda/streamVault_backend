import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { HomeIcon, DiscoverIcon, PlusIcon, ReviewIcon, AccountIcon } from './icons';

export default function Navbar() {
  useFonts({ Inter_400Regular });

  const [selectedTab, setSelectedTab] = useState("Home");

  const getTextStyle = (tabName: string) =>
    tabName === selectedTab ? [styles.navText, styles.activeText] : styles.navText;

  const getIcon = (tabName: string) => {
    const isActive = tabName === selectedTab;
    const iconColor = isActive ? "#FACC15" : "#B1B8B9";
    const fillColor = isActive ? "#FACC15" : "none";

  
    switch (tabName) {
      case "Home":
        return <HomeIcon color={iconColor} fillC={fillColor}/>;
      case "Discover":
        return <DiscoverIcon color={iconColor} fillC={fillColor} />;
      case "My Review":
        return <ReviewIcon color={iconColor} fillC={fillColor} />;
      case "Account":
        return <AccountIcon color={iconColor} fillC={fillColor} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.navbar}>
      {/* Home */}
      <TouchableOpacity style={styles.navSection} onPress={() => setSelectedTab("Home")}>
        {getIcon("Home")}
        <Text style={getTextStyle("Home")}>Home</Text>
      </TouchableOpacity>

      {/* Discover */}
      <TouchableOpacity style={styles.navSection} onPress={() => setSelectedTab("Discover")}>
        {getIcon("Discover")}
        <Text style={getTextStyle("Discover")}>Discover</Text>
      </TouchableOpacity>

      {/* Add */}
      <View style={styles.navSection}>
        <TouchableOpacity style={styles.addButton}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      {/* My Review */}
      <TouchableOpacity style={styles.navSection} onPress={() => setSelectedTab("My Review")}>
        {getIcon("My Review")}
        <Text style={getTextStyle("My Review")}>My Review</Text>
      </TouchableOpacity>

      {/* Account */}
      <TouchableOpacity style={styles.navSection} onPress={() => setSelectedTab("Account")}>
        {getIcon("Account")}
        <Text style={getTextStyle("Account")}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#02151A",
  },
  navSection: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  navText: {
    color: "#B1B8B9",
    opacity: 0.5,
    fontSize: 10,
    lineHeight: 14,
    paddingTop: 4,
    fontFamily: "Inter_400Regular",
  },
  activeText: {
    color: "#FACC15",
    opacity: 1,
  },
  addButton: {
    backgroundColor: "#FACC15",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    marginBottom: -10,
    padding: 10,
  },
});