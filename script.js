// script.js
window.addEventListener('load', function () {
    const compassNeedle = document.getElementById('needle');
    const targetLatitude = 40.1096473; // Example: San Francisco, CA
    const targetLongitude = -88.2272838;

    function updateCompass() {
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition(function (position) {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;
                const angle = calculateAngle(userLatitude, userLongitude, targetLatitude, targetLongitude);

                window.addEventListener('deviceorientation', function (event) {
                    if (event.webkitCompassHeading !== undefined) {
                        // For iOS devices
                        const alpha = event.webkitCompassHeading;
                        const rotatedAngle = angle - alpha;
                        compassNeedle.style.transform = `translateX(-50%) rotate(${rotatedAngle}deg)`;
                    } else if (event.alpha !== null) {
                        // For non-iOS devices
                        const alpha = event.alpha;
                        const rotatedAngle = angle - alpha;
                        compassNeedle.style.transform = `translateX(-50%) rotate(${rotatedAngle}deg)`;
                    }
                });
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }

    function calculateAngle(lat1, lon1, lat2, lon2) {
        const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
        const angle = (Math.atan2(y, x) * 180) / Math.PI;
        return angle;
    }

    updateCompass();

    window.addEventListener('resize', updateCompass);
});
