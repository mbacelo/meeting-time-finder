// Generate mock data with current dates - for local testing only
function generateMockData() {
    // Mock attendee names mapping
    const attendeeNames = {
        'john@example.com': 'John Smith',
        'jane@example.com': 'Jane Doe',
        'bob@example.com': 'Bob Johnson',
        'alice@example.com': 'Alice Brown',
        'mike@example.com': 'Mike Wilson'
    };

    // Store the mapping globally for use in the app
    window.attendeeNames = attendeeNames;
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    console.log('Generating mock data from date:', today.toISOString());

    // Create dates starting from today
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentYear, currentMonth, currentDate + i);
        dates.push(date.toISOString().split('T')[0]);
    }

    console.log('Mock data dates:', dates);

    return {
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

window.mockCalendarData = generateMockData();