import React, { useState } from "react";
import { Text, View } from "@gluestack-ui/themed";
import Dropdown from "./Dropdown";
import Cards from "./Cards";

const Container: React.FC = ({ mode }: { mode: string }) => {
  const [category, setCategory] = useState<string>(
    mode === "movie" ? "now_playing" : "airing_today"
  );
  return (
    <View flexDirection="column" gap={10} pt={16} alignItems="center">
      <Dropdown setCategory={setCategory} category={category} mode={mode} />
      <Cards category={category} mode={mode} />
    </View>
  );
};

export default Container;
