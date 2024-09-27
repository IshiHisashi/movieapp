import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@gluestack-ui/themed";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { APIKEY } from "@env";
import { StackNavigationProp } from "@react-navigation/stack";

type DetailScreenRouteProp = RouteProp<
  { DetailScreen: { id: string; mode: string } },
  "DetailScreen"
>;

type NavigationProp = StackNavigationProp<any>;

const DetailScreen: React.FC = () => {
  const [detailData, setDetailData] = useState<any>();
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id, mode } = route.params;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${mode}/${id}?api_key=${APIKEY}`
        );
        setDetailData(response.data);

        navigation.setOptions({
          title: response.data.title || response.data.name || "More Details",
        });
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <View flexDirection="column" gap={32} p={48}>
      <Text textAlign="center" my={16} fontSize={24} fontWeight="bold">
        {detailData?.title || detailData?.name}
      </Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${detailData?.poster_path}`,
        }}
        alt="Poster image"
        w={200}
        h={250}
        mx="auto"
        resizeMode="cover"
      />
      <Text fontSize={14}>{detailData?.overview}</Text>
      <Text fontSize={11} fontWeight="$semibold">
        Populatity: {detailData?.popularity} | Release Date:{" "}
        {detailData?.release_date}
      </Text>
    </View>
  );
};

export default DetailScreen;
