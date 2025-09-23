// Account screen with profile, avatar upload, stats, and menu
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { IUserProfile } from "@/src/types/interfaces/iUser";

const STAT_ICONS = {
  ratings: require("../../assets/icons/Ratings.png"),
  reviews: require("../../assets/icons/Reviews.png"),
  watchlist: require("../../assets/icons/Watchlist.png"),
  favorites: require("../../assets/icons/Favorites.png"),
} as const;

type StatKey = keyof typeof STAT_ICONS;

interface Stat {
  key: StatKey;
  label: string;
  value: number;
}

interface MenuItem {
  key: string;
  icon: string;
  label: string;
}

const MENU: MenuItem[] = [
  { key: "myreviews", icon: "pencil-outline", label: "My Reviews" },
  { key: "watchlist", icon: "monitor", label: "Watchlist" },
  { key: "favorites", icon: "heart", label: "Favorites" },
  {
    key: "followers",
    icon: "account-multiple-outline",
    label: "Followers & Following",
  },
  { key: "badges", icon: "trophy-outline", label: "Badges & Achievements" },
];

// Skeleton loader for simulating profile loading state
const SkeletonLoader = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonAvatar} />
    <View style={styles.skeletonName} />
    <View style={styles.skeletonUsername} />
    <View style={styles.skeletonButtons}>
      <View style={styles.skeletonButton} />
      <View style={styles.skeletonButton} />
    </View>
    <View style={styles.skeletonName}></View>
    <View style={styles.skeletonName}></View>
    <View style={styles.skeletonName}></View>
  </View>
);

// Error state with retry button
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <View style={styles.errorContainer}>
    <Ionicons name="alert-circle-outline" size={48} color="#9FBDB9" />
    <Text style={styles.errorText}>Failed to load profile</Text>
    <TouchableOpacity
      style={styles.retryButton}
      onPress={onRetry}
      activeOpacity={0.8}
    >
      <Text style={styles.retryButtonText}>Retry</Text>
    </TouchableOpacity>
  </View>
);

