document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const powerPoint = document.getElementById('power-point');
    const feedbackList = document.getElementById('feedback-list');

    passwordInput.addEventListener('input', updatePasswordAnalyzer);

    function updatePasswordAnalyzer() {
        const password = passwordInput.value;
        const strength = getPasswordStrength(password);
        updateStrengthDisplay(strength);
        updateFeedback(password);
    }

    function getPasswordStrength(password) {
        let strength = 0;
        if (password.length > 6) strength++;
        if (password.length > 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[\W]/.test(password)) strength++;
        return strength;
    }

    function updateStrengthDisplay(strength) {
        const maxStrength = 6;
        const strengthPercentage = (strength / maxStrength) * 100;
        powerPoint.style.width = strengthPercentage + '%';

        if (strength < 2) {
            powerPoint.style.backgroundColor = '#D73F40';
        } else if (strength < 4) {
            powerPoint.style.backgroundColor = '#DC6551';
        } else if (strength < 5) {
            powerPoint.style.backgroundColor = '#F2B84F';
        } else if (strength < 6) {
            powerPoint.style.backgroundColor = '#BDE952';
        } else {
            powerPoint.style.backgroundColor = '#3ba62f';
        }
    }

    function updateFeedback(password) {
        const feedback = [];
        if (password.length < 6) {
            feedback.push('Password is too short (minimum 6 characters).');
        } else {
            if (!/[0-9]/.test(password)) feedback.push('Include at least one number.');
            if (!/[a-z]/.test(password)) feedback.push('Include at least one lowercase letter.');
            if (!/[A-Z]/.test(password)) feedback.push('Include at least one uppercase letter.');
            if (!/[\W]/.test(password)) feedback.push('Include at least one special character.');
            if (password.length <= 10) feedback.push('Increase password length for better security.');
        }

        feedbackList.innerHTML = feedback.map(item => `<li>${item}</li>`).join('');
    }
});
