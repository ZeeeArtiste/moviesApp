import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const AddFilmsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState("");

  const addFilm = () => {
    const newFilm = {
      id: Math.random().toString(),
      title: title.trim(),
      author: author.trim(),
      date: date.trim(),
      rating: rating.trim(),
    };
    navigation.navigate("Films", { newFilm: newFilm }); // Navigue vers l'écran "Films" en passant le nouveau film en paramètre
    // Réinitialise les states
    setTitle("");
    setAuthor("");
    setDate("");
    setRating("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>🎞</Text>
        <TextInput
          style={styles.input}
          placeholder="Titre du film"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>🎥</Text>
        <TextInput
          style={styles.input}
          placeholder="Réalisateur du film"
          onChangeText={(text) => setAuthor(text)}
          value={author}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>📅</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Date de sortie"
          onChangeText={(text) => setDate(text)}
          value={date}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>⭐</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Note sur 10"
          onChangeText={(text) => setRating(text)}
          value={rating}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={addFilm}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  button: {
    borderRadius: 15,
    width: "33%",
    padding: 10,
    backgroundColor: "#202020",
  },
  buttonText: {
    textAlign: "center",
    color: "#ffff",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
export default AddFilmsScreen;
