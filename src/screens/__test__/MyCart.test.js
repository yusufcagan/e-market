import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import MyCart from '../MyCart';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('My Cart Screen', () => {
    const navigationMock = {
        navigate: jest.fn(),
    };

    it('title display', () => {
        render(
            <Provider store={store}>
                <MyCart navigation={navigationMock} />
            </Provider>
        );

        expect(screen.getByText('My Cart')).toBeTruthy();
    });

    it('cart is empty display', () => {
        render(
            <Provider store={store}>
                <MyCart navigation={navigationMock} />
            </Provider>
        );

        expect(screen.getByText("You haven't added any favorites yet")).toBeTruthy();
    });

    it('payment button', () => {
        render(
            <Provider store={store}>
                <MyCart navigation={navigationMock} />
            </Provider>
        );
        const paymentButton = screen.getByText('Payment');
        expect(paymentButton).toBeTruthy();

        fireEvent.press(paymentButton);
    });
})

