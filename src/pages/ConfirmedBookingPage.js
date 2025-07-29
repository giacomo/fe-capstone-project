import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import Main from "../components/Main/Main";
import "./ConfirmedBookingPage.css";

export default function ConfirmedBookingPage() {
    const [lastBooking, setLastBooking] = React.useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        if (bookings.length > 0) {
            setLastBooking(bookings[bookings.length - 1]);
        } else {
            // Navigate away when no bookings exist
            navigate("/reservations");
        }
    }, [navigate]);

    const handleDelete = () => {
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        if (bookings.length > 0) {
            bookings.pop();
            localStorage.setItem("bookings", JSON.stringify(bookings));
        }
        setLastBooking(null);
        navigate("/reservations");
    };

    return (
        <Main>
            <section className="confirmed-booking-page">
                <div className="message">
                    <h1>Booking Confirmed</h1>
                    <p>Thank you for your reservation! We look forward to serving you.</p>
                    <p>If you have any questions, please contact us.</p>
                </div>
                {lastBooking && (
                    <div className="details-card">
                        <h2>Reservation Details</h2>
                        <div className="details-container">
                            <div className="details-row">
                                <span className="details-label">Name:</span>
                                <span className="details-value">{lastBooking.firstName} {lastBooking.lastName}</span>
                            </div>
                            <div className="details-row">
                                <span className="details-label">Email:</span>
                                <span className="details-value">{lastBooking.email}</span>
                            </div>
                            <div className="details-row">
                                <span className="details-label">Date:</span>
                                <span className="details-value">{lastBooking.date}</span>
                            </div>
                            <div className="details-row">
                                <span className="details-label">Time:</span>
                                <span className="details-value">{lastBooking.time}</span>
                            </div>
                            <div className="details-row">
                                <span className="details-label">Guests:</span>
                                <span className="details-value">{lastBooking.guests}</span>
                            </div>
                            <div className="details-row">
                                <span className="details-label">Occasion:</span>
                                <span className="details-value">{lastBooking.occasion}</span>
                            </div>
                        </div>
                        <button className="delete-button" onClick={handleDelete}>
                            Cancel Reservation
                        </button>
                    </div>
                )}
            </section>
        </Main>
    );
}