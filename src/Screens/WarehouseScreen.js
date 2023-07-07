import { Button, TextInput } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { capitalise, cleanUpNumber } from "../Helpers/CleanUps";
import { FontAwesome5 } from "@expo/vector-icons";
import StatInput from "../Components/StatInput";

const WarehouseScreen = ({ stats, setStats }) => {
  const [mainStone, setMainStone] = useState("0");
  const [mainIron, setMainIron] = useState("0");
  const [mainZCoins, setMainZCoins] = useState("0");
  const [mainDiamonds, setMainDiamonds] = useState("0");

  return (
    <ScrollView style={styles.container}>
      {Object.keys(stats).map((key) => {
        return (
          <StatInput
            key={key}
            label={capitalise(key) + " in Warehouse"}
            value={stats[key]}
            onChangeValue={(text) => {
              setStats((stats) => ({
                ...stats,
                [key]: cleanUpNumber(text),
              }));
            }}
            icon={
              stats[key] < 1 ? null : (
                <FontAwesome5
                  style={{ position: "absolute", left: 10, top: 20 }}
                  name="warehouse"
                  size={13}
                  color="black"
                />
              )
            }
          />
        );
      })}
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: "white",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#b5c1c5",
  },
  headerTitle: {
    marginLeft: 30,
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default WarehouseScreen;
