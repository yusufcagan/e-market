import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Modal,
    ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Search from '../assets/icon/Search.png'
import ProductCard from '../components/ProductCard'
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import { screenHeight, screenWidth } from '../utils/AppDimensions';

export default function ProductList({ navigation }) {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isBrandMenuVisible, setIsBrandMenuVisible] = useState(false);
    const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);
    const [isModelMenuVisible, setIsModelMenuVisible] = useState(false);
    const [sortOrder, setSortOrder] = useState('');

    //sortby Low to high or High to Low
    const [sortMenu, setSortMenu] = useState([
        { name: 'Low to High', selected: false },
        { name: 'High to Low', selected: false },
    ]);

    //Brand elemnt
    const [brands, setBrands] = useState([
        { name: 'Lamborghini', selected: false },
        { name: 'Mercedes Benz', selected: false },
        { name: 'Tesla', selected: false },
        { name: 'Nissan', selected: false },
        { name: 'Honda', selected: false },
        { name: 'Aston Martin', selected: false },
        { name: 'Audi', selected: false },
    ]);

    //Model element
    const [models, setModels] = useState([
        { name: 'CTS', selected: false },
        { name: 'Roadster', selected: false },
        { name: 'Taurus', selected: false },
        { name: 'Jetta', selected: false },
        { name: 'Corvette', selected: false },
    ]);

    //Sort Fonction
    const selectSort = (index) => {
        const updatedSortMenu = sortMenu.map((option, i) => ({
            ...option,
            selected: i === index,
        }));
        setSortMenu(updatedSortMenu);

        if (index === 0) {
            // sort Low to High
            setSortOrder('ascending');
            const sortedProducts = [...data].sort((a, b) => a.price - b.price);
            setData(sortedProducts);
        } else if (index === 1) {
            // sort High to Low
            setSortOrder('descending');
            const sortedProducts = [...data].sort((a, b) => b.price - a.price);
            setData(sortedProducts);
        } else {
            //sort clear
            setSortOrder('');
        }
    }

    //Check Brand filter button
    const toggleBrandSelection = (index) => {
        const updatedBrands = [...brands];
        updatedBrands[index].selected = !updatedBrands[index].selected;
        setBrands(updatedBrands);
    };

    //check Model filter button
    const toggleModelSelection = (index) => {
        const updatedModels = [...models];
        updatedModels[index].selected = !updatedModels[index].selected;
        setModels(updatedModels);
    }

    //fetch api function
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products?page=${page}&limit=6`);
            const newData = response.data;
            setData(prevData => [...prevData, ...newData]);// burda sayfalaştırma yaparak birimlere ayırma işlemleri var
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>E-Market</Text>
            </View>
            <View style={styles.search}>
                <Image style={styles.icon} source={Search} />
                <TextInput
                    placeholder='Search'
                    style={styles.placeholder}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)} />
            </View>
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: "#000", fontSize: 18 }}>
                        Filters:
                    </Text>
                    <TouchableOpacity
                        testID='filter-button'
                        onPress={() => setIsModalVisible(!isModalVisible)}
                        style={styles.filterButton}>
                        <Text style={styles.buttonText}>Select filter</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={
                        data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
                        &&
                        data.filter((item =>
                            (brands.every(brand => !brand.selected) || brands.some(brand => brand.selected && item.brand === brand.name))
                            &&
                            (models.every(model => !model.selected) || models.some(model => model.selected && item.model === model.name))
                        ))
                    }
                    renderItem={({ item }) => <ProductCard item={item} navigation={navigation} />}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    onEndReached={loading ? null : fetchProducts}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => (
                        loading ? <ActivityIndicator size="large" color="#0000ff" style={{ paddingBottom: 150 }} /> : null
                    )}
                />
                <Modal
                    testID='modal'
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(!isModalVisible)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={{ position: 'absolute', right: 0, paddingRight: 5 }} onPress={() => setIsModalVisible(!isModalVisible)}>
                                <Text>X</Text>
                            </TouchableOpacity>
                            <Text style={styles.modalHeader}>
                                Filter
                            </Text>
                            <ScrollView>
                                <TouchableOpacity
                                    onPress={() => setIsSortMenuVisible(!isSortMenuVisible)}
                                    style={styles.modalFilter}>
                                    <View style={styles.row}>
                                        <Text style={{ color: '#000' }}>Sort By</Text>
                                        <Text style={{ color: '#000', fontSize: 25 }}>{isSortMenuVisible ? `-` : `+`}</Text>
                                    </View>
                                    {
                                        isSortMenuVisible &&
                                        sortMenu.map((sortMenu, index) => (
                                            <View style={[styles.row, { justifyContent: "" }]} key={index}>
                                                <CheckBox
                                                    value={sortMenu.selected}
                                                    onValueChange={() => selectSort(index)}
                                                />
                                                <Text style={{ color: '#000' }}>{sortMenu.name}</Text>
                                            </View>
                                        ))

                                    }
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setIsBrandMenuVisible(!isBrandMenuVisible)}
                                    style={styles.modalFilter}>
                                    <View style={styles.row}>
                                        <Text style={{ color: '#000' }}>Brand</Text>
                                        <Text style={{ color: '#000', fontSize: 25 }}>{isBrandMenuVisible ? `-` : `+`}</Text>
                                    </View>
                                    {
                                        isBrandMenuVisible &&
                                        brands.map((brand, index) => (
                                            <View style={[styles.row, { justifyContent: "" }]} key={index}>
                                                <CheckBox
                                                    value={brand.selected}
                                                    onValueChange={() => toggleBrandSelection(index)}
                                                />
                                                <Text style={{ color: '#000' }}>{brand.name}</Text>
                                            </View>
                                        ))
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setIsModelMenuVisible(!isModelMenuVisible)}
                                    style={styles.modalFilter}>
                                    <View style={styles.row}>
                                        <Text style={{ color: '#000' }}>Model</Text>
                                        <Text style={{ color: '#000', fontSize: 25 }}>{isModelMenuVisible ? `-` : `+`}</Text>
                                    </View>
                                    {
                                        isModelMenuVisible &&
                                        models.map((model, index) => (
                                            <View style={[styles.row, { justifyContent: "" }]} key={index}>
                                                <CheckBox
                                                    value={model.selected}
                                                    onValueChange={() => toggleModelSelection(index)}
                                                />
                                                <Text style={{ color: '#000' }}>{model.name}</Text>
                                            </View>
                                        ))

                                    }
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",

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
        fontSize: 20
    },
    search: {
        marginTop: 14,
        backgroundColor: "#2A59FE4D",
        marginHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    icon: {
        width: screenWidth / 20,
        height: screenWidth / 20,
    },
    placeholder: {
        marginHorizontal: 8,
        fontSize: 18
    },
    content: {
        marginTop: 15,
        marginHorizontal: 15
    },
    filterButton: {
        backgroundColor: "#D9D9D9",
        width: screenWidth / 3,
        height: screenWidth / 11,
        justifyContent: 'center'
    },
    buttonText: {
        color: "black",
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: screenWidth * 3 / 4,
        height: screenHeight * 3 / 4,
        backgroundColor: '#fff',
        padding: 25
    },
    modalHeader: {
        color: '#000',
        fontWeight: "700",
        fontSize: 18
    },
    modalFilter: {
        marginTop: 20,
        width: screenWidth * 3 / 5,
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: "#B2BEB5",
        borderRadius: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',

    }

})