import MeetingTimeFinder from './app.js';

function initializeApp() {
    try {
        new MeetingTimeFinder();
    } catch (error) {
        console.error('Failed to initialize MeetingTimeFinder:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}