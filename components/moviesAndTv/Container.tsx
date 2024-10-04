import React, { useState, useEffect } from "react";
import { View } from "@gluestack-ui/themed";
import Dropdown from "../Dropdown";
import Cards from "../card/Cards";
import axios from "axios";
import { APIKEY } from "@env";
import { FetchedMovieData } from "types/types";

interface ContainerProp {
  mode: string;
}

const Container: React.FC<ContainerProp> = ({ mode }) => {
  const [category, setCategory] = useState<string>(
    mode === "movie" ? "now_playing" : "airing_today"
  );
  const [fetchedData, setFetchedData] = useState<FetchedMovieData[]>([]);

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
    <View flexDirection="column" gap={10} pt={16} alignItems="center">
      <Dropdown setState={setCategory} state={category} mode={mode} />
      <Cards mode={mode} fetchedData={fetchedData} />
    </View>
  );
};

export default Container;
