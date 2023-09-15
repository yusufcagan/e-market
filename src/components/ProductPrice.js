import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { decrementQuantity, incrementQuantity } from '../redux/actions/cartActions';
import { screenHeight, screenWidth } from '../utils/AppDimensions';


const ProductPrice = ({ item }) => {

    const dispatch = useDispatch();

    return (
        <View style={styles.content} >
            <View>
                <Text>{item.name}</Text>
                <Text>${parseInt(item.quantityPrice)}.00</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    testID='press-minus'
                    onPress={() => dispatch(decrementQuantity(item))} //When the button ("-") is clicked, the decrement function in Redux is executed
                    style={styles.button}>
                    <Text style={{ fontSize: 20 }}>-</Text>
                </TouchableOpacity>
                <View style={styles.textContent}>
                    <Text style={{ fontSize: 20, color: "#000" }}>{item.quantity}</Text>
                </View>
                <TouchableOpacity
                    testID='press-plus'
                    onPress={() => dispatch(incrementQuantity(item))} //When the button ("+") is clicked, the increment function in Redux is executed
                    style={styles.button}>
                    <Text style={{ fontSize: 20 }}>+</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    content: {
        marginTop: 25,
        backgroundColor: "#fff",
        width: screenWidth,
        height: screenHeight / 15,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 8

    },
    row: {
        flexDirection: 'row'
    },
    button: {
        width: screenWidth / 6,
        height: screenHeight / 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#D3DAE2"
    },
    textContent: {
        width: screenWidth / 6,
        height: screenHeight / 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2A59FE"
    }
})
export default ProductPrice;