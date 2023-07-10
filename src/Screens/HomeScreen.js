import {
  FlatList,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../Components/HomeHeader";
import HomeRenderItem from "../Components/HomeRenderItem";
import HomeEmptyItem from "../Components/HomeEmptyItem";
import { useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { saveDataToFile } from "../Helpers/FileManager";
import { Modal, Portal, Provider, TextInput } from "react-native-paper";
import resourceStore from "../Helpers/ResourceStore";

const HomeScreen = ({ navigation }) => {
  const { username } = resourceStore;
  // States
  const [visible, setVisible] = useState(false);
  const [usernameValue, setUsernameValue] = useState(username);

  // Change this to your own data source
  const data = [
    {
      id: 1,
      title: "Building #1",
      progress: 85,
      theme: "#f8c820",
    },
    {
      id: 2,
      title: "Building #2",
      progress: 35,
      theme: "#c6005f",
    },
    {
      id: 3,
      title: "Building #3",
      progress: 22,
      theme: "#4792ed",
    },
    // {
    //   id: 4,
    //   title: "Building #4",
    //   progress: 22,
    //   theme: "#4792ed",
    // },
    // {
    //   id: 5,
    //   title: "Building #5",
    //   progress: 22,
    //   theme: "#4792ed",
    // },
    // {
    //   id: 6,
    //   title: "Building #6",
    //   progress: 22,
    //   theme: "#4792ed",
    // },
  ];

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: "white",
              margin: 20,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <TextInput
                style={{
                  flex: 1,
                  height: 35,
                  padding: 0,
                  backgroundColor: "white",
                }}
                label={"Username"}
                mode={"outlined"}
                activeOutlineColor={"#d35322"}
                outlineColor={"#d35322"}
                value={usernameValue}
                onChangeText={(text) => setUsernameValue(text)}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  resourceStore.updateUsername(usernameValue);
                  saveDataToFile(resourceStore).then(() => {
                    console.log("Saved");

                    console.log(resourceStore);
                  });
                  hideModal();
                }}
              >
                <Ionicons name="checkbox-sharp" size={30} color="#d35322" />
              </TouchableWithoutFeedback>
            </View>
          </Modal>
        </Portal>

        <FlatList
          data={data}
          renderItem={(item) => {
            return <HomeRenderItem data={item} navigation={navigation} />;
          }}
          ListHeaderComponent={
            <HomeHeader navigation={navigation} modalVisible={setVisible} />
          }
          ListEmptyComponent={HomeEmptyItem}
        />

        {data.length > 2 ? null : (
          <View style={styles.addButton}>
            <FontAwesome name="plus-circle" size={40} color="#d35322" />
          </View>
        )}
      </Provider>
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
    width: 50,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: "#d35322",
    borderRadius: 99999,
  },
});

export default HomeScreen;
