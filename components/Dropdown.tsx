import React, { useState } from "react";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
  Pressable,
  Box,
  Text,
  View,
} from "@gluestack-ui/themed";

interface DropdownProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
}

const Dropdown: React.FC<DropdownProps> = ({ state, setState, mode }) => {
  const categoryList: string[] =
    mode === "movie"
      ? ["now_playing", "popular", "top_rated", "upcoming"]
      : mode === "tv"
      ? ["airing_today", "on_the_air", "popular", "top_rated"]
      : ["movie", "multi", "tv"];
  const [showActionsheet, setShowActionsheet] = useState<boolean>(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const handlePress = (cat: string) => {
    setState(cat);
    setShowActionsheet(!showActionsheet);
  };
  return (
    <Box>
      <Pressable onPress={handleClose}>
        <View
          bgColor="#fff"
          w={200}
          h={30}
          borderWidth={1}
          borderColor="#ddd"
          borderRadius={4}
          py={4}
          pl={10}
        >
          <Text fontSize={14}>{state}</Text>
        </View>
      </Pressable>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$72" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {categoryList.map((item, index) => (
            <ActionsheetItem
              onPress={() => handlePress(item)}
              style={{
                backgroundColor: state === item ? "#0EA273" : "transparent",
              }}
              key={index}
            >
              <ActionsheetItemText
                style={{
                  color: state === item ? "white" : "black",
                }}
              >
                {item}
              </ActionsheetItemText>
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};

export default Dropdown;
