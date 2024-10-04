import React, { useState } from "react";
import { Keyboard } from "react-native";
import {
  Button,
  ButtonText,
  View,
  Text,
  Input,
  InputSlot,
  InputField,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "components/Dropdown";
import Cards from "components/card/Cards";
import axios from "axios";
import { APIKEY } from "@env";
import { FetchedMovieData } from "types/types";

const SearchScreen: React.FC = () => {
  const [genre, setGenre] = useState<string>("movie");
  const [searchName, setSearchName] = useState<string>("");
  const [searchedData, setSearchedData] = useState<FetchedMovieData[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const res = await axios.get<any>(
        `https://api.themoviedb.org/3/search/${genre}?query=${encodeURIComponent(
          searchName
        )}&api_key=${APIKEY}`
      );
      setSearchedData(res.data.results);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSearched(true);
    }
  };

  const handleSearch = () => {
    Keyboard.dismiss();
    if (!searchName) {
      setHasError(true);
      return;
    }

    setHasError(false);
    fetchData();
  };

  return (
    <View flex={1} flexDirection="column" gap={10} p={16}>
      <View px={20}>
        <View flexDirection="row" alignItems="center">
          <Text fontWeight="$semibold">Search Movie/TV Show Name</Text>
          <Text color="red"> *</Text>
        </View>
        <Input borderColor={hasError ? "red" : "gray"}>
          <InputSlot pl="$3">
            <Ionicons name="search" size={20} color="gray" />
          </InputSlot>
          <InputField
            placeholder="i.e. James Bond, CSI..."
            onChangeText={setSearchName}
            value={searchName}
          />
        </Input>

        <View flexDirection="row" alignItems="center">
          <Text fontWeight="$semibold">Choose Search Type</Text>
          <Text color="red"> *</Text>
        </View>
        <View flexDirection="row" alignItems="center" gap={20}>
          <Dropdown
            setState={setGenre}
            state={genre}
            mode="search"
            hasError={hasError}
          />
          <Button
            size="md"
            w={100}
            variant="solid"
            bg="hotpink"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={handleSearch}
          >
            <Ionicons name="search" size={20} color="white" />
            <ButtonText>search</ButtonText>
          </Button>
        </View>
        {hasError ? (
          <Text fontSize={12} color="red">
            Movie/TV show name is required.
          </Text>
        ) : (
          <Text fontSize={12}>Please select a search type</Text>
        )}
      </View>

      {isSearched ? (
        <Cards mode="search" fetchedData={searchedData} />
      ) : (
        <View flexDirection="column">
          <Text
            alignSelf="center"
            fontSize={24}
            fontWeight="$bold"
            marginTop={100}
          >
            Please initiate a search
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
