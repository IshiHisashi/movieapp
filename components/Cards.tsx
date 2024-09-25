import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView } from "@gluestack-ui/themed";
import Card from "./Card";
import axios from "axios";
import { MovieData } from "../types/types";
import { APIKEY } from "@env";

interface CardsProps {
  category: string;
  mode: string;
}

const Cards: React.FC<CardsProps> = ({ category, mode }) => {
  const [fetchedData, setFetchedData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<any>(
          `https://api.themoviedb.org/3/${mode}/${category}?api_key=${APIKEY}`
        );
        setFetchedData(res.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);
  return (
    <View>
      <FlatList
        data={fetchedData}
        renderItem={({ item }: { item: any }) => {
          return <Card data={item} mode={mode} />;
        }}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />
    </View>
  );
};

export default Cards;
