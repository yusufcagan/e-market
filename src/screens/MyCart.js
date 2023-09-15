import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React from 'react'
import BackButton from '../assets/icon/back.png'
import ProductPrice from '../components/ProductPrice';
import { useSelector } from 'react-redux'
import { screenHeight, screenWidth } from '../utils/AppDimensions';


const MyCart = ({ navigation }) => {

    //Get states from Redux
    const cartItems = useSelector(state => state.cartItems);
    const totalPrice = useSelector(state => state.totalPrice);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={BackButton} style={styles.icon} />
                </TouchableOpacity>
                <Text style={[styles.headerText, { paddingLeft: screenWidth / 5 }]}>My Cart</Text>
            </View>
            <View style={styles.content}>
                {
                    cartItems?.length > 0 ?
                        <FlatList
                            data={cartItems}
                            renderItem={({ item }) => <ProductPrice item={item} />}
                            keyExtractor={item => item.id}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        />
                        :
                        <Text>You haven't added any favorites yet</Text>
                }

            </View>
            <View style={styles.paymentContent}>
                <Text style={styles.totalPriceText}>${totalPrice}.00</Text>
                <TouchableOpacity
                    style={styles.paymentButton}
                >
                    <Text style={styles.buttonText}>Payment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
        alignItems: 'center',
        marginTop: 20
    },
    paymentContent: {
        width: screenWidth,
        height: screenHeight / 15,
        elevation: 8,
        backgroundColor: "#fff",
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        alignItems: 'center'
    },
    totalPriceText: {
        color: '#000',
        fontWeight: "700",
        fontSize: 18
    },
    paymentButton: {
        width: screenWidth / 2,
        height: screenHeight / 18,
        backgroundColor: "#2A59FE",
        borderRadius: 8,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'center',
    }
})
export default MyCart