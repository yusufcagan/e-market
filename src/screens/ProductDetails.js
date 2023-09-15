import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import BackButton from '../assets/icon/back.png'
import { addToCart } from '../redux/actions/cartActions';
import { screenHeight, screenWidth } from '../utils/AppDimensions';

const ProductDetails = ({ navigation, route }) => {

  const { item } = route.params;

  const dispatch = useDispatch()

  //click button and add item with "addToCart" function
  const addMyCart = (item) => {
    dispatch(addToCart(item))
    navigation.navigate("MyCart")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackButton} style={styles.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { paddingLeft: screenWidth / 5 }]}>{item.name}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: item.image }} style={styles.img} />
        <View style={styles.row}>
          <Text style={[styles.text, { backgroundColor: null }]}>Name:</Text>
          <Text style={[styles.text, { width: screenWidth * 2 / 3 }]}>{item.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, { backgroundColor: null }]}>Brand:</Text>
          <Text style={[styles.text, { width: screenWidth * 2 / 3 }]}>{item.brand}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, { backgroundColor: null }]}>Model:</Text>
          <Text style={[styles.text, { width: screenWidth * 2 / 3 }]}>{item.model}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, { backgroundColor: null }]}>Price:</Text>
          <Text style={[styles.text, { width: screenWidth * 2 / 3 }]}>${item.price}</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={[styles.text, { backgroundColor: null, width: screenWidth / 2 }]}>Description:</Text>
          <Text style={[styles.text, { width: screenWidth * 8 / 9, marginLeft: 20 }]}>{item.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.addButtonContent}>
        <TouchableOpacity
          testID='addToCartButton'
          onPress={() => addMyCart(item)}
          style={styles.addButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    backgroundColor: '#2A59FE',
    height: screenHeight / 15,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  icon: {
    width: screenWidth / 12,
    height: screenWidth / 12,
    tintColor: "#fff"
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },
  content: {
    paddingBottom: 60,
    paddingTop: 20
  },
  row: {
    marginTop: 15,
    flexDirection: "row"
  },
  img: {
    width: screenWidth * 9 / 10,
    height: screenWidth * 3 / 5,
    alignSelf: 'center'
  },
  text: {
    marginLeft: 15,
    backgroundColor: "#D3DAE2",
    padding: 8,
    borderRadius: 5,
    fontWeight: "600",
    color: "#000",
    fontSize: 16,
    width: screenWidth / 5
  },
  addButtonContent: {
    backgroundColor: "#fff",
    elevation: 8,
    width: screenWidth,
    height: screenHeight / 15,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0
  },
  addButton: {
    backgroundColor: "blue",
    width: screenWidth * 7 / 8,
    height: screenHeight / 20,
    borderRadius: 9,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: "600",
    fontSize: 18,
    textAlign: 'center'
  }
})
export default ProductDetails