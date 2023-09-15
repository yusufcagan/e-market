import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../redux/store'
import ProductList from '../ProductList';
import ProductCard from '../../components/ProductCard';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

test('Header Display', () => {
    render(
        <Provider store={store}>
            <ProductList />
        </Provider>
    );

    const header = screen.getByText(/e-market/i);
    expect(header).toBeTruthy();
});

test('Product Card Display', () => {
    render(
        <Provider store={store}>
            <ProductList />
        </Provider>
    );

    const card = screen.getByTestId("modal");
    expect(card).toBeTruthy();
});

test("modal open", () => {
    render(
        <Provider store={store}>
            <ProductList />
        </Provider>
    );


    fireEvent.press(screen.getByTestId('filter-button'))

    const modal = screen.getByTestId('modal');
    expect(modal).toBeDefined();

    fireEvent.press(screen.getByText('X'));
    expect(() => getByTestId('modal')).toThrow();
});
