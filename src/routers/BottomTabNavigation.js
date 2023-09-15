import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native';
import HomeIcon from '../assets/icon/icon_home_outline.png'
import BasketIcon from '../assets/icon/icon_basket_outline.png'
import StarIcon from '../assets/icon/icon_star_outline.png'
import PersonIcon from '../assets/icon/icon_person_outline.png'
import ProductList from '../screens/ProductList';
import MyCart from '../screens/MyCart';
import Favorite from '../screens/Favorite';
import MyAccount from '../screens/MyAccount';
import { useSelector } from 'react-redux'
import { screenWidth } from '../utils/AppDimensions';

const Tab = createBottomTabNavigator();


function MyTabs() {

    const cartItems = useSelector(state => state.cartItems);
    const favorites = useSelector(state => state.favorites);

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tab.Screen
                name="ProductList"
                component={ProductList}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={HomeIcon}
                                style={{ width: screenWidth / 15, height: screenWidth / 16 }}
                            />
                        )
                    }
                }} />
            <Tab.Screen
                name="MyCart"
                component={MyCart}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                {
                                    cartItems?.length > 0 &&
                                    <View
                                        style={{
                                            width: screenWidth / 20,
                                            height: screenWidth / 20,
                                            borderRadius: 10,
                                            backgroundColor: 'red',
                                            position: 'absolute',
                                            borderColor: '#fff',
                                            borderWidth: 1,
                                            zIndex: 1,
                                            right: screenWidth / 17,
                                            top: screenWidth / 40
                                        }} >
                                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 12 }}>{
                                            cartItems?.length
                                        }</Text>
                                    </View>
                                }
                                <Image
                                    source={BasketIcon}
                                    style={{ width: screenWidth / 11, height: screenWidth / 13 }}
                                />
                            </>
                        )
                    }
                }} />
            <Tab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <>
                                {
                                    favorites?.length > 0 &&
                                    <View
                                        style={{
                                            width: screenWidth / 20,
                                            height: screenWidth / 20,
                                            borderRadius: 10,
                                            backgroundColor: 'red',
                                            position: 'absolute',
                                            borderColor: '#fff',
                                            borderWidth: 1,
                                            zIndex: 1,
                                            right: screenWidth / 17,
                                            top: screenWidth / 40
                                        }} >
                                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 12 }}>{
                                            favorites?.length
                                        }</Text>
                                    </View>
                                }
                                <Image
                                    source={StarIcon}
                                    style={{ width: screenWidth / 11, height: screenWidth / 13 }}
                                />
                            </>
                        )
                    }
                }} />
            <Tab.Screen
                name="MyAccount"
                component={MyAccount}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={PersonIcon}
                                style={{ width: screenWidth / 15, height: screenWidth / 15 }}
                            />
                        )
                    }
                }} />
        </Tab.Navigator>
    );
}

export default MyTabs