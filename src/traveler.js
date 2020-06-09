import domUpdates from "./domUpdates";

class Traveler {
  constructor(travelerData, tripsData, destinationsData) {
    this.travelerData = this.checkIfDataIsAnObject(travelerData);
    this.tripsData = this.checkIfDataIsArray(tripsData);
    this.destinationsData = this.checkIfDataIsArray(destinationsData);
  }

  checkIfDataIsAnObject(data) {
    return data instanceof Object
      ? data
      : "Error, data for the traveler cannot be found.";
  }

  checkIfDataIsArray(data) {
    return data instanceof Array
      ? data
      : "Error, data for traveler's data cannot be found.";
  }

  findTravelerFirstName() {
    const firstName = this.travelerData.name.split(" ")[0];
    return firstName;
  }

  findTravelerTrips() {
    const singleTravelerTrips = this.tripsData.filter((trip) => {
      if (trip.userID === this.travelerData.id) {
        return trip;
      }
    });
    return singleTravelerTrips;
  }

  findDestinationsOfTravelersTrips() {
    const travelersTrips = this.findTravelerTrips();
    const result = this.destinationsData.reduce((acc, destination) => {
      travelersTrips.forEach((trip) => {
        if (
          destination.id === trip.destinationID &&
          !acc.includes(destination)
        ) {
          acc.push(destination);
        }
      });
      return acc;
    }, []);
    return result;
  }

  findPendingTrips() {
    const travelersTrips = this.findTravelerTrips();
    const pendingTrips = travelersTrips.filter(trip => trip.status === 'pending')
    return pendingTrips
  }

  calculateTotalLodgingCostPerTripThisYear() {
    const singleTravelerLodgingCost = this.findTravelerTrips();
    const lodgingCosts = singleTravelerLodgingCost.reduce(
      (totalLodging, trip) => {
        this.destinationsData.forEach((destination) => {
          if (
            trip.destinationID === destination.id &&
            Number(trip.date.split("/")[0]) > 2019
          ) {
            totalLodging +=
              trip.duration * destination.estimatedLodgingCostPerDay;
          }
        });
        return totalLodging;
      },
      0
    );
    return lodgingCosts;
  }

  calculateTotalFlightCostPerTripThisYear() {
    const singleTravelerFlightCost = this.findTravelerTrips();
    const flightCosts = singleTravelerFlightCost.reduce(
      (totalFlightCost, trip) => {
        this.destinationsData.forEach((destination) => {
          if (
            trip.destinationID === destination.id &&
            Number(trip.date.split("/")[0]) > 2019
          ) {
            totalFlightCost +=
              trip.travelers * destination.estimatedFlightCostPerPerson;
          }
        });

        return totalFlightCost;
      },
      0
    );
    return flightCosts;
  }

  calculateTotalCostOfAllTrips() {
    const travelersTrips = this.findTravelerTrips();
    const result = travelersTrips.reduce(
      (totalCosts, trip) => {
        this.destinationsData.forEach((destination) => {
          if (
            trip.destinationID === destination.id 
          ) {
            const totalLodging = trip.travelers * destination.estimatedLodgingCostPerDay
            const totalFlights = (trip.travelers * destination.estimatedFlightCostPerPerson)
            totalCosts += (totalLodging + totalFlights) * trip.duration;
          }
        });
        return totalCosts;
      },
      0
    );
    return result;
  }

  calculateTotalCostOfTrips(array1, array2) {
    const totalCostOfTrips = array1 + array2;
    return totalCostOfTrips
  }

  calculateTravelAgency10PercentFee(num) {
    return 0.1 * num;
  }

  
}

export default Traveler;
