
  // QuerySelectors
  const travelerPage = document.querySelector('#traveler-page');
  const welcomePage = document.querySelector('#welcome-login-area');
  const travelAgencyPage = document.querySelector('#travel-agency-page');

let DomUpdates = {

//   togglePage(showPage, hidePage) {
//     $(showPage).toggle("hidden")
//     $(hidePage).toggle("hidden")
// }

  displayPage() {
    if(document.querySelector('#login-username-input').value === 'manager') {
      welcomePage.classList.add('hidden')
      welcomePage.classList.remove('login-area')
      travelAgencyPage.classList.remove('hidden')
    } else {
      welcomePage.classList.add('hidden')
      welcomePage.classList.remove('login-area')
      travelerPage.classList.remove('hidden')
      console.log('traveler Page')
    }
   
  }
}

export default DomUpdates;