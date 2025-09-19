# 🚀 Google Calendar Meeting Time Finder - Deployment Guide

## 📋 Overview

This guide covers deploying your Meeting Time Finder to Google Apps Script. The modern ES6 modular code structure requires some adjustments for GAS deployment.

## 📁 Files to Deploy

1. **index.html** - Main UI file (copy as `index`)
2. **js/meetingTimeFinder.js** - Core application class (copy as `app`)
3. **code.gs** - Google Apps Script backend
4. **css/styles.css** - Stylesheet (copy as `styles`)

## 📁 Local Development Files

1. **js/mockData.js** - Mock calendar data for local testing
2. **js/app.js** - ES6 module entry point (local only)

## meetingTimeFinder.js
- ✅ **Modern JavaScript** - Uses standard comparison operators (`<`, `>`, `<=`, `>=`)
- ✅ **ES6 Class Module** - Exported class for better code organization
- ✅ **Google Apps Script compatible** - Works in both local and GAS environments

## 🔧 Environment Detection

The app automatically detects where it's running:

### **Local Development (localhost/file://):**
- ✅ Uses server-side mock data generation
- ✅ Simulates sign-in process (no Google sign-in required)
- ✅ Perfect for development and testing

### **Google Apps Script Deployment (script.google.com):**
- ✅ Uses real Google Calendar API
- ✅ Automatic user authentication with Google accounts
- ✅ Accesses users' actual calendar data

## 📋 Deployment Steps

### **Step 1: Create Google Apps Script Project**
1. Go to [script.google.com](https://script.google.com)
2. Click **"New project"**
3. Rename to "Meeting Time Finder"

### **Step 2: Upload Files**

**Replace Code.gs:**
- Delete the default content
- Copy and paste entire `code.gs` file content

**Add HTML Files:**
1. Click **"+" > "HTML"**, name it `index` → Paste `index.html` content
2. Click **"+" > "HTML"**, name it `app` → Paste `js/meetingTimeFinder.js` content
3. Click **"+" > "HTML"**, name it `styles` → Paste `css/styles.css` content


### **Step 4: Enable Google Calendar API**
1. Click **"Services"** (+ icon) in the left sidebar
2. Search for **"Google Calendar API"**
3. Click **"Add"**
4. Keep the identifier as `Calendar`

### **Step 5: Deploy as Web App**
1. Click **"Deploy" > "New deployment"**
2. Click the gear icon ⚙️ next to "Type"
3. Select **"Web app"**
4. Configure settings:
   - **Description**: "Meeting Time Finder v1.0"
   - **Execute as**: "User accessing the web app"
   - **Who has access**: "Anyone with a Google account" (or your preference)
5. Click **"Deploy"**
6. **Copy the Web App URL** - this is your live application!

### **Step 6: Test the Deployment**
1. Open the Web App URL
2. Users will be prompted to sign in with their Google accounts
3. Test with real attendee emails
4. Verify calendar data integration works


