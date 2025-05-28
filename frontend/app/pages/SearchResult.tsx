import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Entypo, AntDesign } from "@expo/vector-icons";

export default function SearchResult() {
  const router = useRouter();
  const [selected, setSelected] = useState<"Movie" | "TV Show">("Movie");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSelect = (value: "Movie" | "TV Show") => {
    setSelected(value);
    setDropdownVisible(false);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.push("./Homepage")}>
          <AntDesign name="close" size={24} color="#B1B8B9" />
        </TouchableOpacity>

        <Text style={styles.titleText}>Add a movie or tv show</Text>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownToggle}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text numberOfLines={1} style={styles.dropdownText}>
              {selected}
            </Text>
            <Entypo name="chevron-small-down" size={24} color="#FACC15" />
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              {["Movie", "TV Show"].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleSelect(option as "Movie" | "TV Show")}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search a movie or tv show"
          placeholderTextColor="#576568"
          value={searchText}
          onChangeText={setSearchText}
        />

        <TouchableOpacity style={styles.discardButton} onPress={clearSearch}>
          <AntDesign name="close" size={20} color="#B1B8B9" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#04171B",
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#04171B',
    paddingTop: 20,
  },
  cancelButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 23,
    paddingBottom: 23,
  },
  titleText: {
    color: '#E6E8E9',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    paddingLeft: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D282F',
    marginBottom: 16,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  dropdownToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#0D282F",
  },
  dropdownText: {
    color: "#FACC15",
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
    fontFamily: 'Inter_500Medium',
  },
  dropdownMenu: {
    backgroundColor: '#04191E',
    position: 'absolute',
    top: 50,
    left: 15,
    zIndex: 1000,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0D282F',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownItemText: {
    color: "#FACC15",
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    color: '#E6E8E9',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  discardButton: {
    paddingRight: 16,
    paddingLeft: 4,
  },
});