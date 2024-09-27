// src/types.ts

// export interface User {
//     // FareOption: string;
//     // CheckBaggage: string;
//     // Cancellation: string;
//     // Modification: string;
//     // Seat: string;
//     // Meal: string;
//     // NoMeal:string;
//     // Price: string; // Ensure Price is included
//     provider:string;
//     legs:String;
//     segments:string;
//     has_meal:boolean;
//   }

  // src/types.ts

// Interface for the airline details (operating and marketing airlines)
interface Airline {
  airlineName: string;
  airlineCode: string | number;
}

// Interface for the flight segment (within a leg)
interface Segment {
  flight_number: string[]; // Assuming flight_number is an array
  // departure_datetime: string;
  // arrival_datetime: string;
  operating_airline: Airline;
  marketing_airline: Airline;
  origin: AirportInfo;
  destination: AirportInfo;
  duration_minutes: number;
}

// Interface for the airport details (origin and destination)
interface AirportInfo {
  name: string;
  airport: string;
  city: string;
  iata_code: string;
  time_zone: string;
  country: string;
}

// Interface for the flight leg (which contains segments)
interface Leg {
  origin: string;
  destination:string;
  departure_datetime: string;
  arrival_datetime :string;
  // flightNumber:number;

}

// interface FlightDetails {
//   provider: string;
//   legs: string;
//   segments: string;
//   has_meal: boolean;

// }

// Main interface for flight details (what you're calling `User`)
export interface FlightDetails {
  provider: string; // Example: 'SERENEAPI'
  legs: Leg[]; // Array of flight legs
  segments: Segment[]; // Array of segments
  has_meal: boolean; // Whether the flight includes a meal
  // flightdetails:[];
  index:any;
  airlineName:string;
  // airlineCode: string | number;
  flightNumber: string;
  origin: string;
  destination: string;
  arrivalTime: string;
  departureTime: string;
  price:number;
  duration:string | number;
  origincity:string;
  destinationcity:string
  flightdetails:[],
  airlineImages:any;
  fare_name:string;
  baggage:string;
  cancellation:string;
  meal:string;
  seat:string;
  modification:string;
  fare_options:[]
  
}

