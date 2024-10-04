import React, { useState, useEffect } from "react";
import { View, Button, Text } from "@gluestack-ui/themed";
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
  const [page, setPage] = useState<number>(1);
  const [tmdbPage, setTmdbPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data from TMDB API, 20 results per page
  const fetchData = async (category: string, tmdbPage: number) => {
    setLoading(true);
    try {
      const res = await axios.get<any>(
        `https://api.themoviedb.org/3/${mode}/${category}?api_key=${APIKEY}&page=${tmdbPage}`
      );
      setFetchedData(res.data.results);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(category, tmdbPage);
  }, [category, tmdbPage]);

  const getCurrentPageData = () => {
    const startIdx = page % 2 === 1 ? 0 : 10;
    return fetchedData.slice(startIdx, startIdx + 10);
  };

  const handleNextPage = () => {
    if (page % 2 === 1 && fetchedData.length > 10) {
      setPage(page + 1);
    } else {
      setPage(page + 1);
      setTmdbPage(tmdbPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page % 2 === 0) {
      setPage(page - 1);
    } else {
      setPage(page - 1);
      setTmdbPage(tmdbPage - 1);
    }
  };

  return (
    <View flex={1} flexDirection="column" gap={10} pt={16} alignItems="center">
      <Dropdown setState={setCategory} state={category} mode={mode} />
      <View flex={1} width="100%">
        <Cards mode={mode} fetchedData={getCurrentPageData()} />
      </View>

      {/* Pagination Controls */}
      <View
        flexDirection="row"
        gap={4}
        justifyContent="space-between"
        alignItems="center"
        my={15}
      >
        <Button
          disabled={page === 1 && tmdbPage === 1}
          onPress={handlePreviousPage}
          width={70}
          backgroundColor="hotpink"
        >
          <Text color="white" fontSize={12} fontWeight="bold">
            Prev
          </Text>
        </Button>
        <Text>
          Page {page} of {totalPages}
        </Text>
        <Button
          disabled={fetchedData.length < 20 && page % 2 === 0}
          onPress={handleNextPage}
          width={70}
          backgroundColor="hotpink"
        >
          <Text color="white" fontSize={12} fontWeight="bold">
            Next
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Container;
