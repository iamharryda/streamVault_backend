import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, ImageSourcePropType } from "react-native";

const backgroundImages: ImageSourcePropType[] = [
  require("../../../assets/images/jokerimage.png"), // Add more images
];

interface RandomImageBackgroundProps {
  children?: React.ReactNode;
  style?: object;
}

const RandomImageBackground: React.FC<RandomImageBackgroundProps> = ({
  children,
  style,
}) => {
  const [bgImage, setBgImage] = useState(backgroundImages[0]);
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  };
  useEffect(() => {
    setBgImage(getRandomImage());
  }, []);
  return (
    <ImageBackground
      source={bgImage}
      style={[styles.background, style]}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

export default RandomImageBackground;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
});
