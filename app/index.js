import React, { useState, useEffect } from "react";
import { Text, View, Button, TextInput, FlatList } from "react-native";

const sortAndFilter = function (data, filter, ascending) {
  var items;

  if (filter) {
    items = data.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
  } else {
    items = data;
  }

  items.sort(
    ascending
      ? (a, b) => (b.key > a.key ? -1 : a.key === b.key ? 0 : 1)
      : (a, b) => (a.key > b.key ? -1 : a.key === b.key ? 0 : 1)
  );

  return items;
};

export default function App() {
  const [asc, setAsc] = useState(true);
  const [filt, setFilt] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://universities.hipolabs.com/search?country=Canada")
      .then((resp) => resp.json())
      .then((universities) => {
        setData(
          universities.map((u, i) => {
            return {
              key: i.toString(),
              title: u.name,
            };
          })
        );
      });
  });

  return (
    /*<View>
      <FlatList
        data={itemsToShow}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
    */

    <View>
      <View>
        <Button
          title={`Sort ${asc ? "Ascending" : "Descending"} `}
          onPress={(e) => setAsc(!asc)}
        />
        <TextInput
          placeholder="Search Text"
          defaultValue={filt}
          onChangeText={(e) => setFilt(e)}
        />
        <FlatList
          data={sortAndFilter(data, filt, asc)}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
      </View>
    </View>
  );
}
