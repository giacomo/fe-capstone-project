import React from 'react';
import {render, waitFor, screen, fireEvent, act} from '@testing-library/react';
import BookingForm from './BookingForm';

beforeEach(() => {
    localStorage.clear();
});

describe('HTML5 Validation Attributes', () => {
    test('date field has correct HTML5 validation attributes', async () => {
        const promise = Promise.resolve();
        render(
            <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
        );

        await act(() => promise);

        const dateField = screen.getByLabelText(/Choose reservation date/i);
        expect(dateField).toHaveAttribute('type', 'date');
        expect(dateField).toHaveAttribute('aria-required', 'true');
        expect(dateField).toHaveAttribute('min'); // Should have today's date as minimum
        expect(dateField).toHaveAttribute('id', 'date');
    });

    test('time field has correct HTML5 validation attributes', async () => {
        const promise = Promise.resolve();
        render(
            <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
        );

        await act(() => promise);

        const timeField = screen.getByLabelText(/Choose reservation time/i);
        expect(timeField).toHaveAttribute('aria-required', 'true');
        expect(timeField).toHaveAttribute('id', 'time');
        expect(timeField.tagName).toBe('SELECT');
    });

    test('guests field has correct HTML5 validation attributes', async () => {
        const promise = Promise.resolve();

        render(
            <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
        );

        await act(() => promise);

        const guestsField = screen.getByLabelText(/Number of guests/i);
        expect(guestsField).toHaveAttribute('type', 'number');
        expect(guestsField).toHaveAttribute('min', '1');
        expect(guestsField).toHaveAttribute('max', '10');
        expect(guestsField).toHaveAttribute('aria-required', 'true');
        expect(guestsField).toHaveAttribute('id', 'guests');
    });

    test('occasion field has correct HTML5 validation attributes', async () => {
        render(
            <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
        );

        await waitFor(() => {
            const occasionField = screen.getByLabelText(/Select occasion/i);
            expect(occasionField).toHaveAttribute('id', 'occasion');
        });

        await waitFor(() => {
            const occasionField = screen.getByLabelText(/Select occasion/i);
            expect(occasionField.tagName).toBe('SELECT');
        });
    });

    test('date field has today as minimum date', async () => {
        render(
            <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
        );

        await waitFor(() => {
            const dateField = screen.getByLabelText(/Choose reservation date/i);
            const today = new Date().toISOString().split('T')[0];
            expect(dateField).toHaveAttribute('min', today);
        });
    });
});

describe('JavaScript Validation Functions', () => {
    describe('Date Validation', () => {
        test('shows error for empty date field', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const submitButton = screen.getByRole('button', { name: /submit reservation form/i });

            fireEvent.click(submitButton);

            await waitFor(() => {
                const dateErrors = screen.getAllByText('Date is required');
                expect(dateErrors).toHaveLength(2);
            });
        });

        test('shows error for past date', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const dateField = screen.getByLabelText(/Choose reservation date/i);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const pastDate = yesterday.toISOString().split('T')[0];

            fireEvent.change(dateField, { target: { value: pastDate } });
            fireEvent.blur(dateField);

            await waitFor(() => {
                const dateErrors = screen.getAllByText('Date must be today or in the future');
                expect(dateErrors).toHaveLength(2);
            });
        });

        test('accepts valid future date', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const dateField = screen.getByLabelText(/Choose reservation date/i);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const futureDate = tomorrow.toISOString().split('T')[0];

            fireEvent.change(dateField, { target: { value: futureDate } });
            fireEvent.blur(dateField);

            await waitFor(() => {
                expect(screen.queryByText('Date must be today or in the future')).not.toBeInTheDocument();
            });
        });
    });

    describe('Time Validation', () => {
        test('shows error for empty time field', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const submitButton = screen.getByRole('button', { name: /submit reservation form/i });

            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getAllByText('Time is required')).toHaveLength(2);
            });
        });

        test('accepts valid time selection', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const timeField = screen.getByLabelText(/Choose reservation time/i);

            fireEvent.change(timeField, { target: { value: '18:00' } });
            fireEvent.blur(timeField);

            await waitFor(() => {
                expect(screen.queryByText('Time is required')).not.toBeInTheDocument();
            });
        });
    });

    describe('Guests Validation', () => {
        test('shows error for guests less than 1', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const guestsField = screen.getByLabelText(/Number of guests/i);

            fireEvent.change(guestsField, { target: { value: '0' } });
            fireEvent.blur(guestsField);

            await waitFor(() => {
                expect(screen.getAllByText('Must have at least 1 guest')).toHaveLength(2);
            });
        });

        test('shows error for guests more than 10', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const guestsField = screen.getByLabelText(/Number of guests/i);

            fireEvent.change(guestsField, { target: { value: '11' } });
            fireEvent.blur(guestsField);

            await waitFor(() => {
                expect(screen.getAllByText('Cannot exceed 10 guests')).toHaveLength(2);
            });
        });

        test('shows error for non-integer guest count', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const guestsField = screen.getByLabelText(/Number of guests/i);

            fireEvent.change(guestsField, { target: { value: '2.5' } });
            fireEvent.blur(guestsField);

            await waitFor(() => {
                expect(screen.getAllByText('Must be a whole number')).toHaveLength(2);
            });
        });

        test('accepts valid guest count', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const guestsField = screen.getByLabelText(/Number of guests/i);

            fireEvent.change(guestsField, { target: { value: '4' } });
            fireEvent.blur(guestsField);

            await waitFor(() => {
                expect(screen.queryByText('Must have at least 1 guest')).not.toBeInTheDocument();
            });

            expect(screen.queryByText('Cannot exceed 10 guests')).not.toBeInTheDocument();
            expect(screen.queryByText('Must be a whole number')).not.toBeInTheDocument();
        });
    });

    describe('Occasion Validation', () => {
        test('accepts valid occasion selection', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const occasionField = screen.getByLabelText(/Select occasion/i);

            fireEvent.change(occasionField, { target: { value: 'Anniversary' } });
            fireEvent.blur(occasionField);

            await waitFor(() => {
                expect(screen.queryByText('Occasion is required')).not.toBeInTheDocument();
            });
        });
    });

    describe('Form Validation States', () => {
        test('submit button is disabled with invalid form', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            await waitFor(() => {
                const submitButton = screen.getByRole('button', { name: /submit reservation form/i });
                expect(submitButton).toBeDisabled();
            });
        });

        test('submit button is enabled with valid form', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const futureDate = tomorrow.toISOString().split('T')[0];

            const dateField = screen.getByLabelText(/Choose reservation date/i);
            const timeField = screen.getByLabelText(/Choose reservation time/i);
            const guestsField = screen.getByLabelText(/Number of guests/i);
            const occasionField = screen.getByLabelText(/Select occasion/i);

            fireEvent.change(dateField, { target: { value: futureDate } });
            fireEvent.change(timeField, { target: { value: '18:00' } });
            fireEvent.change(guestsField, { target: { value: '4' } });
            fireEvent.change(occasionField, { target: { value: 'Anniversary' } });

            await waitFor(() => {
                const submitButton = screen.getByRole('button', { name: /submit reservation form/i });
                expect(submitButton).not.toBeDisabled();
            });
        });

        test('displays validation summary when form has errors', async () => {
            render(
                <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
            );

            const submitButton = screen.getByRole('button', { name: /submit reservation form/i });

            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText('Please fix the following errors:')).toBeInTheDocument();
            });
        });
    });
});
//
//
test('initializes bookings state from localStorage', async () => {
    localStorage.setItem('bookings', JSON.stringify([{
        date: '2025-07-28',
        time: '18:00',
        guests: 2,
        occasion: 'Birthday'
    }]));

    render(
        <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
    );

    await waitFor(() => {
        expect(JSON.parse(localStorage.getItem('bookings'))).toHaveLength(1);
    });
});

