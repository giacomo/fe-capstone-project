import "./Testimonials.css";
import TestimonialCard from "../TestimonialCard/TestimonialCard";


const testimonials = [
    {
        key: 1,
        name: "Anthony",
        image:
            "https://i.pravatar.cc/300?img=52",
        rating: 4.5,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus tempor felis a accumsan.",
    },
    {
        key: 2,
        name: "Mary",
        image:
            "https://i.pravatar.cc/300?img=24",
        rating: 3,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus tempor felis a accumsan.",
    },
    {
        key: 3,
        name: "John",
        image: "https://i.pravatar.cc/300?img=59",
        rating: 5,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus tempor felis a accumsan.",
    },
    {
        key: 4,
        name: "Sarah",
        image: "https://i.pravatar.cc/300?img=5",
        rating: 5,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus tempor felis a accumsan.",
    },
];

export default function Testimonials() {
    return (
        <section className="testimonials bg-secondary">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Testimonials</h2>
                    </div>
                </div>
                <div className="row testimonials-cards">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.key} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}