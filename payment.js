document.querySelectorAll('.btnSeller').forEach(button => {
    button.addEventListener('click', async () => {
      try {
        const response = await fetch('http://localhost:3000/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const url = await response.json();
        if (url) {
          // بنفتح صفحة الدفع اللي بيرجعها السيرفر
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
 
