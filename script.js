function countdown(minutes,container_id) {
    let seconds = minutes * 60; 
    let interval = setInterval(() => {
        if (seconds > 0) {
            let displayMinutes = Math.floor(seconds / 60);
            let displaySeconds = seconds % 60;

           
            container_id.innerHTML = `00:${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
            seconds--;
        } else {
           
            seconds = minutes * 60;
        }
    }, 1000);
}
 let timer=document.getElementById("timer");
//  let countdownPrice=document.getElementById("countdownPrice")


countdown(30,timer); 









// Set the starting date 
const startDate = new Date("2025-04-08");

// Set the end date after 20 days
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 20);

const countdownElement = document.getElementById("countdownPrice");

function updateCountdown() {
  const now = new Date();
  const diff = endDate - now;

  if (diff <= 0) {
    countdownElement.textContent = "The offer has ended!";
    countdownElement.style.backgroundColor = "#555";
    document.getElementById("offer").style.display = "none"; 
    clearInterval(updateCountdown); 
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownElement.textContent =
    `Offer ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateCountdown(); // initial load
setInterval(updateCountdown, 1000); // update every second

//Category Section
document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".categories-slider");
    const controls = document.querySelectorAll(".controls");

    controls.forEach((control, index) => {
        const leftArrow = control.querySelector(".left-arrow");
        const rightArrow = control.querySelector(".right-arrow");
        const slider = sliders[index]; 

        rightArrow.addEventListener("click", () => {
            slider.scrollBy({ left: 500, behavior: "smooth" });
        });

        leftArrow.addEventListener("click", () => {
            slider.scrollBy({ left: -500, behavior: "smooth" });
        });
    });
});

// redirect to checkout page
document.getElementById("buyBtn").addEventListener("click", function() {
    window.location.href = "#price-details";
});
const originalPrice = 37;
const discountedPrice = 27;


function isOfferActive() {
    const now = new Date();
    return now < endDate;
  }
  
  function getCurrentPrice() {
    return isOfferActive() ? discountedPrice : originalPrice;
  }
  