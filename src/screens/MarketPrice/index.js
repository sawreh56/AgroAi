import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const categories = ["Alll", "Grains", "Fruits", "Vegetables"];

const data = [
  {
    name: "Wheat",
    price: "PKR 3,200",
    unit: "40kg bag",
    change: "+5.2%",
    up: true,
    market: "Lahore Market",
  },
  {
    name: "Basmati Rice",
    price: "PKR 280",
    unit: "Per kg",
    change: "-1.8%",
    up: false,
    market: "Karachi Market",
  },
  {
    name: "Tomato",
    price: "PKR 120",
    unit: "Per kg",
    change: "+8.5%",
    up: true,
    market: "Islamabad Market",
  },
  {
    name: "Onion",
    price: "PKR 85",
    unit: "Per kg",
    change: "-3.2%",
    up: false,
    market: "Faisalabad Market",
  },
  {
    name: "Sugar",
    price: "PKR 140",
    unit: "Per kg",
    change: "+2.1%",
    up: true,
    market: "Multan Market",
  },
  {
    name: "Mango (Chaunsa)",
    price: "PKR 450",
    unit: "Per dozen",
    change: "-4.1%",
    up: false,
    market: "Sargodha Market",
  },
];

export default function MarketPricesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Grains");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <LinearGradient
          colors={["#18332D", "#0E1F1C"]}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Price for RYK Mandi</Text>
          <Text style={styles.subTitle}>
            Real-time agricultural commodity rates
          </Text>

          <TextInput
            placeholder="Search crops, fruits, vegetables..."
            placeholderTextColor="#aaa"
            style={styles.search}
          />
        </LinearGradient>

        {/* STATS BOX */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Today's Average</Text>
            <Text style={styles.statValue}>PKR 2,450</Text>
            <Text style={styles.statChange}>+2.4%</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Avg. Change</Text>
            <Text style={[styles.statValue, { color: "#2ECC90" }]}>
              +2.3%
            </Text>
          </View>
        </View>

        {/* CATEGORY FILTER */}
        <View style={styles.categoryRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                selectedCategory === cat && styles.activeCategory,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && { color: "#fff" },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PRICE CARDS (NOW TOUCHABLE) */}
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("PriceDetail", { item })
            }
          >
            <View>
              <Text style={styles.cropName}>{item.name}</Text>
              <Text style={styles.unit}>{item.unit}</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>{item.price}</Text>
              <Text
                style={{
                  color: item.up ? "#2ECC90" : "#ff4d4d",
                  fontSize: 12,
                }}
              >
                {item.change}
              </Text>
              <Text style={styles.market}>{item.market}</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1817",
  },

  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },

  subTitle: {
    color: "#aaa",
    fontSize: 12,
    marginTop:10,
    marginBottom: 12,
  },

  search: {
    backgroundColor: "#163A34",
    borderRadius: 10,
    paddingHorizontal: 12,
    color: "#fff",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },

  statBox: {
    backgroundColor: "#163A34",
    padding: 15,
    borderRadius: 12,
    width: "48%",
  },

  statTitle: {
    color: "#aaa",
    fontSize: 12,
  },

  statValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },

  statChange: {
    color: "#2ECC90",
    fontSize: 12,
    marginTop: 2,
  },

  categoryRow: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  categoryBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#163A34",
    marginRight: 8,
  },

  activeCategory: {
    backgroundColor: "#2ECC90",
  },

  categoryText: {
    color: "#aaa",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#163A34",
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cropName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  unit: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 3,
  },

  price: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  market: {
    color: "#aaa",
    fontSize: 11,
    marginTop: 2,
  },
});
