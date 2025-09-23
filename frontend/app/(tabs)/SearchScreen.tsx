import { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchMovies, searchTVShows } from '@/src/api/tmdb';
import MovieCard from '@/src/components/MovieCard';
import TVShowCard from '@/src/components/TVShowCard';
import { useFonts as useInterFonts, Inter_700Bold, Inter_600SemiBold, Inter_500Medium } from "@expo-google-fonts/inter";

export default function SearchScreen() {
  useInterFonts({ Inter_700Bold, Inter_600SemiBold, Inter_500Medium });

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<'Movie' | 'TV Show'>('Movie');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const exists = recentSearches.some(
    search => search.toLowerCase() === query.toLowerCase()
  );
  if (query && !exists) {
    recentSearches.unshift(query);
  }

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeSearchItem = (index: number) => {
    setRecentSearches(prev => prev.filter((_, i) => i !== index));
  };

  const setSearchText = (text: string) => {
    setQuery(text);
  }

  const handleSearchSubmit = async () => {
    if (query.length > 1) {
      const results = selectedType === 'Movie'
        ? await searchMovies(query)
        : await searchTVShows(query);
      setResults(results);
    }
  };

  useEffect(() => {
    const handleTimeout = setTimeout(async () => {
      if (query.length > 1) {
        const results = selectedType === 'Movie'
          ? await searchMovies(query)
          : await searchTVShows(query);
        setResults(results);
      } else {
        setResults([]);
      }
    }, 500); // Debounce for 500ms

    return () => clearTimeout(handleTimeout);
  }, [query]);

  return (

    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="close" size={24} color="#B1B8B9" style={{ paddingHorizontal: 16, paddingVertical: 23 }} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a movie or tv show</Text>
      </View>

      {/* Dropdown */}
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.dropdown} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Text style={styles.dropdownText}>{selectedType}</Text>
          <Ionicons name="chevron-down" size={24} color="#FACC15" style={{ marginRight: 21 }} />
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
          placeholder="Search a movie or tv show"
          placeholderTextColor="#576568"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />

        {/* erases text from search bar */}
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={24} color="#B1B8B9" style={{ paddingHorizontal: 16, paddingVertical: 20 }} />
          </TouchableOpacity>
        )}
      </View>

      {query.length === 0 && recentSearches.length > 0 ? (
        <View>
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
                  <Ionicons name="time" size={18} color="#B1B8B9" style={{ paddingHorizontal: 16 }} />
                  <Text style={styles.searchItemText} numberOfLines={1} ellipsizeMode="tail">{item}</Text>
                </TouchableOpacity>

                {/* removes a search? */}
                <TouchableOpacity onPress={() => removeSearchItem(index)}>
                  <Ionicons name="close" size={24} color="#B1B8B9" style={{ paddingLeft: 4, paddingRight: 16 }} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>) : (
        // Search Results
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            item.media_type === 'tv' ? (
              <TVShowCard
                poster_path={item.poster_path}
                name={item.name}
                first_air_date={item.first_air_date}
                id={item.id}
              />
            ) : (
              <MovieCard
                poster_path={item.poster_path}
                title={item.title}
                release_date={item.release_date}
                id={item.id}
              />
            )
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#04191E",
  //   padding: 16,
  // },
  // input: {
  //   backgroundColor: "#1b263b",
  //   color: "white",
  //   borderRadius: 12,
  //   paddingHorizontal: 12,
  //   paddingVertical: 8,
  //   marginBottom: 16,
  // },
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
});
