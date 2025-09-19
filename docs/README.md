# Google Calendar Meeting Time Finder

A web application that suggests optimal meeting times by checking attendees' Google Calendar availability.

## Features

- **Google Sign-In**: Authenticate with Google to access calendar data
- **Smart Scheduling**: Find optimal meeting times based on attendee availability
- **Flexible Time Windows**: Configure daily working hours (9 AM - 6 PM in 30-min intervals)
- **Multiple Duration Options**: Support for 15 min, 30 min, 1 hour, 1.5 hours, and 2 hours meetings
- **Availability Ranking**: Results sorted by availability percentage and chronological order
- **Local Testing**: Mock data support for development and testing

## Project Structure

```
meeting-time-finder/
├── css/
│   └── styles.css          # Stylesheet
├── js/
│   ├── app.js              # Main application entry point
│   └── mockData.js         # Sample calendar data for local testing
├── docs/
│   ├── README.md           # This file
│   └── DEPLOYMENT_GUIDE.md # Google Apps Script deployment instructions
├── index.html              # User interface with modern responsive design
└── code.gs                 # Google Apps Script backend code
```