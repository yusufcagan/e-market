import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addToFavorites, removeToFavorites } from '../redux/actions/cartActions';
import Star from '../assets/icon/star_active.png'
import { screenHeight, screenWidth } from '../utils/AppDimensions';


const ProductCard = ({ item, navigation }) => {
    const [fav, setFav] = useState(false);  //The state used for the activity of the stars

    const dispatch = useDispatch();

    const addMyCart = (item) => {
        dispatch(addToCart(item)); //add items function
        navigation.navigate("MyCart"); //betweenscreens navigate
    }

    //get state from Redux
    const favorites = useSelector(state => state.favorites)
    const isFavorite = favorites.some(fav => fav.id === item.id)

    useEffect(() => {
        if (isFavorite) {
            setFav(true)
        }
        else {
            setFav(false)
        }
    }, [favorites]);

    const addFavorite = () => {
        if (fav) {
            dispatch(removeToFavorites(item));
            setFav(false)
        }
        else {
            dispatch(addToFavorites(item))
        }
    }

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetails", { item: item })}
            style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <Text style={{ color: "#2A59FE", fontSize: 14 }}>${item.price}</Text>
            <Text style={styles.description}>{item.name}</Text>
            <TouchableOpacity
                testID='go-cart'
                onPress={() => addMyCart(item)}
                style={styles.addButton}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={addFavorite}
                style={{ position: 'absolute', right: 0, padding: 10 }}>
                <Image
                    source={Star}
                    style={[{ width: screenWidth / 13, height: screenWidth / 13 }, !fav && { tintColor: '#D9D9D9' }]}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        backgroundColor: "#fff",
        width: screenWidth * 2 / 5,
        height: screenWidth * 2 / 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        padding: 10,
        justifyContent: "space-around"
    },
    img: {
        backgroundColor: "#C4C4C4",
        height: screenWidth * 3 / 10,
    },
    description: {
        color: "#000",
        fontSize: 14
    },
    addButton: {
        backgroundColor: "#2A59FE",
        height: screenWidth / 12,
        justifyContent: 'center',
        borderRadius: 4
    },
    buttonText: {
        textAlign: 'center',
        color: "#fff",
        fontSize: 16
    }
})
export default ProductCard