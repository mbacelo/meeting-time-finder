/**
 * MockService provides mock data and functionality for local development
 */
class MockService {
    static SIGN_IN_DELAY = 500;
    static SEARCH_DELAY = 1500;
    static MOCK_DAYS_COUNT = 7;
    static SLOT_INCREMENT_MINUTES = 30;

    constructor() {
        this.mockUserEmail = 'demo@example.com';
        this.mockUserName = 'Demo User';
        this.initializeMockData();
    }

    initializeMockData() {
        const attendeeNames = {
            'demo@example.com': 'Demo User',
            'john@example.com': 'John Smith',
            'jane@example.com': 'Jane Doe',
            'bob@example.com': 'Bob Johnson',
            'alice@example.com': 'Alice Brown',
            'mike@example.com': 'Mike Wilson'
        };

        window.attendeeNames = attendeeNames;
        window.mockCalendarData = this.generateMockCalendarData();
    }

    generateMockCalendarData() {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const currentDate = today.getDate();

        console.log('Generating mock data from date:', today.toISOString());

        const dates = [];
        for (let i = 0; i < MockService.MOCK_DAYS_COUNT; i++) {
            const date = new Date(currentYear, currentMonth, currentDate + i);
            dates.push(date.toISOString().split('T')[0]);
        }

        console.log('Mock data dates:', dates);

        return {
            'demo@example.com': [
                {
                    start: dates[1] + 'T09:00:00Z',
                    end: dates[1] + 'T10:00:00Z',
                    summary: 'Morning Standup'
                },
                {
                    start: dates[2] + 'T15:00:00Z',
                    end: dates[2] + 'T16:00:00Z',
                    summary: 'Demo Preparation'
                },
                {
                    start: dates[3] + 'T11:00:00Z',
                    end: dates[3] + 'T12:00:00Z',
                    summary: 'Product Review'
                }
            ],

            'john@example.com': [
                {
                    start: dates[1] + 'T10:00:00Z',
                    end: dates[1] + 'T11:00:00Z',
                    summary: 'Team Standup'
                },
                {
                    start: dates[1] + 'T14:00:00Z',
                    end: dates[1] + 'T15:30:00Z',
                    summary: 'Client Meeting'
                },
                {
                    start: dates[2] + 'T09:00:00Z',
                    end: dates[2] + 'T10:00:00Z',
                    summary: 'Morning Sync'
                },
                {
                    start: dates[2] + 'T13:00:00Z',
                    end: dates[2] + 'T14:00:00Z',
                    summary: 'Lunch Meeting'
                },
                {
                    start: dates[3] + 'T11:00:00Z',
                    end: dates[3] + 'T12:00:00Z',
                    summary: 'Project Review'
                },
                {
                    start: dates[3] + 'T15:30:00Z',
                    end: dates[3] + 'T16:30:00Z',
                    summary: 'Design Discussion'
                },
                {
                    start: dates[4] + 'T10:30:00Z',
                    end: dates[4] + 'T11:30:00Z',
                    summary: 'Code Review'
                }
            ],

            'jane@example.com': [
                {
                    start: dates[1] + 'T09:30:00Z',
                    end: dates[1] + 'T10:30:00Z',
                    summary: 'Marketing Sync'
                },
                {
                    start: dates[1] + 'T11:30:00Z',
                    end: dates[1] + 'T12:30:00Z',
                    summary: 'Budget Meeting'
                },
                {
                    start: dates[2] + 'T10:00:00Z',
                    end: dates[2] + 'T11:30:00Z',
                    summary: 'Strategy Planning'
                },
                {
                    start: dates[2] + 'T14:30:00Z',
                    end: dates[2] + 'T15:30:00Z',
                    summary: 'HR Interview'
                },
                {
                    start: dates[3] + 'T09:00:00Z',
                    end: dates[3] + 'T10:30:00Z',
                    summary: 'Quarterly Review'
                },
                {
                    start: dates[3] + 'T14:00:00Z',
                    end: dates[3] + 'T15:00:00Z',
                    summary: 'Team Meeting'
                },
                {
                    start: dates[4] + 'T13:30:00Z',
                    end: dates[4] + 'T14:30:00Z',
                    summary: 'Client Call'
                }
            ],

            'bob@example.com': [
                {
                    start: dates[1] + 'T11:00:00Z',
                    end: dates[1] + 'T12:00:00Z',
                    summary: 'Architecture Review'
                },
                {
                    start: dates[1] + 'T15:00:00Z',
                    end: dates[1] + 'T16:00:00Z',
                    summary: 'Security Audit'
                },
                {
                    start: dates[2] + 'T09:30:00Z',
                    end: dates[2] + 'T10:30:00Z',
                    summary: 'Database Migration'
                },
                {
                    start: dates[2] + 'T16:00:00Z',
                    end: dates[2] + 'T17:00:00Z',
                    summary: 'Infrastructure Planning'
                },
                {
                    start: dates[3] + 'T10:00:00Z',
                    end: dates[3] + 'T11:30:00Z',
                    summary: 'Technical Deep Dive'
                },
                {
                    start: dates[3] + 'T13:00:00Z',
                    end: dates[3] + 'T14:30:00Z',
                    summary: 'Performance Review'
                },
                {
                    start: dates[4] + 'T09:00:00Z',
                    end: dates[4] + 'T10:00:00Z',
                    summary: 'Sprint Planning'
                },
                {
                    start: dates[4] + 'T15:00:00Z',
                    end: dates[4] + 'T16:00:00Z',
                    summary: 'DevOps Sync'
                }
            ],

            'alice@example.com': [
                {
                    start: dates[1] + 'T13:00:00Z',
                    end: dates[1] + 'T14:00:00Z',
                    summary: 'UX Research'
                },
                {
                    start: dates[1] + 'T16:30:00Z',
                    end: dates[1] + 'T17:30:00Z',
                    summary: 'Design Review'
                },
                {
                    start: dates[2] + 'T11:00:00Z',
                    end: dates[2] + 'T12:00:00Z',
                    summary: 'User Testing'
                },
                {
                    start: dates[2] + 'T15:00:00Z',
                    end: dates[2] + 'T16:00:00Z',
                    summary: 'Prototype Demo'
                },
                {
                    start: dates[3] + 'T12:30:00Z',
                    end: dates[3] + 'T13:30:00Z',
                    summary: 'Stakeholder Meeting'
                },
                {
                    start: dates[3] + 'T16:00:00Z',
                    end: dates[3] + 'T17:00:00Z',
                    summary: 'Design System Update'
                },
                {
                    start: dates[4] + 'T11:30:00Z',
                    end: dates[4] + 'T12:30:00Z',
                    summary: 'Accessibility Review'
                }
            ],

            'mike@example.com': [
                {
                    start: dates[1] + 'T12:30:00Z',
                    end: dates[1] + 'T13:30:00Z',
                    summary: 'Sales Call'
                },
                {
                    start: dates[2] + 'T12:00:00Z',
                    end: dates[2] + 'T13:00:00Z',
                    summary: 'Customer Demo'
                },
                {
                    start: dates[3] + 'T08:30:00Z',
                    end: dates[3] + 'T09:30:00Z',
                    summary: 'Early Meeting'
                },
                {
                    start: dates[3] + 'T17:00:00Z',
                    end: dates[3] + 'T18:00:00Z',
                    summary: 'Late Call'
                },
                {
                    start: dates[4] + 'T14:00:00Z',
                    end: dates[4] + 'T15:00:00Z',
                    summary: 'Pipeline Review'
                }
            ]
        };
    }

