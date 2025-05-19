import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function MovieSearch() {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    
  ]);

  const handleSearchSubmit = () => {
    const trimmed = searchText.trim();
    if (trimmed.length === 0) return;

    // no dublicates please
    if (!recentSearches.includes(trimmed)) {
      setRecentSearches([trimmed, ...recentSearches]);
    }

    setSearchText('');
    Keyboard.dismiss(); 
  };

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
         <Ionicons name="close" size={24} color="#888" />
  <Text style={styles.headerTitle}>Add a movie or tv show</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Movie</Text>
          <MaterialIcons name="arrow-drop-down" size={20} color="#ffcc00" />
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="Search a movie or tv show"
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />

        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>

      {/* Recent Searches Header */}
      <View style={styles.recentHeader}>
        <Text style={styles.recentText}>RECENT SEARCHES</Text>
        <TouchableOpacity onPress={clearRecentSearches}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Search List */}
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.searchItem}>
            <View style={styles.searchItemLeft}>
              <Ionicons name="time-outline" size={18} color="#aaa" />
              <Text style={styles.searchItemText} numberOfLines={1} ellipsizeMode="tail">
                {item}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeSearchItem(index)}>
              <MaterialIcons name="close" size={18} color="#aaa" />
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
  backgroundColor: '#071013',
  paddingTop: 40,
},
topLine: {
  height: 2,
  backgroundColor: '#00baff', 
},

header: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#071013',
  paddingVertical: 16,
  paddingHorizontal: 16,
},

headerTitle: {
  color: 'white',
  fontSize: 16,
  fontWeight: '500',
  marginLeft: 12, 
},
 searchBar: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#0f1a1c',
  borderRadius: 4,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderWidth: 1,
  borderColor: '#264348',
  marginBottom: 16,
 },
 
  dropdown: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingRight: 8,
  },

  dropdownText: {
    color: '#ffcc00',
    fontWeight: 'bold',
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    color: 'white',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentText: {
    color: '#888',
    fontSize: 12,
  },
  clearText: {
    color: '#aaa',
    fontSize: 12,
  },
  searchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e2c30',
  },
  searchItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchItemText: {
    color: '#e0e0e0',
    marginLeft: 12,
    flexShrink: 1,
  },
});