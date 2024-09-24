import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Box width="100%" justifyContent="center" alignItems="center">
        <Text>Open up App.js to start working on your app!</Text>
      </Box>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
