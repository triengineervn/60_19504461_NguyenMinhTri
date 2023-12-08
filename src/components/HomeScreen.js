import { connect } from "react-redux";
import {
  addNote,
  updateNote,
  deleteNote,
  loadNotes,
} from "../redux/todolist/actions";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";

const HomeScreen = ({
  navigation,
  user,
}) => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(-1);
  const apiUrl = "https://6572aae9192318b7db407e1b.mockapi.io/mydata";

  useEffect(() => {
    fetch(`${apiUrl}/${user.id}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
    loadNotes(data);
  }, [data]);

  const renferItem = ({ item }) => {
    console.log(item);
    return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.filter}>{item.content}</Text>
      </View>
    </View>
  );
}
  
  return (
    <View style={styles.background}>
      <Text style={[styles.title, { color: "#F1B000" }]}>
        Welcome, {user ? user.username : "Guest"}!
      </Text>
      <Text style={[styles.title, { color: "#F1B000" }]}>
       id: {user ? user.id : "Guest"}
      </Text>
      <Text style={[styles.title, { color: "#F1B000" }]}>
       pass: {user ? user.password : "Guest"}
      </Text>
      <FlatList
          data={data}
          renderItem={renferItem}
          keyExtractor={(item) => item.content}
        ></FlatList>
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.textBtn}>Money In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.textBtn}>Money Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textBtn}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});


export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    margin: 12,
    fontSize: 24,
    fontWeight: 700,
  },
  text: {
    fontSize: 18,
    fontWeight: 600,
  },
  textBtn: {
    fontSize: 20,
    fontWeight: 700,
  },
  textInput: {
    marginBottom: 8,
    width: 300,
    borderRadius: 3,
  },
  textInputOutlineStyle: {
    colors: {
      primary: "#F1B000",
      underlineColor: "transparent",
      background: "white",
    },
  },
  button: {
    alignItems: "center",
    padding: 12,
    margin: 12,
    width: 300,
    backgroundColor: "#F1B000",
    borderRadius: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 12,
    alignItems: "center",
  },
});
