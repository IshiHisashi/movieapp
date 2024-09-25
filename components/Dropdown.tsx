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
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  mode: string;
}

const Dropdown: React.FC<DropdownProps> = ({ category, setCategory, mode }) => {
  const categoryList: string[] =
    mode === "movie"
      ? ["now_playing", "popular", "top_rated", "upcoming"]
      : ["airing_today", "on_the_air", "popular", "top_rated"];
  const [showActionsheet, setShowActionsheet] = useState<boolean>(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const handlePress = (cat) => {
    setCategory(cat);
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
          <Text fontSize={14}>{category}</Text>
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
                backgroundColor: category === item ? "#0EA273" : "transparent",
              }}
            >
              <ActionsheetItemText
                style={{
                  color: category === item ? "white" : "black",
                }}
              >
                {item}
              </ActionsheetItemText>
            </ActionsheetItem>
          ))}

          {/* <ActionsheetItem
            onPress={() => handlePress("now_playing")}
            style={{
              backgroundColor:
                category === "now_playing" ? "#0EA273" : "transparent",
            }}
          >
            <ActionsheetItemText
              style={{
                color: category === "now_playing" ? "white" : "black",
              }}
            >
              now_playing
            </ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem
            onPress={() => handlePress("popular")}
            style={{
              backgroundColor:
                category === "popular" ? "#0EA273" : "transparent",
            }}
          >
            <ActionsheetItemText
              style={{
                color: category === "popular" ? "white" : "black",
              }}
            >
              popular
            </ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem
            onPress={() => handlePress("top_rated")}
            style={{
              backgroundColor:
                category === "top_rated" ? "#0EA273" : "transparent",
            }}
          >
            <ActionsheetItemText
              style={{
                color: category === "top_rated" ? "white" : "black",
              }}
            >
              top_rated
            </ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem
            onPress={() => handlePress("upcoming")}
            style={{
              backgroundColor:
                category === "upcoming" ? "#0EA273" : "transparent",
            }}
          >
            <ActionsheetItemText
              style={{
                color: category === "upcoming" ? "white" : "black",
              }}
            >
              upcoming
            </ActionsheetItemText>
          </ActionsheetItem> */}
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};

export default Dropdown;
