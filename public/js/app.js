console.log('Client side javascript loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
   
    fetch(`/weather?address=${location}`).then(response => {
        return response.json();
    }).then(data => {
       
        if(data.error){
           messageOne.textContent = data.error;
        } else {
            
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }

        search.value = '';

    }).catch(error => {
        console.log(error);
    });
});