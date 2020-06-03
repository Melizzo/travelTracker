class ApiFetch{
  constructor() {
    this.rootURL = "https://fe-apps.herokuapp.com/api/v1/travel-tracker/data"
  }
  getTravelersData() {
    let url = `${this.rootUrl}/travelers/travelers`
    return fetch(url).then(response => response.json())
  }

  getSingleTravelerData(id) {
    let url = `${this.rootUrl}/travelers/travelers/${id}`
    return fetch(url).then(response => response.json())
  }

  getAllTrips() {
    let url = `${this.rootUrl}/trips/trips`
    return fetch(url).then(response => response.json())
  }

  getAllDestinations() {
    let url = `${this.rootUrl}/destinations/destinations`
    return fetch(url).then(response => response.json())
  }

  postNewTrip(TOBEDETERMINEDOBJECT) {
    let url = `${this.rootUrl}/trips/trips`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TOBEDETERMINEDOBJECT),
      // {id: <number>, 
      // userID: <number>, 
      // destinationID: <number>, 
      // travelers: <number>, 
      // date: <string 'YYYY/MM/DD'>, 
      // duration: <number>, 
      // status: <string 'approved' or 'pending'>, 
      // suggestedActivities: <array of strings>}
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }

  modifySingleTrip(TOBEDETERMINEDOBJECT) {
    let url = `${this.rootUrl}/trips/updateTrip`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TOBEDETERMINEDOBJECT),
      // {id: <number>, 
      // status:<String of 'approved' or 'pending', 
      // suggestedActivities: <Array of strings>} 
      // Only a status or a suggestedActivities property is required for a successful request
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }

  deleteSingleTrip(TOBEDETERMINEDOBJECT) {
    let url = `${this.rootUrl}/trips/trips`;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TOBEDETERMINEDOBJECT),
      // {id: <number>} 
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }
}

export default ApiFetch;