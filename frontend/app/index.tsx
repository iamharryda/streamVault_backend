import { View } from "react-native";
import MovieSearch from './pages/MovieSearch';


export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <MovieSearch/>
    </View>
  );
}