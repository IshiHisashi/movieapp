import React from "react";
import {
  Box,
  View,
  Text,
  Image,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FetchedMovieData } from "types/types";

interface CardProps {
  data: FetchedMovieData;
  mode: string;
}

type DataInDetailScreen = {
  DetailScreen: { id: number; mode: string };
};
type DetailScreenNavigationProp = NativeStackNavigationProp<
  DataInDetailScreen,
  "DetailScreen"
>;

const Card: React.FC<CardProps> = ({ data, mode }) => {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const id = data.id;

  return (
    <Box py={10} px={20} flexDirection="row" gap={16}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w300${data.poster_path}` }}
        alt="data poster image"
        w={100}
        h={100}
        resizeMode="cover"
      />
      <View flexDirection="column" gap={4}>
        <Text fontWeight="$bold">{data.title || data.name}</Text>
        <Text fontSize={11}>Popularity: {data.popularity}</Text>
        <Text fontSize={11}>Release Date: {data.release_date}</Text>
        <Button
          size="md"
          w={200}
          bg="hotpink"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => {
            navigation.navigate("DetailScreen", { id, mode });
          }}
        >
          <ButtonText>More Details</ButtonText>
        </Button>
      </View>
    </Box>
  );
};

export default Card;
