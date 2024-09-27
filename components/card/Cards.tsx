import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView } from "@gluestack-ui/themed";
import Card from "./Card";
import { FetchedMovieData } from "types/types";

interface CardsProps {
  mode: string;
  fetchedData: FetchedMovieData[];
}

const Cards: React.FC<CardsProps> = ({ mode, fetchedData }) => {
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
