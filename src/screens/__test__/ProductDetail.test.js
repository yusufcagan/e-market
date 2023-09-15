import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import ProductDetails from '../ProductDetails';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Product Details Screen', () => {
    const item = {
        name: 'Product Name',
        brand: 'Product Brand',
        model: 'Product Model',
        price: 50.00,
        description: 'description',
        image: 'https://example.com/product-image.jpg',
    };

    const navigationMock = {
        navigate: jest.fn(),
    };

    it('Render', () => {
        render(
            <Provider store={store}>
                <ProductDetails navigation={navigationMock} route={{ params: { item } }} />
            </Provider>
        );

        expect(screen.getByText('Product Brand')).toBeTruthy();
        expect(screen.getByText('Product Model')).toBeTruthy();

        const addToCartButton = screen.getByTestId('addToCartButton');
        expect(addToCartButton).toBeTruthy();
    });

    it('navigate My Cart', () => {
        render(
            <Provider store={store}>
                <ProductDetails navigation={navigationMock} route={{ params: { item } }} />
            </Provider>
        );

        const addToCartButton = screen.getByTestId('addToCartButton');
        fireEvent.press(addToCartButton);

        expect(navigationMock.navigate).toHaveBeenCalledWith('MyCart');
    })


})