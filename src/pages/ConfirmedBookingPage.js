import Main from "../components/Main/Main";

export default function ConfirmedBookingPage() {
    return (
        <Main>
            <section className="confirmed-booking-page">
                <div className="message">
                    <h1>Booking Confirmed</h1>
                    <p>Thank you for your reservation! We look forward to serving you.</p>
                    <p>If you have any questions, please contact us.</p>
                </div>
            </section>
        </Main>
    );
}