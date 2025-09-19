# Deployment Guide

## Overview

Deploy Meeting Time Finder to Google Apps Script.

## Files to Deploy

- `index.html` → Copy as `index`
- `code.gs` → Google Apps Script backend

## Environment Detection

**Local:** Uses mock data, simulated sign-in
**GAS:** Real Google Calendar API, actual authentication

## Deployment Steps

### 1. Create Project
1. Go to [script.google.com](https://script.google.com)
2. Click "New project"
3. Rename to "Meeting Time Finder"

### 2. Upload Files
- Replace `Code.gs` with `code.gs` content
- Add HTML files:
  - `index` ← `index.html`

### 3. Enable Calendar API
1. Click "Services" (+)
2. Add "Google Calendar API"
3. Keep identifier as `Calendar`

### 4. Deploy
1. "Deploy" > "New deployment"
2. Type: "Web app"
3. Deploy and copy URL