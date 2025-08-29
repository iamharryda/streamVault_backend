import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { useFonts as useInterFonts, Inter_700Bold, Inter_600SemiBold, Inter_500Medium } from "@expo-google-fonts/inter";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useRouter } from "expo-router";
import Xbutton from '../components/icons/Xbutton';
import CalendarIcon from '../components/icons/Calendar';

export default function MovieReviewForm() {
  const router = useRouter();

  useInterFonts({ Inter_700Bold, Inter_600SemiBold, Inter_500Medium });
  const [rating, setRating] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [remember, setRemember] = useState(false);
  const [review, setReview] = useState('');
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleStarPress = (index: number) => {
    setRating(index + 1);
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleDateChange = (_event: any, date?: Date) => {
  if (Platform.OS === 'android') {
    setShowDatePicker(false); 
  }
  if (date) {
    setSelectedDate(date);
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.navButton}>
          <Xbutton color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Lorem Ipsum </Text>
        <TouchableOpacity style={styles.navButton}>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.placeholderImage} />
        <Text style={styles.title}>Hannibal <Text style={styles.subtitle}>2001</Text></Text>
      </View>
      <Text style={styles.subtitle}>Directed by Ridley Scott</Text>


      <Text style={styles.label}>Your Rating</Text>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
            <FontAwesome name={i < rating ? 'star' : 'star-o'} size={32} color="#FACC15" />
          </TouchableOpacity>
        ))}
        <Text style={styles.ratingText}>{rating}/5</Text>
      </View>

      <Text style={styles.label}>Date Watched</Text>
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}
        disabled={remember}
      >
        <View style={styles.datePickerContent}>
          <CalendarIcon color={remember ? '#576568' : '#B1B8B9'} />
          <Text style={[styles.dateText, remember && styles.disabledDateText]}>
            {selectedDate ? selectedDate.toDateString() : 'Select a date'}
          </Text>
        </View>
      </TouchableOpacity>
    {showDatePicker && (
     <DateTimePicker
        value={selectedDate || new Date()}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={handleDateChange}
        />
        )}
      <View style={styles.switchRow}>
        <Switch value={remember} onValueChange={setRemember} {...Platform.select({ web: { activeThumbColor: "#FACC15" } })}/>
        <Text style={styles.switchLabel}>I don't remember</Text>
      </View>

      <Text style={styles.label}>Your Review</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="What did you think of the movie/tv show?"
        placeholderTextColor="#aaa"
        maxLength={1000}
        value={review}
        onChangeText={setReview}
      />
      <View style={styles.switchRow}>
        <Switch value={containsSpoilers} onValueChange={setContainsSpoilers} {...Platform.select({ web: { activeThumbColor: "#FACC15" } })} />
        <Text style={styles.switchLabel}>Contains spoilers</Text>
      </View>

      <Text style={styles.label}>Add Tags</Text>  
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => handleDeleteTag(tag)}
            style={styles.tag}
          >
            <Text style={styles.tagText}>#{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.tagInputRow}>
        <TextInput
          style={styles.tagInput}
          placeholder="Add a tag"
          placeholderTextColor="#576568"
          value={newTag}
          onChangeText={setNewTag}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTag}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#04191E' 
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#  '
  },
  navButton: {
    width: 40,
    alignItems: 'center'
  },
  navTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold' as const
  },
  scrollContainer: { 
    padding: 16 
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeholderImage: {
    width: 40,
    height: 60,
    backgroundColor: '#333',
    marginRight: 16,
    borderRadius: 6,
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff' },

  subtitle: { 
    fontSize: 14, 
    color: '#aaa' },

  label: { 
    color: '#fff', 
    fontSize: 14, 
    marginTop: 35    }
    ,
  ratingContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    marginTop: 10 },

  ratingText: { 
    color: '#8C9598', 
    marginLeft: 170 },

  datePicker: { 
    backgroundColor: '#0D282F',
    padding: 12, 
    borderRadius: 8, 
    marginTop: 10,
    height: 48,
    justifyContent: 'center' },
  datePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
  },
  disabledDateText: {
    color: '#576568'
  },

  switchRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 12,
    gap: 14,
    marginBottom: 8
  },

  switchLabel: { 
    color: '#fff',
    fontSize: 14,
    flex: 1
  },

  textArea: {
    backgroundColor: '#0D282F',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    height: 120,
    marginTop: 10,
    textAlignVertical: 'top',
  },

  tagsContainer: { 
    flexDirection: 'row', 
    color: '#0D282F',
    flexWrap: 'wrap', 
    gap: 8, 
    marginTop: 10 },

  tag: { 
    backgroundColor: 'rgba(31, 41, 55, 0.8)', 
    paddingHorizontal: 12,
    paddingVertical: 6, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },

  tagInputRow: { 
    flexDirection: 'row', 
    marginTop: 10 },

  tagInput: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addButtonText: { color: '#fff', fontSize: 28, textAlign: 'center' },
  submitButton: {
    backgroundColor: '#FACC15',
    marginTop: 30,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: { fontWeight: 'bold', color: '#000' },
});
