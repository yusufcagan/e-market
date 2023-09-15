import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native';
import ProductCard from '../ProductCard';
import { Provider } from 'react-redux';
import { store } from '../../redux/store'

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

test('ProductCard renders', () => {
    const item = { id: 1, name: 'Sample Name', price: 15, description: 'lorem ipsum', model: 'CTS', brand: 'Honda' }
    const { getByText } = render(
        <Provider store={store}>
            <ProductCard item={item} />
        </Provider>
    );

    expect(getByText('Sample Name')).toBeTruthy();
    expect(getByText('$15')).toBeTruthy();
});