    simulateSignIn() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, MockService.SIGN_IN_DELAY);
        });
    }

    getMockUserInfo() {
        return {
            email: this.mockUserEmail,
            displayText: `👤 ${this.mockUserName}`
        };
    }

    async findMeetingTimes(formData) {
        console.log('Finding meeting times with form data:', formData);
        console.log('Mock data available:', window.mockCalendarData);

        await new Promise(resolve => setTimeout(resolve, MockService.SEARCH_DELAY));

        const results = this.generateMockResults(formData);
        return results;
    }

    generateMockResults(formData) {
        const slots = this.generateTimeSlots(formData);
        const results = [];

        for (const slot of slots) {
            const availability = this.calculateMockAvailability(slot, formData.attendees, formData.slotLength);
            results.push({
                dateTime: slot,
                availableCount: availability.available.length,
                totalCount: formData.attendees.length,
                percentage: Math.round((availability.available.length / formData.attendees.length) * 100),
                unavailableAttendees: availability.unavailable
            });
        }

        results.sort((a, b) => {
            if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
            }
            return new Date(a.dateTime) - new Date(b.dateTime);
        });

        const finalResults = [];
        const availabilityGroups = {
            high: results.filter(r => r.percentage === 100),
            medium: results.filter(r => r.percentage >= 50 && r.percentage !== 100),
            low: results.filter(r => r.percentage < 50)
        };

        finalResults.push(...availabilityGroups.high.slice(0, 4));
        finalResults.push(...availabilityGroups.medium.slice(0, 4));
        finalResults.push(...availabilityGroups.low.slice(0, 2));

        const targetLength = 10;
        if (targetLength > finalResults.length) {
            const remaining = results.filter(r => !finalResults.includes(r));
            finalResults.push(...remaining.slice(0, targetLength - finalResults.length));
        }

        finalResults.sort((a, b) => {
            if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
            }
            return new Date(a.dateTime) - new Date(b.dateTime);
        });

        return finalResults.slice(0, 10);
    }

    generateTimeSlots(formData) {
        const slots = [];
        const [startYear, startMonth, startDay] = formData.startDate.split('-').map(Number);
        const startDate = new Date(startYear, startMonth - 1, startDay);
        const [endYear, endMonth, endDay] = formData.endDate.split('-').map(Number);
        const endDate = new Date(endYear, endMonth - 1, endDay);
        const slotLengthMs = formData.slotLength * 60 * 1000;

        for (let date = new Date(startDate); endDate.getTime() > date.getTime(); date.setDate(date.getDate() + 1)) {
            const dayOfWeek = date.getDay();

            if (dayOfWeek === 0 || dayOfWeek === 6) {
                continue;
            }

            const dayStartTime = this.timeToMinutes(formData.startTime);
            const dayEndTime = this.timeToMinutes(formData.endTime);

            let minutes = dayStartTime;
            while (minutes + formData.slotLength <= dayEndTime) {
                const slotStart = new Date(date);
                slotStart.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);

                const slotEnd = new Date(slotStart.getTime() + slotLengthMs);

                if (slotEnd.getHours() * 60 + slotEnd.getMinutes() <= dayEndTime) {
                    slots.push(slotStart);
                }

                minutes += MockService.SLOT_INCREMENT_MINUTES;
            }
        }

        return slots;
    }

    timeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    calculateMockAvailability(slotDateTime, attendees, slotLengthMinutes) {
        const mockConflicts = window.mockCalendarData || {};
        const available = [];
        const unavailable = [];
        const slotEnd = new Date(slotDateTime.getTime() + slotLengthMinutes * 60 * 1000);

        for (const email of attendees) {
            const conflicts = mockConflicts[email] || [];
            const hasConflict = conflicts.some(conflict => {
                const conflictStart = new Date(conflict.start);
                const conflictEnd = new Date(conflict.end);
                return conflictEnd.getTime() > slotDateTime.getTime() && slotEnd.getTime() > conflictStart.getTime();
            });

            if (hasConflict) {
                unavailable.push(email);
            } else {
                available.push(email);
            }
        }
        return { available, unavailable };
    }
}

export default MockService;