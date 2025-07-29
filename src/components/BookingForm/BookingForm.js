import React, { useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
    firstName: Yup.string()
        .required('First name is required')
        .max(50, 'First name is too long'),
    lastName: Yup.string()
        .required('Last name is required')
        .max(50, 'Last name is too long'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
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
        firstName: '',
        lastName: '',
        email: '',
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

    const handleDateChange = (date, setFieldValue, validateField) => {
        setFieldValue('date', date);
        setFieldValue('time', ''); // Reset time when date changes
        // Dispatch date change to update availableTimes
        if (updateTimes) {
            updateTimes({ type: 'dateChange', date });
        }

        setTimeout(() => {
            validateField('date');
        }, 0);
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
            {({ values, setFieldValue, errors, touched, isValid, isSubmitting, dirty, validateField }) => (
                <Form
                    className="booking-form"
                    aria-label="Table reservation form"
                >
                    <div className="form__field">
                        <label htmlFor="firstName" className="form__label">First name</label>
                        <Field
                            type="text"
                            id="firstName"
                            name="firstName"
                            aria-label="First name"
                            aria-required="true"
                            aria-describedby="firstName-help"
                            className={`form__input${errors.firstName && touched.firstName ? ' form__input--error' : ''}`}
                            data-lpignore="true"
                        />
                        <ErrorMessage name="firstName" component="div" className="form__error" />
                    </div>

                    <div className="form__field">
                        <label htmlFor="lastName" className="form__label">Last name</label>
                        <Field
                            type="text"
                            id="lastName"
                            name="lastName"
                            aria-label="Last name"
                            aria-required="true"
                            aria-describedby="lastName-help"
                            className={`form__input${errors.lastName && touched.lastName ? ' form__input--error' : ''}`}
                        />
                        <ErrorMessage name="lastName" component="div" className="form__error" />
                    </div>

                    <div className="form__field">
                        <label htmlFor="email" className="form__label">Email</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            aria-label="Email"
                            aria-required="true"
                            aria-describedby="email-help"
                            className={`form__input${errors.email && touched.email ? ' form__input--error' : ''}`}
                        />
                        <ErrorMessage name="email" component="div" className="form__error" />
                    </div>

                    <div className="form__field">
                        <label htmlFor="date" className="form__label">Choose date</label>
                        <Field
                            type="date"
                            id="date"
                            name="date"
                            min={today}
                            onChange={(e) => handleDateChange(e.target.value, setFieldValue, validateField)}
                            value={values.date}
                            aria-label="Choose reservation date"
                            aria-required="true"
                            aria-describedby="date-help"
                            className={`form__input${errors.date && touched.date ? ' form__input--error' : ''}`}
                        />
                        <ErrorMessage name="date" component="div" className="form__error" />
                    </div>

                    <div className="form__field">
                        <label htmlFor="time" className="form__label">Choose time</label>
                        <Field
                            as="select"
                            id="time"
                            name="time"
                            aria-label="Choose reservation time"
                            aria-required="true"
                            aria-describedby="time-help"
                            className={`form__input${errors.time && touched.time ? ' form__input--error' : ''}`}
                        >
                            <option value="">Select a time</option>
                            {availableTimes && availableTimes.map((timeOption) => (
                                <option key={timeOption} value={timeOption}>
                                    {timeOption}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="time" component="div" className="form__error" />
                    </div>

                    <div className="form__field">
                        <label htmlFor="guests" className="form__label">Number of guests</label>
                        <Field
                            type="number"
                            id="guests"
                            name="guests"
                            min="1"
                            max="10"
                            aria-label="Number of guests, minimum 1, maximum 10"
                            aria-required="true"
                            aria-describedby="guests-help"
                            className={`form__input${errors.guests && touched.guests ? ' form__input--error' : ''}`}
                        />
                        <ErrorMessage name="guests" component="div" className="form__error" />
                    </div>

                    <div className="form__field">
                        <label htmlFor="occasion" className="form__label">Occasion</label>
                        <Field
                            as="select"
                            id="occasion"
                            name="occasion"
                            aria-label="Select occasion for reservation"
                            aria-describedby="occasion-help"
                            className={`form__input${errors.occasion && touched.occasion ? ' form__input--error' : ''}`}
                        >
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                        </Field>
                        <ErrorMessage name="occasion" component="div" className="form__error" />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary form__submit"
                        aria-label="Submit reservation form"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Make Your reservation'}
                    </button>

                    {/* Form validation summary */}
                    {Object.entries(errors).filter(([field]) => touched[field]).length > 0 && (
                        <div className="form__summary">
                            <strong>Please fix the following errors:</strong>
                            <ul>
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