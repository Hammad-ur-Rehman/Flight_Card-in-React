import React from "react";
import { GiMeal } from "react-icons/gi";
import { IoIosArrowUp } from "react-icons/io";
import { FlightDetails } from "../Component/Types/Types";
import  flightmeal from "../Component/images/flight-meal.svg"

interface FlightCardProps {
  toggleDrawer: (id: number) => void;
  isDrawerOpen: boolean;
  id: number;
  flightdetails?: FlightDetails[];
  provider: string;
  airlineName: string;
  // airlineCode: string | number;
  flightNumber: string;
  origin: string;
  origincity:string;
  destination: string;
  destinationcity:string
  departureTime: string;
  arrivalTime: string;
  has_meal: boolean;
  price:number;
  duration:string | number;
  image:any
}

const FlightCard: React.FC<FlightCardProps> = ({
  toggleDrawer,
  isDrawerOpen,
  id,
  airlineName,
  flightNumber,
  origin,
  origincity,
  destination,
  destinationcity,
  departureTime,
  arrivalTime,
  has_meal,
  price,
  duration,
  image
}) => {
  const formatTime = (time: string) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Function to format the price with commas (e.g., 17325 -> 17,325)
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US"); // You can also change the locale if needed
  };

  return (
    <div className="flight-card" onClick={() => toggleDrawer(id)}>
      <div className="flight-info">
        <div className="flight-logo">
        <img src={image}></img>

          <p>{airlineName}</p> {/* Display airline name */}
          {/* <p>{airlineCode}</p> Display airline name */}
          <span>{flightNumber}</span> {/* Display flight number */}
            
        </div>
        <div className="flight_complete_details">
          <div className="flight-time">
            <div className="departure-time">
              <p className="time">{formatTime(departureTime)}</p>{" "}
              {/* Format departure time */}
            </div>
            <div className="duration">
              {/* Calculate and display duration here if needed */}
              {duration}
            </div>
            <div className="arrival-time">
              <p className="time">{formatTime(arrivalTime)}</p>{" "}
              {/* Format arrival time */}
            </div>
          </div>
          <div className="flight-route">
            <p>
              {origincity}&nbsp;({origin}) <i>-</i> <span>Nonstop</span> <i>-</i> {destinationcity}&nbsp;({destination})
            </p>
            <span className="meal_food">
              <div>
                <span></span><GiMeal /> {has_meal ? "Meal" : "No Meal"}
              </div>
            </span>
            {/* <span className="meal_food">
              {flightdetails.map((detail: FlightDetails, i: number) => (
                <div key={i}>
                  {detail.has_meal ? (
                    <><GiMeal /> {has_meal}</>
                  ) : (
                    <><GiMeal /> {has_meal}</>
                  )}
                </div>
              ))}
            </span> */}
          </div>
        </div>
      </div>
      <div className="flight-price">
      <button
          className={`flight-button ${isDrawerOpen ? "active-open" : "active"}`}>
          {isDrawerOpen ? (
            <>
              <IoIosArrowUp /> Hide
            </>
          ) : (
            <span>PKR&nbsp;{formatPrice(price)} </span>  
          )}
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
