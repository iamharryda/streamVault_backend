import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const router = useRouter();
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const popular = async () => {
      const movies = await getPopularMovies();
      setPopularMovies(movies);
    };

    popular();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#04191E' }}>
      <ScrollView>
        {/* Search Bar */}
        <SearchButton></SearchButton>

        <MovieSection sectionTitle="Popular on StreamVault" movies={popularMovies} />
      </ScrollView>
    </SafeAreaView>
  );
}
