import { connect } from "react-redux";
import { loginUser, signUpUser } from "../redux/auth/actions";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";

const LoginScreen = ({ navigation, loginUser, signUpUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://6572aae9192318b7db407e1b.mockapi.io/mydata")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const checkLogin = (username, password) => {
    const user = data.find(
      (item) => item.username === username && item.password === password
    );
    if (user) {
      loginUser(user);
      navigation.push("Home Screen");
    } else {
      alert("Wrong username or password");
    }
  };


  return (
    <View style={styles.background}>
      <View style={{height: 50}}></View>
      <Text style={{fontSize: 30, fontWeight: 600}}>LOGIN</Text>
      <View style={{height: 200}}></View>
      <TextInput
        style={styles.textInput}
        label="Username"
        mode="outlined"
        textColor="black"
        onChangeText={(text) => {
          setUsername(text);
        }}
        value={username}
        theme={styles.textInputOutlineStyle}
      />
      <TextInput
        style={styles.textInput}
        label="Password"
        mode="outlined"
        secureTextEntry={true}
        textColor="black"
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        theme={styles.textInputOutlineStyle}
      />
      <Text style={{ marginBottom: 40 }}>
        Forgot your password?{" "}
        <Text style={{ color: "#F1B000" }}>Click here</Text>
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => checkLogin(username, password)}
      >
        <Text style={styles.textBtn}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
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
});
