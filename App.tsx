import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/routers/StackNavigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
