import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <View>
      <Text>Index</Text>
      <Pressable onPress={() => router.push("./Login")}>Login</Pressable>
      <Pressable onPress={() => router.push("./Register")}>Register</Pressable>
      <Pressable onPress={() => router.push("./Account")}>Account</Pressable>
    </View>
  );
};

export default index;
