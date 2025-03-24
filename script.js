function countdown(minutes) {
    let seconds = minutes * 60; // تحويل الدقائق إلى ثوانٍ
    let interval = setInterval(() => {
        if (seconds > 0) {
            let displayMinutes = Math.floor(seconds / 60);
            let displaySeconds = seconds % 60;

            // تنسيق العرض ليكون بالشكل "دقائق:ثواني"
            document.getElementById("countdown").innerHTML = `00:${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
            seconds--;
        } else {
            // إعادة العد التنازلي من 30 دقيقة
            seconds = minutes * 60;
        }
    }, 1000);
}

// الاستخدام:
countdown(30); // يبدأ العد التنازلي من 30 دقيقة