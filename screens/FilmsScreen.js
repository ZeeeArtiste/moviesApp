import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FilmsScreen = (data) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function loadFilms() {
      try {
        const storedFilms = await AsyncStorage.getItem("films"); // Récupérer les films depuis le stockage
        if (storedFilms) {
          setFilms(JSON.parse(storedFilms)); // Mettre à jour la liste des films
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (data.route.params && data.route.params.newFilm) {
      addFilm(data.route.params.newFilm); // Ajouter un nouveau film si envoyé par l'autre composant
    } else {
      loadFilms(); // Charger les films
    }
  }, [data.route.params]); // Exécuter lorsque les paramètres de route changent

  // Ajouter un nouveau film à la liste
  const addFilm = async (newFilm) => {
    // Vérification des champs
    if (
      !(
        newFilm.title &&
        newFilm.author &&
        newFilm.date &&
        newFilm.rating &&
        newFilm.rating >= 0 &&
        newFilm.rating <= 10
      )
    ) {
      alert("Remplissez correctement les champs !");
      return;
    } else {
      updatedFilms = [...films, newFilm]; // Ajouter le nouveau film à la liste des films existante
      setFilms(updatedFilms); // Mettre à jour la liste des films
      try {
        await AsyncStorage.setItem("films", JSON.stringify(updatedFilms)); // Mettre à jour le stockage
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Fonction pour supprimer un film de la liste
  const remove = async (id) => {
    const updatedFilms = films.filter((item) => item.id !== id); // Filtrer les films pour supprimer le film avec l'ID donné
    setFilms(updatedFilms); // Mettre à jour la liste des films
    try {
      await AsyncStorage.setItem("films", JSON.stringify(updatedFilms)); // Mettre à jour le stockage avec la nouvelle liste des films
    } catch (error) {
      console.log(error);
    }
  };

  // Composant pour afficher un film dans la liste
  const FilmItem = ({ film }) => (
    <View style={styles.item}>
      <Text style={styles.icon}>🎬</Text>
      <View style={styles.info}>
        <Text style={styles.title}>{film.title}</Text>
        <Text style={styles.author}>
          {film.author} ({film.date})
        </Text>
        <Text style={styles.rating}>Note : {film.rating}/10</Text>
      </View>
      <Text style={{ flex: 1, padding: 5 }} onPress={() => remove(film.id)}>
        ❌
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {films.length > 0 ? (
        <FlatList
          data={films}
          renderItem={({ item }) => <FilmItem film={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.title}>Pas de films enregistré 😕</Text>
      )}
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  info: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  author: {
    fontSize: 16,
    color: "#666",
  },
  rating: {
    fontSize: 14,
    color: "#999",
  },
  icon: {
    fontSize: 24,
  },
});

export default FilmsScreen;
