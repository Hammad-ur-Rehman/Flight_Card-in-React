import React, { useState, useEffect, useRef } from "react";
import Drawer from "../Component/Drawer/Drawer";
import Loader from "../Component/Loader/Loader";
import "../App.css";
import { flightSearchRequest, ApiResponse } from "../apis/flightSearchApi";
import { FlightDetails } from "../Component/Types/Types";
import FlightCard from "./flightCard";
import Button from "../Component/Button/Button";
import networkPayLoad from "../apis/tempNetworkPayload";
import airlineImages from "../Component/images/airlineImage";
import { LuBaggageClaim } from "react-icons/lu";
import { GiMeal } from "react-icons/gi";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import flightbaggageimage from "../Component/images/flight-baggag.svg";
import flightmeal from "../Component/images/flight-meal.svg";
import flightseat from "../Component/images/flight-seat.svg";

const Flightsearch: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [data, setData] = useState<FlightDetails[]>([]);
  const [openCards, setOpenCards] = useState<{ [key: number]: boolean }>({});
  const [pollingActive, setPollingActive] = useState<boolean>(true);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [newData, setNewData] = useState();

  const flightCardRef = useRef<HTMLDivElement>(null);

  const POLLING_INTERVAL = 3000; // 3 seconds
  const MAX_POLLING_DURATION = 30000; // 30 seconds

  const toggleDrawer = (id: number) => {
    setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const startPolling = async (elapsedTime: number) => {
      if (elapsedTime >= MAX_POLLING_DURATION) {
        setPollingActive(false); // Stop polling after max duration
        return;
      }

      try {
        console.log("Fetching data...");
        const response: ApiResponse = await flightSearchRequest(networkPayLoad);
        const flightsData: FlightDetails[] = response.data.flights.flat();
        console.log("Flights data", flightsData);

        // Function to calculate the time difference between origin and destination
        const calculateFlightDuration = (
          departureTime: string,
          arrivalTime: string
        ) => {
          const departureDate = new Date(departureTime);
          const arrivalDate = new Date(arrivalTime);
          const timeDifference =
            arrivalDate.getTime() - departureDate.getTime();
          const hours = Math.floor(timeDifference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );
          return { hours, minutes };
        };

        if (flightsData && flightsData.length > 0) {
          let data: any = [];
          flightsData.map((item: any) => {
            const leg = item.legs[0];
            const segment = item.legs[0].segments[0];
            const flightNumber = segment.flight_number[0];
            const meta = item.meta;
            const fare_options = item.fare_options;


            const { hours, minutes } = calculateFlightDuration(
              segment.departure_datetime,
              segment.arrival_datetime
            );

            const flightObject = {
              provider: item.provider,
              airlineName: leg.operating_airline.name,
              origincity: segment.origin.city,
              origin: segment.origin.iata_code,
              destination: segment.destination.iata_code,
              destinationcity: segment.destination.city,
              departureTime: segment.departure_datetime,
              arrivalTime: segment.arrival_datetime,
              has_meal: leg.has_meal,
              price: meta.price,
              flightNumber: flightNumber,
              duration: `${hours}h ${minutes}m`,
              baggage: fare_options.baggage,
              cancellation: fare_options.cancellation,
              modification: fare_options.modification,
              seat: fare_options.seat,
              meal: fare_options.meal,
              fare_name: item.fare_options[0].fare_name,
              fare_options:fare_options
              // fare_name:fare_options.fare_name
            };
            console.log("Fare options for flight:", flightObject.fare_name); // Log the fare options
            data.push(flightObject);
          });

          setData(data);
        }

        // console.log("Card data" , data);

        // Continue polling only if response.poll is true
        if (!response.poll) {
          setTimeout(() => {
            startPolling(elapsedTime + POLLING_INTERVAL);
          }, POLLING_INTERVAL);
        } else {
          console.log("Polling stopped by server.");
          setPollingActive(false);
        }
      } catch (error) {
        console.log("Error fetching data:", error);

        // Retry after delay if error occurs
        setTimeout(() => {
          startPolling(elapsedTime + POLLING_INTERVAL);
        }, POLLING_INTERVAL);
      }
    };

    if (pollingActive) {
      startPolling(0); // Start polling with an elapsed time of 0
    }

    return () => {
      setPollingActive(false); // Clean up on unmount or when polling stops
    };
  }, [pollingActive]);

  const startPollingonClick = () => {
    console.log("Starting polling...");
    setPollingActive(true);
  };

  // useEffect(() => {
  //   const startPolling = async (elapsedTime: number) => {
  //     if (elapsedTime >= MAX_POLLING_DURATION) {
  //       setPollingActive(false); // Stop polling after max duration
  //       return;
  //     }

  //     try {
  //       console.log("Fetching data...");
  //       const response: ApiResponse = await flightSearchRequest(networkPayLoad);
  //       const flightsData: FlightDetails[] = response.data.flights.flat();
  //       console.log("Flights data", flightsData);

  //       // Function to calculate the time difference between origin and destination
  //       const calculateFlightDuration = (departureTime: string, arrivalTime: string) => {
  //         const departureDate = new Date(departureTime);
  //         const arrivalDate = new Date(arrivalTime);
  //         const timeDifference = arrivalDate.getTime() - departureDate.getTime();
  //         const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  //         const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  //         return { hours, minutes };
  //       };

  //       if (flightsData && flightsData.length > 0) {
  //         let data: any = [];
  //         flightsData.map((item: any) => {
  //           const leg = item.legs[0];
  //           const segment = item.legs[0].segments[0];
  //           const flightNumber = segment.flight_number[0];
  //           const meta = item.meta;

  //           const { hours, minutes } = calculateFlightDuration(segment.departure_datetime, segment.arrival_datetime);

  //           const flightObject = {
  //             provider: item.provider,
  //             airlineName: leg.operating_airline.name,
  //             origincity: segment.origin.city,
  //             origin: segment.origin.iata_code,
  //             destination: segment.destination.iata_code,
  //             destinationcity: segment.destination.city,
  //             departureTime: segment.departure_datetime,
  //             arrivalTime: segment.arrival_datetime,
  //             has_meal: leg.has_meal,
  //             price: meta.price,
  //             flightNumber: flightNumber,
  //             duration: `${hours}h ${minutes}m`,
  //           };

  //           data.push(flightObject);
  //         });

  //         setData(data);
  //       }

  //       // Stop polling if poll is false
  //       if (!response.poll) {
  //         console.log("Polling stopped by server.");
  //         setPollingActive(false); // Stop polling if `poll` flag is false
  //         return; // Exit from the polling function
  //       }

  //       // Continue polling if poll is true and hasn't reached max duration
  //       setTimeout(() => {
  //         startPolling(elapsedTime + POLLING_INTERVAL);
  //       }, POLLING_INTERVAL);

  //     } catch (error) {
  //       console.log("Error fetching data:", error);

  //       // Stop polling on error (optional)
  //       setPollingActive(false);
  //     }
  //   };

  //   // Start polling on component mount
  //   if (pollingActive) {
  //     startPolling(0); // Start polling with an elapsed time of 0
  //   }

  //   return () => {
  //     setPollingActive(false); // Clean up on unmount or when polling stops
  //   };
  // }, [pollingActive]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US"); // You can also change the locale if needed
  };

  return (
    <>
      {loader && (
        <div className="spinner">
          <Loader />
        </div>
      )}
      <div className="Container">
        <div className="airblue_data">
          {data && Array.isArray(data) && data.length > 0 ? (
            data.map((flight: FlightDetails, index: number) => {
              console.log("Flight object:", flight);

              return (
                <div key={index} ref={flightCardRef}>
                  <FlightCard
                    id={index}
                    toggleDrawer={toggleDrawer}
                    isDrawerOpen={!!openCards[index]}
                    provider={flight.provider}
                    airlineName={flight.airlineName}
                    flightNumber={flight.flightNumber}
                    origin={flight.origin}
                    destination={flight.destination}
                    departureTime={flight.departureTime}
                    arrivalTime={flight.arrivalTime}
                    has_meal={flight.has_meal}
                    price={flight.price}
                    duration={flight.duration}
                    origincity={flight.origincity}
                    destinationcity={flight.destinationcity}
                    image={airlineImages[flight.airlineName]}
                  />
                  {openCards[index] && (
                    <Drawer
                      isOpen={openCards[index]}
                      onClose={() => toggleDrawer(index)}
                      cardRef={flightCardRef}
                      flightdetails={[flight]}
                    >
                      <div className="container">
                        <table className="table_data">
                          <thead className="flight_options">
                            <tr>
                              <th>Fare Options</th>
                              <th>Check-in Baggage</th>
                              <th>Cancellation</th>
                              <th>Modification</th>
                              <th>Seat</th>
                              <th>Meal</th>
                              <th></th>
                            </tr>
                          </thead>

                          <tbody>
                            {flight.fare_options &&
                            flight.fare_options.length > 0 ? (
                              flight.fare_options.map((option:any, id: number) => 
                                  
                                  (
                                  <tr key={id}>
                                    <td>{option.fare_name}</td>
                                    <td>{option.offers_grid.baggage}</td>
                                    <td>{option.offers_grid.cancellation}</td>
                                    <td>{option.offers_grid.modification}</td>
                                    <td>{option.offers_grid.seat}</td>
                                    <td>{option.offers_grid.meal}</td>
                                    <td>
                                      <Button className="search-flight-card-price-button">
                                        <span>
                                          PKR&nbsp;{formatPrice(option.price.selling_fare)}{" "}
                                        </span>
                                      </Button>
                                    </td>
                                  </tr>
                                )
                              )
                            ) : (
                              <tr>
                                <td colSpan={7}>No fare options available</td>
                              </tr>
                            )}
                          </tbody> 

                          {/* <tbody>
                    <tr key={index}>
                      <td><span>{flight.fare_name}</span></td>
                      <td>{flight.baggage}</td>
                      <td>{flight.cancellation}</td>
                      <td>{flight.modification}</td>
                      <td>{flight.seat}</td>
                      <td>{flight.meal}</td>
                      <td>
                        <Button className="search-flight-card-price-button">
                          <span>PKR&nbsp;{formatPrice(flight.price)} </span> 
                        </Button>
                      </td>
                    </tr>
                    </tbody> */}
                        </table>
                      </div>
                    </Drawer>
                  )}
                </div>
              );
            })
          ) : (
            <p>No flight data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Flightsearch;
