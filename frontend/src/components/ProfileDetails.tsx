import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileDetails: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={require('../../app/assets/images/Ellipse.png')} // Adjust the path based on your project structure
        style={styles.profileImage}
      />
      {/* User Details */}
      <View style={styles.details}>
        <Text style={styles.userName}>Jane Doe</Text>
        <Text style={styles.userLocation}>Dublin, Ireland</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent', // Matches the dark teal background from the image
    padding: 10,
    paddingBottom: 30,
    
    borderBottomWidth: 1,
    borderBottomColor: '#2a3b4d',
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 25, // Makes it circular
    marginRight: 10,
  },
  details: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userLocation: {
    color: '#ccc',
    fontSize: 12,
  },
});

export default ProfileDetails;
