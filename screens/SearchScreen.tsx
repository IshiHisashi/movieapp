import React, { useState } from "react";
import {
  Button,
  ButtonText,
  ButtonIcon,
  View,
  Text,
  Input,
  InputSlot,
  InputField,
  InputIcon,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "components/Dropdown";
import Cards from "components/card/Cards";
import axios from "axios";
import { APIKEY } from "@env";

const SearchScreen: React.FC = () => {
  const [genre, setGenre] = useState<string>("movie");
  const [searchName, setSearchName] = useState<string>("");
  const [searchedData, setSearchedData] = useState();
  const [isSearched, setIsSearched] = useState<boolean>(false);

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
    }
  };

  const handleSearch = () => {
    console.log(searchName);
    setIsSearched(true);
    fetchData();
  };

  return (
    <View flexDirection="column" gap={10} p={16}>
      <View px={20}>
        <Text fontWeight="$semibold">Search Movie/TV Show Name</Text>
        <Input>
          <InputSlot pl="$3">
            <Ionicons name="search" size={20} color="gray" />
          </InputSlot>
          <InputField placeholder="Search..." onChangeText={setSearchName} />
        </Input>
        <Text fontWeight="$semibold">Choose Search Type</Text>
        <View flexDirection="row" alignItems="center" gap={20}>
          <Dropdown setState={setGenre} state={genre} mode="search" />
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
        <Text fontSize={12}>Please select a search type</Text>
      </View>
      {isSearched ? (
        <Cards mode="search" fetchedData={searchedData} />
      ) : (
        <View flexDirection="column">
          <Text alignSelf="center" fontSize={24} fontWeight="$bold">
            Please initiate a search
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
