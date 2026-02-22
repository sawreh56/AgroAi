import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const DirectAgro = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Potatoes",
      price: 120,
      quantity: 5,
      image: require("../../assets/Images/potato111.png"),
    },
    {
      id: 2,
      name: "Tomatoes",
      price: 120,
      quantity: 2,
      image: require("../../assets/Images/tomato111.png"),
    },
    {
      id: 3,
      name: "Rice",
      price: 120,
      quantity: 3,
      image: require("../../assets/Images/rice111.png"),
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  return (
    <ImageBackground
      source={require("../../assets/Images/BG.png")}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Address Section */}
        <View style={styles.addressCard}>
          <View>
            <Text style={styles.deliverText}>Deliver to Fatima Bibi</Text>
            <Text style={styles.locationText}>Kasur, Panjab</Text>

            <TouchableOpacity style={styles.changeBtn}>
              <Text style={styles.changeText}>Change Address</Text>
            </TouchableOpacity>
          </View>

          <Icon name="chevron-forward" size={24} color="#fff" />
        </View>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.pricePerKg}>
                PKR {item.price}/KG
              </Text>
              <Text style={styles.totalKg}>
                Total: {item.quantity}kg
              </Text>

              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => decreaseQty(item.id)}
                >
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>
                  {item.quantity}
                </Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => increaseQty(item.id)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.city}>Kasur</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.itemTotal}>
                PKR {item.price * item.quantity}
              </Text>

              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={{ marginTop: 10 }}
              >
                <Icon name="trash-outline" size={22} color="#ddd" />
              </TouchableOpacity>

              <Text style={styles.rightTotal}>
                PKR {item.price * item.quantity}
              </Text>
            </View>
          </View>
        ))}

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.summaryText}>Subtotal:</Text>
            <Text style={styles.summaryText}>
              PKR {subtotal}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.summaryText}>
              Delivery Fee:
            </Text>
            <Text style={styles.summaryText}>
              PKR {deliveryFee}
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>
              PKR {total}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default DirectAgro;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  addressCard: {
    backgroundColor: "rgba(126,214,163,0.3)",
    borderRadius: 20,
    padding: 20,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deliverText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  locationText: {
    color: "#ddd",
    marginTop: 5,
  },

  changeBtn: {
    backgroundColor: "#7ED6A3",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },

  changeText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "rgba(126,214,163,0.8)",
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  pricePerKg: {
    color: "#eee",
    marginTop: 5,
  },

  totalKg: {
    color: "#eee",
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  qtyBtn: {
    backgroundColor: "#4E7D67",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
  },

  qtyText: {
    color: "#fff",
    fontSize: 18,
  },

  qtyNumber: {
    color: "#fff",
    fontSize: 18,
    marginHorizontal: 15,
  },

  city: {
    color: "#eee",
    marginTop: 5,
  },

  itemTotal: {
    color: "red",
    fontWeight: "700",
    fontSize: 16,
  },

  rightTotal: {
    color: "#fff",
    marginTop: 25,
  },

  summaryCard: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 20,
    marginTop: 25,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  summaryText: {
    color: "#fff",
    fontSize: 16,
  },

  totalLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  totalPrice: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  line: {
    height: 1,
    backgroundColor: "#aaa",
    marginVertical: 10,
  },

  checkoutBtn: {
    backgroundColor: "#7ED6A3",
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },

  checkoutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});