/**
 * Main application class for the Meeting Time Finder
 */
class MeetingTimeFinder {
    constructor() {
        this.environment = this.detectEnvironment();
        this.isSignedIn = this.environment === 'local' || this.environment === 'gas';
        this.currentResults = [];
        this.sortState = { column: 'percentage', direction: 'desc' };
        this.initializeApp();
    }

    async initializeMockService() {
        if (this.environment === 'local') {
            try {
                const { default: MockService } = await import('./mock.js');
                this.mockService = new MockService();
            } catch (error) {
                console.error('Failed to load mock service:', error);
                this.mockService = null;
            }
        }
    }

    detectEnvironment() {
        if (typeof google !== 'undefined' && google.script) {
            return 'gas';
        }
        if (window.location.protocol === 'file:' ||
            window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname === '') {
            return 'local';
        }
        return 'local';
    }

    async initializeApp() {
        try {
            console.log('App initializing in', this.environment, 'mode');

            this.bindEvents();
            this.setDefaultDates();

            // Set initial UI state immediately
            this.updateSignInStatus();

            if (this.environment === 'local') {
                await this.initializeMockService();
                this.showUserInfo();
            }
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to initialize application. Please refresh the page.');
        }
    }

    bindEvents() {
        const signInBtn = document.getElementById('sign-in-btn');
        if (signInBtn) {
            signInBtn.addEventListener('click', () => this.signIn());
        }

        document.getElementById('meeting-form').addEventListener('submit', (e) => this.handleFormSubmit(e));

        if (this.environment === 'local') {
            const startTimeSelect = document.getElementById('start-time');
            const endTimeSelect = document.getElementById('end-time');

            if (startTimeSelect) {
                startTimeSelect.addEventListener('change', () => this.updateEndTimeOptions());
                this.updateEndTimeOptions();
            }
        }
    }

    setDefaultDates() {
        const today = new Date();
        document.getElementById('start-date').value = today.toISOString().split('T')[0];
    }

    updateEndTimeOptions() {
        if (this.environment !== 'local') return;

        const startTime = document.getElementById('start-time').value;
        const endTimeSelect = document.getElementById('end-time');
        const startMinutes = this.timeToMinutes(startTime);

        for (let option of endTimeSelect.options) {
            const endMinutes = this.timeToMinutes(option.value);
            option.disabled = endMinutes <= startMinutes;
        }

        if (endTimeSelect.selectedOptions[0]?.disabled) {
            for (let option of endTimeSelect.options) {
                if (!option.disabled) {
                    endTimeSelect.value = option.value;
                    break;
                }
            }
        }
    }

    timeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    minutesToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
        return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
    }

    parseAttendees(input) {
        const attendees = [];
        const nameMapping = {};

        const lines = input.split(/\n+/).map(line => line.trim()).filter(line => line);

        for (const line of lines) {
            const entries = this.parseEmailLine(line);

            for (const entry of entries) {
                const openBracket = entry.indexOf('<');
                const closeBracket = entry.lastIndexOf('>');

                if (openBracket >= 0 && closeBracket >= 0 && closeBracket > openBracket) {
                    const name = entry.substring(0, openBracket).trim();
                    const email = entry.substring(openBracket + 1, closeBracket).trim();

                    if (this.isValidEmail(email)) {
                        attendees.push(email);
                        if (name) {
                            nameMapping[email] = name;
                        }
                    }
                } else {
                    const email = entry.trim();
                    if (this.isValidEmail(email)) {
                        attendees.push(email);
                    }
                }
            }
        }

        if (!window.parsedAttendeeNames) {
            window.parsedAttendeeNames = {};
        }
        Object.assign(window.parsedAttendeeNames, nameMapping);

        return attendees;
    }

    parseEmailLine(line) {
        const entries = [];
        let current = '';
        let inBrackets = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '<') {
                inBrackets = true;
                current += char;
            } else if (char === '>') {
                inBrackets = false;
                current += char;
            } else if (char === ',' && !inBrackets) {
                const trimmed = current.trim();
                if (trimmed) {
                    entries.push(trimmed);
                }
                current = '';
            } else {
                current += char;
            }
        }

        const trimmed = current.trim();
        if (trimmed) {
            entries.push(trimmed);
        }

        return entries;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getAttendeeDisplayName(email) {
        if (window.parsedAttendeeNames && window.parsedAttendeeNames[email]) {
            return window.parsedAttendeeNames[email];
        }

        if (window.attendeeNames && window.attendeeNames[email]) {
            return window.attendeeNames[email];
        }

        const localPart = email.split('@')[0];
        return localPart.split('.').map(part =>
            part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ');
    }

    async simulateSignIn() {
        if (this.mockService) {
            const result = await this.mockService.simulateSignIn();
            this.isSignedIn = result;
        } else {
            this.isSignedIn = true;
        }
        this.updateSignInStatus();
    }

    signIn() {
        if (this.environment === 'local') {
            this.simulateSignIn();
        } else {
            this.isSignedIn = true;
            this.updateSignInStatus();
        }
    }

    updateSignInStatus() {
        const authSection = document.getElementById('auth-section');
        const mainForm = document.getElementById('main-form');

        if (this.isSignedIn) {
            authSection.classList.add('hidden');
            mainForm.classList.remove('hidden');
            this.showUserInfo();
        } else {
            authSection.classList.remove('hidden');
            mainForm.classList.add('hidden');
            this.hideUserInfo();
        }
    }

    showUserInfo() {
        const userInfo = document.getElementById('user-info');

        if (this.environment === 'local') {
            if (this.mockService) {
                const mockUserInfo = this.mockService.getMockUserInfo();
                userInfo.textContent = mockUserInfo.displayText;
                this.currentUserEmail = mockUserInfo.email;
            } else {
                userInfo.textContent = '👤 Demo User';
                this.currentUserEmail = 'demo@example.com';
            }
        } else {
            google.script.run
                .withSuccessHandler((userEmail) => {
                    const userName = userEmail.split('@')[0];
                    userInfo.textContent = `👤 ${userName}`;
                    this.currentUserEmail = userEmail;
                })
                .withFailureHandler(() => {
                    userInfo.textContent = '👤 Signed In';
                    this.currentUserEmail = null;
                })
                .getCurrentUserEmail();
        }
        userInfo.classList.remove('hidden');
    }

    hideUserInfo() {
        document.getElementById('user-info').classList.add('hidden');
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        const formData = this.getFormData();
        if (!this.validateForm(formData)) {
            return;
        }

        this.showLoading(true);
        this.hideError();

        try {
            console.log('Finding meeting times...');
            const results = await this.findMeetingTimes(formData);
            console.log('Results:', results);
            this.displayResults(results);
        } catch (error) {
            console.error('Error:', error);
            this.showError(`Error finding meeting times: ${error.message}`);
        } finally {
            this.showLoading(false);
        }
    }

    getFormData() {
        const startDateValue = document.getElementById('start-date').value;
        const startDate = new Date(startDateValue);
        const daysForward = parseInt(document.getElementById('days-forward').value);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + daysForward);

        const attendeesInput = document.getElementById('attendees').value;
        let attendees = this.parseAttendees(attendeesInput);

        const includeSelf = document.getElementById('include-self').checked;
        if (includeSelf && this.currentUserEmail) {
            if (!attendees.includes(this.currentUserEmail)) {
                attendees.push(this.currentUserEmail);
            }
        }

        return {
            attendees,
            startDate: startDateValue,
            endDate: endDate.toISOString().split('T')[0],
            startTime: document.getElementById('start-time').value,
            endTime: document.getElementById('end-time').value,
            slotLength: parseInt(document.getElementById('slot-length').value)
        };
    }

    validateForm(formData) {
        if (formData.attendees.length === 0) {
            this.showError('Please enter at least one valid attendee email address. Supported formats: email@domain.com or Name <email@domain.com>');
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [year, month, day] = formData.startDate.split('-').map(Number);
        const startDate = new Date(year, month - 1, day);

        if (startDate.getTime() < today.getTime()) {
            this.showError('Start date must be today or in the future.');
            return false;
        }

        const startMinutes = this.timeToMinutes(formData.startTime);
        const endMinutes = this.timeToMinutes(formData.endTime);
        if (endMinutes <= startMinutes) {
            this.showError('End time must be after start time.');
            return false;
        }

        return true;
    }

    async findMeetingTimes(formData) {
        if (this.environment === 'local') {
            return this.findMeetingTimesLocal(formData);
        } else {
            return this.findMeetingTimesGoogle(formData);
        }
    }

    async findMeetingTimesLocal(formData) {
        if (this.mockService) {
            return await this.mockService.findMeetingTimes(formData);
        } else {
            throw new Error('Mock service not available');
        }
    }

    async findMeetingTimesGoogle(formData) {
        return new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)
                .findMeetingTimes(formData);
        });
    }

    displayResults(results) {
        const resultsContent = document.getElementById('results-content');

        if (!resultsContent) {
            console.error('Could not find results-content element!');
            return;
        }

        this.currentResults = results;

        if (results.length === 0) {
            resultsContent.innerHTML = '<p>No available meeting times found for the selected criteria.</p>';
        } else {
            const tableHTML = this.generateResultsTable(results);
            resultsContent.innerHTML = tableHTML;
            this.bindSortingEvents();
            this.updateSortingIndicators();
        }

        document.getElementById('results').classList.remove('hidden');
    }

    generateResultsTable(results) {
        let html = `
            <table class="results-table">
                <thead>
                    <tr>
                        <th class="sortable" data-column="dateTime">Date & Time</th>
                        <th class="sortable" data-column="availableCount">Available Attendees</th>
                        <th class="sortable" data-column="percentage">Availability</th>
                        <th class="sortable" data-column="unavailableAttendees">Unavailable Attendees</th>
                    </tr>
                </thead>
                <tbody>
        `;

        results.forEach((result, i) => {
            try {
                const dateTime = new Date(result.dateTime);
                const formattedDate = dateTime.toLocaleDateString();
                const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let availabilityClass = 'low';
                if (result.percentage >= 80) {
                    availabilityClass = 'high';
                } else if (result.percentage >= 50) {
                    availabilityClass = 'medium';
                }

                const unavailableList = result.unavailableAttendees && result.unavailableAttendees.length > 0 ?
                                      result.unavailableAttendees.map(email => this.getAttendeeDisplayName(email)).join(', ') : 'None';

                html += `
                    <tr>
                        <td>${formattedDate} ${formattedTime}</td>
                        <td>${result.availableCount} of ${result.totalCount}</td>
                        <td class="availability ${availabilityClass}">${result.percentage}%</td>
                        <td>${unavailableList}</td>
                    </tr>
                `;
            } catch (error) {
                console.error(`Error processing result ${i}:`, error, result);
            }
        });

        html += '</tbody></table>';
        return html;
    }

    showLoading(show) {
        document.getElementById('loading').classList.toggle('hidden', !show);
        if (show) {
            document.getElementById('results').classList.add('hidden');
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    hideError() {
        document.getElementById('error-message').classList.add('hidden');
    }

    bindSortingEvents() {
        const headers = document.querySelectorAll('.results-table th.sortable');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.column;
                this.sortResults(column);
            });
        });
    }

    sortResults(column) {
        if (this.sortState.column === column) {
            this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortState.column = column;
            this.sortState.direction = 'asc';
        }

        const sortedResults = [...this.currentResults].sort((a, b) => {
            let valueA, valueB;

            switch (column) {
                case 'dateTime':
                    valueA = new Date(a.dateTime);
                    valueB = new Date(b.dateTime);
                    break;
                case 'availableCount':
                    valueA = a.availableCount;
                    valueB = b.availableCount;
                    break;
                case 'percentage':
                    valueA = a.percentage;
                    valueB = b.percentage;
                    break;
                case 'unavailableAttendees':
                    valueA = a.unavailableAttendees ? a.unavailableAttendees.length : 0;
                    valueB = b.unavailableAttendees ? b.unavailableAttendees.length : 0;
                    break;
                default:
                    return 0;
            }

            let comparison = 0;
            if (valueA > valueB) {
                comparison = 1;
            } else if (valueA < valueB) {
                comparison = -1;
            }

            return this.sortState.direction === 'desc' ? -comparison : comparison;
        });

        const resultsContent = document.getElementById('results-content');
        const tableHTML = this.generateResultsTable(sortedResults);
        resultsContent.innerHTML = tableHTML;
        this.bindSortingEvents();
        this.updateSortingIndicators();
    }

    updateSortingIndicators() {
        const headers = document.querySelectorAll('.results-table th.sortable');
        headers.forEach(header => {
            header.classList.remove('sort-asc', 'sort-desc');
        });

        if (this.sortState.column) {
            const currentHeader = document.querySelector(`[data-column="${this.sortState.column}"]`);
            if (currentHeader) {
                currentHeader.classList.add(`sort-${this.sortState.direction}`);
            }
        }
    }
}

export default MeetingTimeFinder;