function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Meeting Time Finder')
    .setFaviconUrl('https://mbacelo.github.io/meeting-time-finder/favicon.ico')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function findMeetingTimes(formData) {
  try {
    Logger.log('Finding meeting times for: ' + JSON.stringify(formData));

    const attendeesEmails = formData.attendees;
    // Parse dates as local dates to avoid timezone issues
    const [startYear, startMonth, startDay] = formData.startDate.split('-').map(Number);
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const [endYear, endMonth, endDay] = formData.endDate.split('-').map(Number);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    const startTime = formData.startTime;
    const endTime = formData.endTime;
    const slotLengthMinutes = formData.slotLength;

    // Get busy times for all attendees using real calendar data
    const busyTimes = getBusyTimesForAttendees(attendeesEmails, startDate, endDate);

    // Generate time slots
    const timeSlots = generateTimeSlots(startDate, endDate, startTime, endTime, slotLengthMinutes);

    // Calculate availability for each slot
    const results = calculateAvailabilityForSlots(timeSlots, attendeesEmails, busyTimes, slotLengthMinutes);

    // Sort by availability percentage (descending) then by date/time (ascending)
    results.sort((a, b) => {
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage;
      }
      return new Date(a.dateTime) - new Date(b.dateTime);
    });

    // Return top 10 results
    return results.slice(0, 10);

  } catch (error) {
    Logger.log('Error in findMeetingTimes: ' + error.toString());
    throw new Error('Failed to find meeting times: ' + error.message);
  }
}

function getBusyTimesForAttendees(attendeesEmails, startDate, endDate) {
  const busyTimes = {};

  // Extend end date to include the full day
  const timeMax = new Date(endDate);
  timeMax.setDate(timeMax.getDate() + 1);

  for (const email of attendeesEmails) {
    try {
      Logger.log('Getting calendar data for: ' + email);

      // Use the Calendar API to get free/busy information
      const freeBusyRequest = {
        timeMin: startDate.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: email }]
      };

      const freeBusyResponse = Calendar.Freebusy.query(freeBusyRequest);

      if (freeBusyResponse.calendars && freeBusyResponse.calendars[email]) {
        busyTimes[email] = freeBusyResponse.calendars[email].busy || [];
        Logger.log(`Found ${busyTimes[email].length} busy periods for ${email}`);
      } else {
        Logger.log('No calendar data found for: ' + email);
        busyTimes[email] = [];
      }

    } catch (error) {
      Logger.log('Error getting calendar data for ' + email + ': ' + error.toString());

      // Check if it's a permission error
      if (error.toString().includes('permission') || error.toString().includes('access')) {
        Logger.log('Permission denied for ' + email + ', treating as unavailable');
        busyTimes[email] = [{
          start: startDate.toISOString(),
          end: timeMax.toISOString()
        }];
      } else {
        // For other errors, assume they're free (optimistic approach)
        Logger.log('Other error for ' + email + ', treating as available');
        busyTimes[email] = [];
      }
    }
  }

  Logger.log('Busy times summary: ' + JSON.stringify(Object.keys(busyTimes).map(email => ({
    email: email,
    busyCount: busyTimes[email].length
  }))));

  return busyTimes;
}

function generateTimeSlots(startDate, endDate, startTime, endTime, slotLengthMinutes) {
  const slots = [];
  const startTimeMinutes = timeStringToMinutes(startTime);
  const endTimeMinutes = timeStringToMinutes(endTime);

  // Iterate through each day in the date range (exclusive of endDate)
  for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
    // Skip weekends
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue;
    }

    // Generate slots for this day in 30-minute intervals
    for (let minutes = startTimeMinutes; minutes + slotLengthMinutes <= endTimeMinutes; minutes += 30) {
      const slotStart = new Date(date);
      slotStart.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);

      // Check if the slot fits within the time window
      const slotEnd = new Date(slotStart.getTime() + slotLengthMinutes * 60 * 1000);
      const slotEndMinutes = slotEnd.getHours() * 60 + slotEnd.getMinutes();

      if (slotEndMinutes <= endTimeMinutes) {
        slots.push(slotStart);
      }
    }
  }

  return slots;
}

function calculateAvailabilityForSlots(timeSlots, attendeesEmails, busyTimes, slotLengthMinutes) {
  const results = [];

  for (const slotStart of timeSlots) {
    const slotEnd = new Date(slotStart.getTime() + slotLengthMinutes * 60 * 1000);

    const available = [];
    const unavailable = [];

    for (const email of attendeesEmails) {
      const emailBusyTimes = busyTimes[email] || [];

      // Check if this attendee has any conflicts with this time slot
      const hasConflict = emailBusyTimes.some(busyPeriod => {
        const busyStart = new Date(busyPeriod.start);
        const busyEnd = new Date(busyPeriod.end);

        // Check for overlap: slot starts before busy period ends AND slot ends after busy period starts
        return slotStart < busyEnd && slotEnd > busyStart;
      });

      if (hasConflict) {
        unavailable.push(email);
      } else {
        available.push(email);
      }
    }

    const availabilityPercentage = Math.round((available.length / attendeesEmails.length) * 100);

    results.push({
      dateTime: slotStart.toISOString(),
      availableCount: available.length,
      totalCount: attendeesEmails.length,
      percentage: availabilityPercentage,
      unavailableAttendees: unavailable
    });
  }

  return results;
}

function timeStringToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

// Helper function to get the current user's email
function getCurrentUserEmail() {
  return Session.getActiveUser().getEmail();
}