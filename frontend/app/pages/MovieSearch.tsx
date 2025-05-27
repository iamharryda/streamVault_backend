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

      {/* dropdown to switch to shows */}
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Movie</Text> 
          <Entypo name="chevron-small-down" style={styles.dropdownIcon}/>
        </TouchableOpacity>

        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search a movie or tv show"
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
            <View style={styles.searchItemLeft}>
              <Feather name="clock" style={styles.clockIcon}/>
              <Text style={styles.searchItemText} numberOfLines={1} ellipsizeMode="tail">
                {item}
              </Text>
              <Feather name="arrow-up-left" style={styles.arrowIcon}/>
            </View>
            {/* removes a search? */}
            {/* <TouchableOpacity onPress={() => removeSearchItem(index)}>
              <AntDesign name="close" size={24} color='#B1B8B9'/>
            </TouchableOpacity> */}
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
  },
  clockIcon: {
    color: '#B1B8B9',
    fontSize: 18,
    paddingLeft: 16, paddingRight: 16,
  },
  arrowIcon: {
    color: '#B1B8B9',
    fontSize: 20,
    paddingRight: 16, paddingLeft: 8,
    paddingTop: 5, paddingBottom: 5,
    position: 'absolute',
    right: 0,
  },
});