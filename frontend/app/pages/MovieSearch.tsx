import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';

export default function MovieSearch() {
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    
  ]);

  const handleSearchSubmit = () => {
    const trimmed = searchText.trim();
    if (trimmed.length === 0) return;

    // no dublicates please - what
    /*if (!recentSearches.includes(trimmed)) {
      setRecentSearches([trimmed, ...recentSearches]);
    }*/

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
        <TouchableOpacity>
          <AntDesign name="close" style={styles.closeIcon}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a movie or tv show</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Movie</Text>
          <Entypo name="chevron-small-down" style={styles.dropdownIcon}/>
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="Search a movie or tv show"
          placeholderTextColor="#576568"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />

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
{/* here so far, so i dont get lost */}
      {/* Recent Search List */}
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.searchItem}>
            <View style={styles.searchItemLeft}>
              <Feather name="clock" size={24} color="black" />
              <Text style={styles.searchItemText} numberOfLines={1} ellipsizeMode="tail">
                {item}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removeSearchItem(index)}>
              <AntDesign name="close" size={24} color='#B1B8B9'/>
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
    fontWeight: '700',
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
 
  dropdown: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingRight: 8, paddingLeft: 16,
  paddingTop: 20, paddingBottom: 20,
  },
  dropdownText: {
    color: '#FACC15',
    fontWeight: 'bold',
  },
  dropdownIcon: {
    color: '#FACC15',
    fontSize: 24,
    marginRight: 21
  }, 

  searchInput: {
    flex: 1,
    color: '#E6E8E9',
    fontSize: 14,
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
    fontWeight: 500,
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