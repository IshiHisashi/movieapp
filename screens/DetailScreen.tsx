import React from "react";
import { View, Text, Image } from "@gluestack-ui/themed";
import { RouteProp, useRoute } from "@react-navigation/native";

type DetailScreenRouteProp = RouteProp<
  { DetailScreen: { data: any } },
  "DetailScreen"
>;

const DetailScreen: React.FC = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { data } = route.params;
  return (
    <View flexDirection="column" gap={32} p={48}>
      <Text textAlign="center" my={16} fontSize={24} fontWeight="bold">
        {data.title || data.name}
      </Text>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
        alt="data poster image"
        w={200}
        h={250}
        mx="auto"
        resizeMode="cover"
      />
      <Text fontSize={14}>{data.overview}</Text>
      <Text fontSize={11} fontWeight="$semibold">
        Populatity: {data.popularity} | Release Date: {data.release_date}
      </Text>
    </View>
  );
};

export default DetailScreen;
