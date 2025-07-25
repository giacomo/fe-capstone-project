import "./TestimonialCard.css";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function TestimonialCard({testimonial}) {
    return (
        <article className="col-12 col-md-6 col-lg-3">
            <div className="testimonial-card">
                <div className="testimonial-card-header">
                    <div className="rating-stars">
                        {Array.from({length: 5}, (_, index) => {
                            if (index < Math.round(testimonial.rating)) {
                                return <FontAwesomeIcon key={index} icon={faStar} className="star" />;
                            } else if (
                                index === Math.round(testimonial.rating) &&
                                testimonial.rating % 1 !== 0
                            ) {
                                return <FontAwesomeIcon key={index} icon={faStarHalf} className="star" />;
                            } else {
                                return <FontAwesomeIcon key={index} icon={faStar} className="star star-empty" />;
                            }
                        })}
                    </div>
                    <span className="rating-value">{Math.round(testimonial.rating)} / 5 </span>
                </div>
                <div className="testimonial-card-body">
                    <div className="testimonial-card-header-text">
                        <h4>{testimonial.name}</h4>
                    </div>
                    <div className="testimonial-card-image">
                        <img src={testimonial.image} alt={testimonial.name} className="img-fluid" />
                    </div>
                </div>
                <div className="testimonial-card-footer">
                    <blockquote>
                        <p>{testimonial.quote}</p>
                    </blockquote>
                </div>
            </div>
        </article>
    );
}