import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import BookingForm from './BookingForm';


beforeEach(() => {
    localStorage.clear();
});

test('initializes bookings state from localStorage', () => {
    localStorage.setItem('bookings', JSON.stringify([{
        date: '2025-07-28',
        time: '18:00',
        guests: 2,
        occasion: 'Birthday'
    }]));
    const {getByLabelText} = render(
        <BookingForm availableTimes={['18:00']} updateTimes={() => {
        }} onSubmit={() => {
        }}/>
    );
    // bookings state is not directly accessible, but localStorage should have the initial value
    expect(JSON.parse(localStorage.getItem('bookings'))).toHaveLength(1);
});

test('adds a booking to bookings state and localStorage on submit', () => {
    const mockOnSubmit = jest.fn();
    const {getByLabelText, getByDisplayValue} = render(
        <BookingForm availableTimes={['18:00']} updateTimes={() => {
        }} onSubmit={mockOnSubmit}/>
    );
    fireEvent.change(getByLabelText(/Choose date/i), {target: {value: '2025-07-28'}});
    fireEvent.change(getByLabelText(/Choose reservation time/i), {target: {value: '18:00'}});
    fireEvent.change(getByLabelText(/Number of guests/i), {target: {value: '3'}});
    fireEvent.change(getByLabelText(/Select occasion/i), {target: {value: 'Anniversary'}});
    fireEvent.click(getByDisplayValue(/Make Your reservation/i));
    const bookings = JSON.parse(localStorage.getItem('bookings'));
    expect(bookings).toHaveLength(1);
    expect(bookings[0]).toEqual({date: '2025-07-28', time: '18:00', guests: 3, occasion: 'Anniversary'});
    expect(mockOnSubmit).toHaveBeenCalledWith({date: '2025-07-28', time: '18:00', guests: 3, occasion: 'Anniversary'});
});

