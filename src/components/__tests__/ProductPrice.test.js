import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react-native';
import ProductPrice from '../ProductPrice';
import { Provider } from 'react-redux';
import { store } from '../../redux/store'

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Product Price', () => {
    const item = {
        name: "Product Name",
        quantityPrice: 10,
        quantity: 5,
    };

    it('render', () => {
        render(
            <Provider store={store}>
                <ProductPrice item={item} />
            </Provider>
        );

        expect(screen.getByText('Product Name')).toBeTruthy();
        expect(screen.getByText('$10.00')).toBeTruthy();
    });

    it('increment press button', () => {
        render(
            <Provider store={store}>
                <ProductPrice item={item} />
            </Provider>
        );

        const plusButton = screen.getByTestId('press-plus');

        fireEvent.press(plusButton);

        expect(screen.getByText('5')).toBeTruthy();
    });

    it('decremen press button', () => {
        render(
            <Provider store={store}>
                <ProductPrice item={item} />
            </Provider>
        );

        const plusButton = screen.getByTestId('press-minus');

        fireEvent.press(plusButton);

        expect(screen.getByText('5')).toBeTruthy();
    })
});