test('adds a booking to bookings state and localStorage on submit', async () => {
    const mockOnSubmit = jest.fn();
    render(
        <BookingForm availableTimes={['18:00']} updateTimes={() => {
        }} onSubmit={mockOnSubmit}/>
    );

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const futureDate = tomorrow.toISOString().split('T')[0];

    fireEvent.change(screen.getByLabelText(/Choose date/i), {target: {value: futureDate}});
    fireEvent.change(screen.getByLabelText(/Choose reservation time/i), {target: {value: '18:00'}});
    fireEvent.change(screen.getByLabelText(/Number of guests/i), {target: {value: '3'}});
    fireEvent.change(screen.getByLabelText(/Select occasion/i), {target: {value: 'Anniversary'}});
    const submitButton = screen.getByRole('button', {name: /submit reservation form/i});
    // check if the button is enabled
    fireEvent.click(submitButton);

    // Wait for the main async operation to complete
    await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
            date: futureDate,
            time: '18:00',
            guests: 3,
            occasion: 'Anniversary'
        });
    });

    // Then check synchronous state
    expect(submitButton).toBeEnabled();

    const bookings = JSON.parse(localStorage.getItem('bookings'));
    expect(bookings).toHaveLength(1);
    expect(bookings[0]).toEqual({
        date: futureDate,
        time: '18:00',
        guests: 3,
        occasion: 'Anniversary'
    });
});

test('submit button is disabled when form is invalid', async () => {
    render(
        <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
    );

    await waitFor(() => {
        const submitButton = screen.getByRole('button', {name: /submit reservation form/i});
        expect(submitButton).toBeDisabled();
    });
});

test('submit button is enabled when form is valid', async () => {
    const mockOnSubmit = jest.fn();
    render(
        <BookingForm availableTimes={['18:00']} updateTimes={() => {
        }} onSubmit={mockOnSubmit}/>
    );

    fireEvent.change(screen.getByLabelText(/Choose date/i), {target: {value: '2025-07-28'}});
    fireEvent.change(screen.getByLabelText(/Choose reservation time/i), {target: {value: '18:00'}});
    fireEvent.change(screen.getByLabelText(/Number of guests/i), {target: {value: '3'}});
    fireEvent.change(screen.getByLabelText(/Select occasion/i), {target: {value: 'Anniversary'}});
    const submitButton = screen.getByRole('button', {name: /submit reservation form/i});
    // check if the button is enabled
    await waitFor(() => {
        expect(submitButton).toBeEnabled();
    });
});

test('displays validation errors for invalid inputs', async () => {
    // const user = userEvent.setup();
    render(
        <BookingForm availableTimes={['18:00']} updateTimes={() => {}} onSubmit={() => {}} />
    );

    // fire some clicks, or focus to trigger validation
    fireEvent.blur(screen.getByLabelText(/Choose reservation date/i));
    fireEvent.blur(screen.getByLabelText(/Choose reservation time/i));


    await waitFor(() => {
        expect(screen.getByTestId('date_error')).toBeInTheDocument();
    });

    expect(screen.getByTestId('time_error')).toBeInTheDocument();
});