export default function AccountScreen() {
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<IUserProfile | null>(null);

  // Fetch user profile from API
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      const profileResponse = await axios.get<IUserProfile>(
        "/api/user/profile"
      );
      setProfile(profileResponse.data);
    } catch (err) {
      console.error("Error fetching profile data:", err);

      // Mock data for development/demo purposes
      setProfile({
        name: "Jane Doe",
        username: "@jane_doe",
        avatar: "https://i.pravatar.cc/300",
        userStats: {
          ratings: 224,
          reviews: 156,
          watchlist: 89,
          favorites: 67,
        },
      });

      // setError(axios.isAxiosError(err) ? err.message : 'Unknown error occurred');
    } finally {
      // Small delay for better skeleton loader UX
      setTimeout(() => setLoading(false), 500);
    }
  };

  // Pick image from gallery and upload as avatar
  const handleAvatarPress = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission required",
          "Permission to access camera roll is required!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image");
    }
  };

  // Upload avatar to the server
  const uploadAvatar = async (imageUri: string) => {
    try {
      setUploadingAvatar(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("avatar", {
        uri: imageUri,
        type: "image/jpeg", // required by server
        name: "avatar.jpg", // arbitrary file name
      } as unknown as Blob);

      // Send to mock server
      const response = await axios.post(
        "base_url/user/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update profile with new avatar
      if (profile) {
        setProfile({
          ...profile,
          avatar: response.data.avatarUrl || imageUri, // fallback to local URI if server doesn't return one
        });
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);

      // Fallback: update avatar locally in demo mode
      if (profile) {
        setProfile({
          ...profile,
          avatar: imageUri,
        });
      }

      Alert.alert("Avatar Updated", "Avatar updated locally (demo mode)");
    } finally {
      setUploadingAvatar(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleRetry = () => {
    fetchProfileData();
  };

  // Transform stats object into array for rendering
  const statsArray: Stat[] = profile
    ? [
        { key: "ratings", label: "Ratings", value: profile.userStats.ratings },
        { key: "reviews", label: "Reviews", value: profile.userStats.reviews },
        {
          key: "watchlist",
          label: "Watchlist",
          value: profile.userStats.watchlist,
        },
        {
          key: "favorites",
          label: "Favorites",
          value: profile.userStats.favorites,
        },
      ]
    : [];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Top header area */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#BFDCDC" />
        </TouchableOpacity>

        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <ErrorState onRetry={handleRetry} />
        ) : profile ? (
          <>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: profile.avatar || " "}} style={styles.avatar} />
              <TouchableOpacity
                style={styles.addIcon}
                activeOpacity={0.8}
                onPress={handleAvatarPress}
                disabled={uploadingAvatar}
              >
                {uploadingAvatar ? (
                  <ActivityIndicator size={12} color="#052426" />
                ) : (
                  <Feather name="plus" size={12} color="#052426" />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.username}>{profile.username}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.8}>
                <Text style={styles.outlineBtnText}>Edit profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.8}>
                <Text style={styles.outlineBtnText}>Share profile</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>

      {/* Stats cards */}
      {!loading && !error && profile?.userStats && (
        <View style={styles.statsContainer}>
          {statsArray.map((s) => (
            <TouchableOpacity
              key={s.key}
              style={styles.statCard}
              activeOpacity={0.8}
            >
              <View style={styles.statIconWrap}>
                <Image
                  source={STAT_ICONS[s.key]}
                  style={styles.statIconImage}
                />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Menu list */}
      {!loading && !error && (
        <FlatList
          data={MENU}
          keyExtractor={(i) => i.key}
          contentContainerStyle={styles.menuList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuLeft}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={18}
                  color="#9FBDB9"
                />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#123"
                style={styles.chev}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#04171B",
  },
  header: {
    backgroundColor: "#04171B",
    paddingTop: 18,
    paddingBottom: 18,
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    left: 16,
    top: 18,
    padding: 8,
  },
  avatarWrap: {
    marginTop: 8,
    marginBottom: 10,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#052426",
  },
  addIcon: {
    position: "absolute",
    right: -4,
    bottom: -4,
    backgroundColor: "#ffffffff",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#052426",
  },
  name: {
    color: "#E8F6F4",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },
  username: {
    color: "#9FBDB9",
    fontSize: 13,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "#ffffffff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  outlineBtnText: {
    color: "#CFECEC",
    fontWeight: "600",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#0D282F",
    marginHorizontal: 6,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  statIconWrap: {
    backgroundColor: "rgba(255,210,74,0.12)",
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  statValue: {
    color: "#E8F6F4",
    fontWeight: "700",
    fontSize: 16,
  },
  statLabel: {
    color: "#9FBDB9",
    fontSize: 11,
    marginTop: 4,
  },
  statIconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  menuList: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 120,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#0D282F",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuLabel: {
    color: "#E6F7F5",
    marginLeft: 12,
    fontSize: 15,
  },
  chev: {
    opacity: 0.6,
  },

  // Skeleton styles
  skeletonContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  skeletonAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#0D282F",
    marginBottom: 10,
  },
  skeletonName: {
    width: 120,
    height: 18,
    backgroundColor: "#0D282F",
    borderRadius: 4,
    marginTop: 6,
    marginBottom: 6,
  },
  skeletonUsername: {
    width: 80,
    height: 13,
    backgroundColor: "#0D282F",
    borderRadius: 4,
    marginTop: 4,
  },
  skeletonButtons: {
    flexDirection: "row",
    marginTop: 12,
  },
  skeletonButton: {
    width: 90,
    height: 32,
    backgroundColor: "#0D282F",
    borderRadius: 6,
    marginHorizontal: 8,
  },

  // Error styles
  errorContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    color: "#9FBDB9",
    fontSize: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#FFD24A",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryButtonText: {
    color: "#052426",
    fontWeight: "600",
  },
});
