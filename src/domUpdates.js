
  // QuerySelectors
  
  let domUpdates = {
   
    
  displayPage() {
    const welcomePage = document.querySelector('#welcome-login-area');
    const travelAgencyPage = document.querySelector('#travel-agency-page');
    const travelerPage = document.querySelector('#traveler-page');

    if(document.querySelector('#login-username-input').value === 'manager') {
      welcomePage.classList.add('hidden')
      welcomePage.classList.remove('login-area')
      travelAgencyPage.classList.remove('hidden')
    } else {
      welcomePage.classList.add('hidden')
      welcomePage.classList.remove('login-area')
      travelerPage.classList.remove('hidden')
      travelerPage.classList.add('traveler-login-page')
      console.log('traveler Page')
    }
  },

  displayTravelerWelcome() {
    const travelerHeaderWelcome = document.querySelector('#traveler-Header');
    travelerHeaderWelcome.innerHTML = `<h2>Your adventure awaits ${traveler.findTravelerFirstName()}!</h>`
  }

}

export default domUpdates;