class Traveler {
  constructor(travelerData, tripsData) {
    this.travelerData = this.checkIfDataIsArray(travelerData)
    this.tripsData = this.checkIfDataIsArray(tripsData)
  }

  checkIfDataIsArray(data) {
    return data instanceof Array ? data : "Error, data for traveler\'s cannot be found."
  }

  // findUser(id) {
  //   return id === Number(id) ? this.userData.find((user) => user.id === id) : `Sorry, '${id}' is not a user id.`
  // }
  
  findTravelerTrips() {

  }

  


  

}

export default Traveler;