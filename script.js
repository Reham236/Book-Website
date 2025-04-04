function countdown(minutes,container_id) {
    let seconds = minutes * 60; // تحويل الدقائق إلى ثوانٍ
    let interval = setInterval(() => {
        if (seconds > 0) {
            let displayMinutes = Math.floor(seconds / 60);
            let displaySeconds = seconds % 60;

            // تنسيق العرض ليكون بالشكل "دقائق:ثواني"
            container_id.innerHTML = `00:${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
            seconds--;
        } else {
            // إعادة العد التنازلي من 30 دقيقة
            seconds = minutes * 60;
        }
    }, 1000);
}
 let timer=document.getElementById("timer");
 let countdownPrice=document.getElementById("countdownPrice")

// الاستخدام:
countdown(30,timer); // يبدأ العد التنازلي من 30 دقيقة
countdown(30,countdownPrice); // يبدأ العد التنازلي من 30 دقيقة


//Category Section
document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".categories-slider");
    const controls = document.querySelectorAll(".controls");

    controls.forEach((control, index) => {
        const leftArrow = control.querySelector(".left-arrow");
        const rightArrow = control.querySelector(".right-arrow");
        const slider = sliders[index]; // يربط الأسهم بالقسم الصحيح

        rightArrow.addEventListener("click", () => {
            slider.scrollBy({ left: 500, behavior: "smooth" });
        });

        leftArrow.addEventListener("click", () => {
            slider.scrollBy({ left: -500, behavior: "smooth" });
        });
    });
});

// redirect to checkout page
// document.getElementById("buyBtn").addEventListener("click", function() {
//     window.location.href = "checkout.html";
// });
// Array.from(document.getElementsByClassName("btnSeller")).forEach((btn) => {
//     btn.addEventListener("click", function() {
//         window.location.href = "checkout.html";
//     });
// });