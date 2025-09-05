import { View } from "react-native";
import MovieSearch from './pages/MovieSearch';
import Welcome from "./pages/Welcome";


export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      {/* <MovieSearch/> */}
      <Welcome></Welcome>
    </View>
  );
}