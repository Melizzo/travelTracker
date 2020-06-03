// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// Imports
import './css/base.scss';
import "./css/styles.scss";
import ApiFetch from './apiFetch';
import './images/loginPageTravel.jpg'


let api = new ApiFetch();

// Data Fetching

const fetchData = () => {
  const travelersData = api.getTravelersData();
  // const singleTravelerData = api.getSingleTravelerData(id)
  const tripsData = api.getAllTrips();
  const destinationsData = api.getAllDestinations();
  
  Promise.all([travelersData, tripsData, destinationsData])
    .then(dataSet => dataSet = {
      travelersData: dataSet[0].travelersData,
      // singleTravelerData: dataSet[1].singleTravelerData,
      tripsData: dataSet[1].tripsData,
      destinationsData: dataSet[2].destinationsData, 
    }).then(dataSet => {
      console.log(travelersData);
      
      // generateUser(dataSet.singleTravelerData, dataSet.tripsData);
      // createCards(dataSet.recipeData);
      // findTags(dataSet.recipeData);
    })
    .catch(error => console.log(error.message))
}

fetchData()

// On click of submit, instante the all the data.  
// Find the traveler/travelAgency
// 


console.log('This is the JavaScript entry file - your code begins here.');
