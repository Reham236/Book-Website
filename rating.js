document.addEventListener("DOMContentLoaded", function () {
    let rating = 0;

    document.querySelectorAll(".star").forEach(star => {
        star.addEventListener("click", function () {
            rating = this.getAttribute("data-value");
            document.querySelectorAll(".star").forEach(s => s.classList.remove("active"));
            for (let i = 0; i < rating; i++) {
                document.querySelectorAll(".star")[i].classList.add("active");
            }
        });
    });

    async function submitReview() {
        const username = document.getElementById("username").value;
        const comment = document.getElementById("comment").value;
        
        if (!username || !comment || rating === 0) {
            document.getElementById("result").textContent = "Please fill all fields and select a rating!";
            document.getElementById("result").style.color = "red";
            return;
        }

        const reviewData = {
            username,
            comment,
            rating: parseInt(rating)
        };

        try {
            const response = await fetch("http://localhost:3000/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewData)
            });
            
            const result = await response.json();
            if (response.ok) {
                document.getElementById("result").textContent = `Thank you, ${username}! Your review has been submitted.`;
                document.getElementById("result").style.color = "green";
            } else {
                document.getElementById("result").textContent = `Error: ${result.message}`;
                document.getElementById("result").style.color = "red";
            }
        } catch (error) {
            document.getElementById("result").textContent = "Failed to submit review. Please try again later.";
            document.getElementById("result").style.color = "red";
        }
    }
    
    document.querySelector("button").addEventListener("click", submitReview);
});
