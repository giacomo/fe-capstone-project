import "./MealCard.css";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function MealCard({meal}) {
    return (
        <article className="col-12 col-md-6 col-lg-4">
            <div className="special-card">
                <div className="special-card-image">
                    <img src={meal.image} alt={meal.name} className="img-fluid" />
                </div>
                <div className="special-card-header">
                    <div className="special-card-header-text">
                        <h2>{meal.name}</h2>
                        <span className="price">{meal.price}</span>
                    </div>
                </div>
                <div className="special-card-body">
                    <p>{meal.description}</p>
                </div>
                <div className="special-card-footer">
                    <button className="btn btn-small btn-link">Order a delivery <FontAwesomeIcon icon={faMotorcycle}/></button>
                </div>
            </div>
        </article>
    );
}