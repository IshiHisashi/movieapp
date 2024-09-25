import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { GluestackUIProvider, Text, Box, View } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import MoviesScreen from "./screens/MoviesScreen";
import SearchScreen from "./screens/SearchScreen";
import TvShowsScreen from "./screens/TvShowsScreen";
import DetailScreen from "screens/DetailScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12.5, textTransform: "none" },
        tabBarIndicatorStyle: {
          backgroundColor: "gray",
        },
      }}
    >
      <Tab.Screen name="Movies" component={MoviesScreen} />
      <Tab.Screen name="Search Results" component={SearchScreen} />
      <Tab.Screen name="TV shows" component={TvShowsScreen} />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{
              title: "Movies App",
              headerStyle: { backgroundColor: "#1E2A39" },
              headerTintColor: "#ddd",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={({ route }) => ({
              title: route.params?.data.title || "More Details",
              headerTintColor: "#333",
              headerBackTitle: "Back",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;
