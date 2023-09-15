import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard';
import { screenHeight } from '../utils/AppDimensions';

const Favorite = ({ navigation }) => {

    //get state favorites from redux
    const favorites = useSelector(state => state.favorites);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Favorites</Text>
            </View>
            <View style={styles.content}>
                {
                    favorites?.length > 0 ?
                        <FlatList
                            data={favorites}
                            renderItem={({ item }) => <ProductCard item={item} navigation={navigation} />}
                            numColumns={2}
                        />
                        :
                        <Text>You haven't added any favorites yet</Text>
                }

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#2A59FE',
        height: screenHeight / 16,
        justifyContent: 'center'
    },
    headerText: {
        fontWeight: "700",
        color: "white",
        padding: 10,
        fontSize: 20,
        textAlign: 'center'
    },
    content: {
        marginTop: 25,
        padding: 15,
        alignItems: 'center'
    }
});

export default Favorite