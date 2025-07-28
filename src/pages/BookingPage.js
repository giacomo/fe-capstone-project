/* global fetchAPI, submitAPI */
import "./BookingPage.css";
import Main from "../components/Main/Main";
import BookingForm from "../components/BookingForm/BookingForm";
import { useReducer } from "react";
import { useNavigate } from "react-router";

export function initializeTimes() {
    // Get today's date
    const today = new Date();
    // Use the fetchAPI to get available times for today
    return fetchAPI(today) || ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
}

export function updateTimes(state, action) {
    if (action.type === 'dateChange') {
        // Convert the date string to a Date object
        const selectedDate = new Date(action.date);
        // Use fetchAPI to get available times for the selected date
        return fetchAPI(selectedDate) || ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    }
    return state;
}

export default function BookingPage() {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
    const navigate = useNavigate();

    const submitForm = (formData) => {
        const success = submitAPI(formData);
        if (success) {
            navigate("/reservations/confirmed");
        } else {
            console.error('Form submission failed');
        }
    };

    return (
        <Main>
            <section className="booking-page bg-secondary">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="heading">
                                <h1>Reserve a table</h1>
                            </div>
                            <BookingForm
                                availableTimes={availableTimes}
                                updateTimes={dispatch}
                                onSubmit={submitForm}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </Main>
    );
}