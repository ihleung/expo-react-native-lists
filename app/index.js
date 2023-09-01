import React from "react";
import { Text, View, FlatList } from "react-native";

const itemsToShow = new Array(10)
  .fill(null)
  .map((v, i) => ({ key: i.toString(), title: `Item ${i}` }));

export default function App() {
  return (
    <View>
      <FlatList
        data={itemsToShow}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
