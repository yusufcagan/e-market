import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from '../screens/ProductList';
import ProductDetails from '../screens/ProductDetails';
import MyCart from '../screens/MyCart';
import MyTabs from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

function StackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyTabs" component={MyTabs} />
            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="MyCart" component={MyCart} />
        </Stack.Navigator>
    )
}
export default StackNavigation