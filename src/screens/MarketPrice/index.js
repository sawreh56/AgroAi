import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const MarketPrices = () => {
  return (
    <View style={styles.container}>
        {/* Header */}
        <ImageBackground source={require("../../assets/Images/BG.png")}style={{ flex: 1 }}>
         {/* DARK OVERLAY */}
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "rgba(0,0,0,0.8)", // 0.6 = darkness level
                }}
            />
            <View style={styles.header}>

                <View style={{ flexDirection: "row"}}>
                    <Image source={require("../../assets/Images/arrow.png")} style={{ width: 25, height: 25,  }} />
                    <Text style={styles.headerTitle}>Market Prices</Text>

                    <View style={styles.locationCircle}>
                    <Image source={require("../../assets/Images/mpLocation.png")} style={{ width: 25, height: 25, marginLeft: 10 }} />

                    </View>
                </View>

                <Text style={styles.subTitle}>Price for RYK Mandi</Text>
                <Text style={styles.smallText}>Real-time agricultural commodity rates</Text>
            </View>

            {/* Search */}
            <View style={styles.searchBox}>
                <Icon name="search" size={18} color="#9CA3AF" />
                <TextInput
                    placeholder="Search crops, fruits, vegetables..."
                    placeholderTextColor="#9CA3AF"
                    style={styles.searchInput}
                />
            </View>

            {/* Stats Cards */}
            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Today's Average</Text>
                    <Text style={styles.statValue}>PKR 2,450</Text>
                    <Text style={styles.statChange}>+2.4%</Text>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Avg. Change</Text>
                    <Text style={[styles.statValue, { color: "#10B981" }]}>+2.3%</Text>
                </View>
            </View>

            {/* Category Buttons */}
            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.categoryBtn}>
                    <Text style={styles.categoryText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBtnActive}>
                    <Text style={styles.categoryTextActive}>Grains</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBtn}>
                    <Text style={styles.categoryText}>Fruits</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBtn}>
                    <Text style={styles.categoryText}>Vegetables</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {[
          { name: "Wheat", price: "PKR 3,200", change: "+5.2%" },
          { name: "Basmati Rice", price: "PKR 280", change: "-1.8%" },
          { name: "Tomato", price: "PKR 120", change: "+8.5%" },
          { name: "Onion", price: "PKR 85", change: "-3.2%" },
          { name: "Sugar", price: "PKR 140", change: "+2.1%" },
          { name: "Mango (Chaunsa)", price: "PKR 450", change: "-4.1%" },
        ].map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSub}>Last updated: 1 hour ago</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Text
                style={[
                  styles.itemChange,
                  {
                    color: item.change.includes("+")
                      ? "#10B981"
                      : "#EF4444",
                  },
                ]}
              >
                {item.change}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MarketPrices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  header: {
    marginBottom: 20,
  },
  locationCircle: {
    backgroundColor: "#7ADAA5",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 170,
    marginTop:10
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    color: "#22C55E",
    marginTop: 4,
  },
  smallText: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    marginLeft: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 15,
    width: "48%",
  },
  statLabel: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  statChange: {
    color: "#10B981",
    marginTop: 5,
  },
  categoryRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  categoryBtn: {
    backgroundColor: "#1E293B",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryBtnActive: {
    backgroundColor: "#22C55E",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: "#9CA3AF",
  },
  categoryTextActive: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  itemCard: {
    backgroundColor: "#1E293B",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSub: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
  },
  itemPrice: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  itemChange: {
    marginTop: 4,
    fontWeight: "bold",
  },
});
