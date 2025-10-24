import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileDetails from './ProfileDetails';

// ICONS
import TrendingIcon from '@/app/assets/icons/General/Trending.svg';
import SearchIcon from '@/app/assets/icons/General/Search.svg';
import WatchlistIcon from '@/app/assets/icons/General/Watchlist.svg';
import RecentlyWatchedIcon from '@/app/assets/icons/General/About.svg';
import ListsIcon from '@/app/assets/icons/General/Lists.svg';
import ActivityIcon from '@/app/assets/icons/General/Activity.svg';
import LanguageIcon from '@/app/assets/icons/General/Language.svg';
import SettingsIcon from '@/app/assets/icons/General/Settings.svg';
import AboutIcon from '@/app/assets/icons/General/About.svg';
import LogoutIcon from '@/app/assets/icons/General/Logout.svg';

import { useRouter } from 'expo-router';

type MenuItem =
  | 'Trending'
  | 'Search'
  | 'Watchlist'
  | 'Recently Watched'
  | 'Lists'
  | 'Activity'
  | 'Language & Region'
  | 'Settings'
  | 'About StreamVault'
  | 'Log out';

export default function MovieExplore() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleMenuPress = (item: MenuItem) => {
    setSelectedItem(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.profileContainer}>
          <ProfileDetails />
        </View>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Trending')}
        >
          <TrendingIcon
            height={24}
            width={24}
            color={"#ccc"}
            fill={selectedItem === 'Trending' ? '#FFD700' : '#ccc'}
          />
          <Text
            style={[
              styles.menuText,
              { color: selectedItem === 'Trending' ? '#FFD700' : '#ccc' },
            ]}
          >
            Trending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Search')}
        >
          <SearchIcon
            height={24}
            width={24}
            color={"#ccc"}
            fill={selectedItem === 'Search' ? '#FFD700' : '#ccc'}
          />
          <Text
            style={[
              styles.menuText,
              { color: selectedItem === 'Search' ? '#FFD700' : '#ccc' },
            ]}
          >
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Watchlist')}
        >
          <WatchlistIcon
            height={24}
            width={24}
            color={"#ccc"}
            fill={selectedItem === 'Watchlist' ? '#FFD700' : '#ccc'}
          />
          <Text
            style={[
              styles.menuText,
              { color: selectedItem === 'Watchlist' ? '#FFD700' : '#ccc' },
            ]}
          >
            Watchlist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Recently Watched')}
        >
          <RecentlyWatchedIcon
            height={24}
            width={24}
            color={"#ccc"}
            fill={selectedItem === 'Recently Watched' ? '#FFD700' : '#ccc'}
          />
          <Text
            style={[
              styles.menuText,
              {
                color: selectedItem === 'Recently Watched' ? '#FFD700' : '#ccc',
              },
            ]}
          >
            Recently Watched
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Lists')}
        >
          <ListsIcon
            height={24}
            width={24}
            color={"#ccc"}
            fill={selectedItem === 'Lists' ? '#FFD700' : '#ccc'}
          />
          <Text
            style={[
              styles.menuText,
              { color: selectedItem === 'Lists' ? '#FFD700' : '#ccc' },
            ]}
          >
            Lists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Activity')}
        >
          <ActivityIcon
            height={24}
            width={24}
            color={"#ccc"}
            fill={selectedItem === 'Activity' ? '#FFD700' : '#ccc'}
          />
          <Text
            style={[
              styles.menuText,
              { color: selectedItem === 'Activity' ? '#FFD700' : '#ccc' },
            ]}
          >
            Activity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Language & Region')}
        >
          <LanguageIcon
            height={24}
            width={24}
            color={"#ccc"}
            fill={selectedItem === 'Language & Region' ? '#FFD700' : '#ccc'}
          />
          <Text
            style={[
              styles.menuText,
              {
                color: selectedItem === 'Language & Region' ? '#FFD700' : '#ccc',
              },
            ]}
          >
            Language & Region
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Settings')}
        >
          <SettingsIcon
            height={24}
            width={24}
            color={"#ccc"}
            fill={selectedItem === 'Settings' ? '#FFD700' : '#ccc'}
          />
          <Text
            style={[
              styles.menuText,
              { color: selectedItem === 'Settings' ? '#FFD700' : '#ccc' },
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('About StreamVault')}
        >
          <AboutIcon
            height={24}
            width={24}
            color={"#ccc"}
            fill={selectedItem === 'About StreamVault' ? '#FFD700' : '#ccc'}
          />
          <Text
            style={[
              styles.menuText,
              {
                color: selectedItem === 'About StreamVault' ? '#FFD700' : '#ccc',
              },
            ]}
          >
            About StreamVault
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress('Log out')}
        >
          <LogoutIcon
            height={24}
            width={24}
            color={"#ccc"}
            fill={selectedItem === 'Log out' ? '#FFD700' : '#ccc'}
          />
          <Text
            style={[
              styles.menuText,
              { color: selectedItem === 'Log out' ? '#FFD700' : '#ccc' },
            ]}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
  },
  profileContainer: {
    paddingBottom: 15,
  },
  sidebar: {
    width: 250,
    height: 700,
    backgroundColor: '#0D282F',
    paddingTop: 20,
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2a3b4d',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userLocation: {
    color: '#ccc',
    fontSize: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a252f',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
