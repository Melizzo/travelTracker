let ApiFetch = {
  getTravelersData() {
    return fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers`)
    .then(response => {
      if(!response.ok) {
        throw response.message
      }
      return response.json()})
    .catch(err => {throw err})
  },

  getSingleTravelerData(id) {
    return fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${id}`)
    .then(response => {
      if(!response.ok) {
        throw response.message
      }
      return response.json()})
    .catch(err => {throw err})
  },

  getAllTrips() {
    return fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips`)
    .then(response => response.json())
  },

  getAllDestinations() {
    return fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations`)
   .then(response => response.json())
  },

  postNewTrip(bookedTrip) {
    return fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //error Uncaught TypeError: JSON.stringify(...) is not a function
        body: JSON.stringify(bookedTrip) ({
      })
      .then(response => {
        if(!response.ok) {
          throw response.message
        }
        return response.json()})
      .catch(err => {throw err})
    })
  },

  // modifySingleTrip(TOBEDETERMINEDOBJECT) {
  //   return fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(TOBE DETERMINEDOBJECT, {
  //     // {id: <number>, 
  //     // status:<String of 'approved' or 'pending', 
  //     // suggestedActivities: <Array of strings>} 
  //     // Only a status or a suggestedActivities property is required for a successful request
  //     })
  //   })
  //     .then(response => console.log(response.json()))
  //     .catch(err => console.log(err.message))
  // },

  deleteSingleTrip(TOBEDETERMINEDOBJECT) {
    let url = `https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips`;
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