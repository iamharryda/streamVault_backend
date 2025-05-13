import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const recentSearches = [
  'Hannibal',
  'Drive',
  'Breaking bad',
  'House of the dragon',
  'Taxi driver',
  'Django',
  'The Godfather',
];

export default function MovieSearch() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add a movie or tv show</Text>
        <Ionicons name="close" size={24} color="white" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchPrefix}>Movie</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a movie or tv show"
          placeholderTextColor="#ccc"
        />
        <Ionicons name="close" size={20} color="#ccc" />
      </View>

      {/* Recent Searches Header */}
      <View style={styles.recentHeader}>
        <Text style={styles.recentText}>RECENT SEARCHES</Text>
        <TouchableOpacity>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Search List */}
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.searchItem}>
            <View style={styles.searchItemLeft}>
              <Ionicons name="time-outline" size={18} color="#aaa" />
              <Text style={styles.searchItemText}>{item}</Text>
            </View>
            <MaterialIcons name="close" size={18} color="#aaa" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1b1f',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e2c30',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 24,
  },
  searchPrefix: {
    color: 'white',
    marginRight: 8,
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
    color: 'white',
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
  },
  searchItemText: {
    color: 'white',
    marginLeft: 12,
  },
});
