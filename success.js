document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");
  
    if (orderId) {
      try {
        const res = await fetch(`http://localhost:3000/get-book-link?orderId=${orderId}`);
        const data = await res.json();
  
        if (data.bookLink) {
          document.getElementById("download-btn").href = data.bookLink;
        } else {
          document.getElementById("download-btn").textContent = "Link not found.";
        }
      } catch (err) {
        document.getElementById("download-btn").textContent = "Error loading link.";
      }
    }
  });