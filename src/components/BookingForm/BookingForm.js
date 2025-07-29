import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
    date: Yup.date()
        .required('Date is required')
        .min(new Date().toISOString().split('T')[0], 'Date must be today or in the future'),
    time: Yup.string()
        .required('Time is required'),
    guests: Yup.number()
        .required('Number of guests is required')
        .min(1, 'Must have at least 1 guest')
        .max(10, 'Cannot exceed 10 guests')
        .integer('Must be a whole number'),
    occasion: Yup.string()
        .required('Occasion is required')
});

export default function BookingForm({ availableTimes, updateTimes, onSubmit }) {
    const [bookings, setBookings] = useState(() => {
        const stored = localStorage.getItem('bookings');
        return stored ? JSON.parse(stored) : [];
    });

    const initialValues = {
        date: '',
        time: '',
        guests: 1,
        occasion: 'Birthday'
    };

    const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
        const newBooking = { ...values, guests: Number(values.guests) };
        const updatedBookings = [...bookings, newBooking];
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));

        if (onSubmit) {
            onSubmit(newBooking);
        }

        setSubmitting(false);
        resetForm();
    };

    const handleDateChange = (date, setFieldValue) => {
        setFieldValue('date', date);
        setFieldValue('time', ''); // Reset time when date changes
        // Dispatch date change to update availableTimes
        if (updateTimes) {
            updateTimes({ type: 'dateChange', date });
        }
    };

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={true}
        >
            {({ values, setFieldValue, errors, touched, isValid, isSubmitting, dirty }) => (
                <Form
                    style={{ display: "grid", maxWidth: "400px", gap: "20px" }}
                    aria-label="Table reservation form"
                >
                    <div>
                        <label htmlFor="date">Choose date</label>
                        <Field
                            type="date"
                            id="date"
                            name="date"
                            min={today}
                            onChange={(e) => handleDateChange(e.target.value, setFieldValue)}
                            value={values.date}
                            aria-label="Choose reservation date"
                            aria-required="true"
                            aria-describedby="date-help"
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: errors.date && touched.date ? '2px solid red' : '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        />
                        <ErrorMessage name="date" component="div" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }} />
                    </div>

                    <div>
                        <label htmlFor="time">Choose time</label>
                        <Field
                            as="select"
                            id="time"
                            name="time"
                            aria-label="Choose reservation time"
                            aria-required="true"
                            aria-describedby="time-help"
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: errors.time && touched.time ? '2px solid red' : '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        >
                            <option value="">Select a time</option>
                            {availableTimes && availableTimes.map((timeOption) => (
                                <option key={timeOption} value={timeOption}>
                                    {timeOption}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="time" component="div" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }} />
                    </div>

                    <div>
                        <label htmlFor="guests">Number of guests</label>
                        <Field
                            type="number"
                            id="guests"
                            name="guests"
                            min="1"
                            max="10"
                            aria-label="Number of guests, minimum 1, maximum 10"
                            aria-required="true"
                            aria-describedby="guests-help"
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: errors.guests && touched.guests ? '2px solid red' : '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        />
                        <ErrorMessage name="guests" component="div" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }} />
                    </div>

                    <div>
                        <label htmlFor="occasion">Occasion</label>
                        <Field
                            as="select"
                            id="occasion"
                            name="occasion"
                            aria-label="Select occasion for reservation"
                            aria-describedby="occasion-help"
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: errors.occasion && touched.occasion ? '2px solid red' : '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        >
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                        </Field>
                        <ErrorMessage name="occasion" component="div" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }} />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        aria-label="Submit reservation form"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Make Your reservation'}
                    </button>

                    {/* Form validation summary */}
                    {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
                        <div style={{
                            backgroundColor: '#ffe6e6',
                            border: '1px solid #ff9999',
                            padding: '10px',
                            borderRadius: '4px',
                            color: '#cc0000'
                        }}>
                            <strong>Please fix the following errors:</strong>
                            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                                {Object.entries(errors).map(([field, error]) =>
                                    touched[field] && <li key={field} data-testid={field + '_error'}>{error}</li>
                                )}
                            </ul>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    );
}