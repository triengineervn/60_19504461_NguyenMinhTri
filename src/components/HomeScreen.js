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
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

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
  console.log(data);
  return (
    <View style={styles.background}>
      <Text style={[styles.title, { color: "#F1B000" }]}>
        Welcome, {user ? user.username : "Guest"}!
      </Text>
      <Text style={styles.title}>Money App</Text>
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
  notes: state.notes.notes,
});

const mapDispatchToProps = {
  addNote,
  updateNote,
  deleteNote,
  loadNotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

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
