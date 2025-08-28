import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import { useFonts as useInterFonts, Inter_700Bold, Inter_600SemiBold, Inter_500Medium } from "@expo-google-fonts/inter";

export default function MovieSearch() {
  useInterFonts({ Inter_700Bold, Inter_600SemiBold, Inter_500Medium });

  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearchSubmit = () => {
    const trimmed = searchText.trim();
    if (trimmed.length === 0) return;

    // no dublicates 
    const exists = recentSearches.some(
      search => typeof search === 'string' && search.toLowerCase() === trimmed.toLowerCase()
    );
    if (!exists) {
      setRecentSearches([trimmed, ...recentSearches]);
    }

    setSearchText('');
    Keyboard.dismiss(); 
  };

  const [selectedType, setSelectedType] = useState<'Movie' | 'TV Show'>('Movie');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeSearchItem = (indexToRemove: number) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== indexToRemove));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="close" style={styles.closeIcon}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a movie or tv show</Text>
      </View>

      {/* Dropdown */}
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.dropdown} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Text style={styles.dropdownText}>{selectedType}</Text> 
          <Entypo name="chevron-small-down" style={styles.dropdownIcon}/>
        </TouchableOpacity>
              {isDropdownOpen && (
        <View style={styles.dropdownMenu}>
          {['Movie', 'TV Show'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownOption}
              onPress={() => {
                setSelectedType(option as 'Movie' | 'TV Show');
                setIsDropdownOpen(false);
              }}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a movie or tv show"
          placeholderTextColor="#576568"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />

        {/* erases text from search bar */}
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <AntDesign name="close" style={styles.eraseIcon}/>
          </TouchableOpacity>
        )}
      </View>

      {/* Recent Searches Header */}
      <View style={styles.recentHeader}>
        <Text style={styles.recentText}>RECENT SEARCHES</Text>
        <TouchableOpacity onPress={clearRecentSearches}>
          <Text style={styles.recentText}>Clear</Text>
        </TouchableOpacity>
      </View>
          
      {/* Recent Search List */}
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.searchItem}>
              <TouchableOpacity 
                style={styles.searchItemLeft}
                onPress={() => {
                  setSearchText(item);
                  handleSearchSubmit();
                }}
              >
                <Feather name="clock" style={styles.clockIcon}/>
                <Text style={styles.searchItemText} numberOfLines={1} ellipsizeMode="tail">{item}</Text>
              </TouchableOpacity>
            
            {/* removes a search? */}
            <TouchableOpacity onPress={() => removeSearchItem(index)}>
              <AntDesign name="close" style={styles.removeSearch}/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04191E',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#04171B',
    paddingTop: 20,
  },
  headerTitle: {
    color: '#E6E8E9',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    paddingLeft: 5,
  },
  closeIcon: {
    fontSize: 24,
    color: '#B1B8B9',
    paddingLeft: 16, paddingRight: 16,
    paddingTop: 23, paddingBottom: 23,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D282F',
    marginBottom: 16,
  },
 
  /* dropdown */
  dropdown: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingRight: 8, paddingLeft: 16,
  paddingTop: 20, paddingBottom: 20,
  },
  dropdownText: {
    color: '#FACC15',
    fontFamily: 'Inter_500Medium',
  },
  dropdownIcon: {
    color: '#FACC15',
    fontSize: 24,
    marginRight: 21
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
  dropdownOption: {
    padding: 12,
    borderBottomColor: '#1A2A2F',
    borderBottomWidth: 1,
  },
  dropdownOptionText: {
    color: '#FACC15',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },

  searchInput: {
    flex: 1,
    color: '#E6E8E9',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  eraseIcon: {
    fontSize: 24,
    color: '#B1B8B9',
    paddingLeft: 16, paddingRight: 16,
    paddingTop: 20, paddingBottom: 20,
  },

  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 62, marginBottom: 31, 
    marginLeft: 16, marginRight: 16,
  },
  recentText: {
    color: '#B1B8B9',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },

  /* recent searches */
  searchItem: {
    flexDirection: 'row',
  },
  searchItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 31,
  },
  searchItemText: {
    color: '#B1B8B9',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  clockIcon: {
    color: '#B1B8B9',
    fontSize: 18,
    paddingLeft: 16, paddingRight: 16,
  },
  removeSearch: {
    color: '#B1B8B9',
    fontSize: 20,
    position: 'absolute',
    right: 0,
    paddingRight: 16, paddingLeft: 4,
  },
});