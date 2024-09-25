const networkPayLoad = {
    route_type: "ONEWAY", 
    cabin_class: {
      code: "Y", 
      label: "Economy", 
    },
    legs: [
      {
        departure_date: "2024-10-12", 
        origin: "KHI", 
        destination: "ISB", 
      },
    ],
    traveler_count: {
      num_adult: 1, 
      num_child: 0, 
      num_infant: 0, 
    },
    analytics_data: {
      is_first_request: true, // Indicates if this is the first request made by the user
      search_id: "9e07023d-8f91-4f78-8ca7-a8147924853b", // A unique identifier for the search session
      platform: "Web Browser", 
      device_id: "ds=ID=68beb47f87a2db0b:T=1714030924:RT=1717568181:S=ALNI_MYpdGcN6XSIdQ5yPtQF552hp8k6LA", // A unique identifier for the device making the request
    },
  };
  
  export default networkPayLoad;
  

