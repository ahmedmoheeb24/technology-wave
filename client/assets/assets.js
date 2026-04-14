const BACKEND_URL = "https://api.technology-wave.com"; 

export const assets = {
  // Use encodeURI to handle spaces automatically or rename files to avoid spaces
  logo: `${BACKEND_URL}/uploads/logo.png`,
  about: {
    // Encoded spaces to %20 to ensure the browser can reach the path
    aircraft: `${BACKEND_URL}/uploads/about%20-%20aircraft.jfif`,
    part: `${BACKEND_URL}/uploads/about%20-%20part.jfif`,
  },
  services: {
    commercialAviation1: `${BACKEND_URL}/uploads/commercial-aviation-1.jfif`,
    commercialAviation2: `${BACKEND_URL}/uploads/commercial-aviation-2.jfif`,
    militaryDivision1: `${BACKEND_URL}/uploads/military-division-1.jfif`,
    militaryDivision2: `${BACKEND_URL}/uploads/military-division-2.jfif`,
    helicopters1: `${BACKEND_URL}/uploads/helicopters-1.jfif`,
    helicopters2: `${BACKEND_URL}/uploads/helicopters-2.jfif`,
    aircraftMaintenance1: `${BACKEND_URL}/uploads/aircraft-maintenance-1.jfif`,
    aircraftMaintenance2: `${BACKEND_URL}/uploads/aircraft-maintenance-2.jfif`,
    aircraftSolutions1: `${BACKEND_URL}/uploads/aircraft-solutions-1.jfif`,
    aircraftSolutions2: `${BACKEND_URL}/uploads/aircraft-solutions-2.jfif`,
    aircraftParts1: `${BACKEND_URL}/uploads/aircraft-parts-1.jfif`,
    aircraftParts2: `${BACKEND_URL}/uploads/aircraft-parts-2.jfif`,
  }
};