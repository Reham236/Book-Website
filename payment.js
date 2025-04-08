document.querySelectorAll('.btnSeller').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      const priceToSend = getCurrentPrice(); 

      const response = await fetch('http://localhost:3000/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price: priceToSend })
      });

      const url = await response.json();
      console.log(url);
      if (url) {
        window.location.href = url;
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Error during payment process");
    }
  });
});
