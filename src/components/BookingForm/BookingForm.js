import React, { useState } from 'react';

export default function BookingForm({ availableTimes, updateTimes, onSubmit }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState('Birthday');
    const [bookings, setBookings] = useState(() => {
        const stored = localStorage.getItem('bookings');
        return stored ? JSON.parse(stored) : [];
    });

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        // Dispatch date change to update availableTimes with the correct action format
        updateTimes({ type: 'dateChange', date: newDate });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBooking = { date, time, guests, occasion };
        const updatedBookings = [...bookings, newBooking];
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        if (onSubmit) {
            onSubmit(newBooking);
        }
    };

    return (
        <form
            style={{ display: "grid", maxWidth: "200px", gap: "20px" }}
            aria-label="Table reservation form"
            onSubmit={handleSubmit}
        >
            <label htmlFor="res-date">Choose date</label>
            <input
                type="date"
                id="res-date"
                value={date}
                onChange={handleDateChange}
                aria-label="Choose reservation date"
                aria-required="true"
                aria-describedby="date-help"
            />
            <label htmlFor="res-time">Choose time</label>
            <select
                id="res-time"
                name="res-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                aria-label="Choose reservation time"
                aria-required="true"
                aria-describedby="time-help"
            >
                <option value="">Select a time</option>
                {availableTimes.map((timeOption) => (
                    <option key={timeOption} value={timeOption}>
                        {timeOption}
                    </option>
                ))}
            </select>
            <label htmlFor="guests">Number of guests</label>
            <input
                type="number"
                placeholder="1"
                min="1"
                max="10"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                aria-label="Number of guests, minimum 1, maximum 10"
                aria-required="true"
                aria-describedby="guests-help"
            />
            <label htmlFor="occasion">Occasion</label>
            <select
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                aria-label="Select occasion for reservation"
                aria-describedby="occasion-help"
            >
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
            </select>
            <input
                type="submit"
                className="btn btn-primary"
                value="Make Your reservation"
                aria-label="Submit reservation form"
            />
        </form>
    );
}