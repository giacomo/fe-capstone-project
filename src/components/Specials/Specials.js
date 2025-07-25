import "./Specials.css";
import MealCard from "../MealCard/MealCard";
import greekSaladImage from "../../assets/greek-salad.jpg";
import bruschettaImage from "../../assets/bruschetta.jpg";
import lemonDessertImage from "../../assets/lemon-dessert.jpeg";

const meals = [
    {
        key: 1,
        name: "Greek Salad",
        image: greekSaladImage,
        price: "$10.00",
        description: `The famous greek salad of crispy lettuce, peppers, olives and
      our Chicago style feta cheese, garnished with crunchy garlic and rosemary
      croutons.`,
    },
    {
        key: 2,
        name: "Bruschetta",
        image: bruschettaImage,
        price: "$6.79",
        description: `Our Bruschetta is made from grilled bread that has been
      smeared with garlic and seasoned with salt and olive oil.`,
    },
    {
        key: 3,
        name: "Lemon Dessert",
        image: lemonDessertImage,
        price: "$8.50",
        description: `This comes straight from grandma's recipe book, every last
      ingredient has been sourced and is as authentic as can be imagined.`,
    },
];


export default function Specials() {
    return (
        <>
            <section className="specials">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 align-self-center">
                            <h2 className="mb-0">This Weeks specials!</h2>
                        </div>
                        <div className="col-12 col-md-4 align-self-center justify-self-end">
                            <button className="btn btn-primary">Online Menu</button>
                        </div>
                    </div>
                    <div className="row special-cards">
                        {meals.map((meal) => (
                            <MealCard key={meal.key} meal={meal} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}