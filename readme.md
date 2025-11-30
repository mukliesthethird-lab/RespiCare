# RespiCare - Respiratory Disease Prediction System

## Overview
RespiCare is a professional Next.js-based web application for predicting respiratory disease risks with Indonesian air quality monitoring. The application provides real-time air quality data for major Indonesian cities and offers a comprehensive 25-question assessment for respiratory disease prediction.

## Current State
The application is fully functional with:
- Multi-language support (Indonesian and English)
- Dark/light theme toggle
- Interactive dashboard with AQI data for 10 Indonesian cities
- Interactive Indonesia map showing air quality levels
- 7-day pollution trend charts
- 25-question disease prediction form with weighted scoring
- Disease prediction results with animated visualizations
- Statistics page showing correlations between air quality and disease risk

## Recent Changes (November 25, 2025)
- Initial project setup with Next.js 14, TypeScript, and TailwindCSS
- Implemented i18n multi-language support with next-intl
- Created mock data for Indonesian cities air quality monitoring
- Built complete UI component library (Navigation, AQI Cards, Maps, Charts, Forms)
- Implemented theme provider for dark/light mode switching
- Created 25-question respiratory disease prediction algorithm
- Added interactive charts using Recharts with animations
- Implemented prediction results visualization with pie charts and health tips
- Built statistics page with correlation analysis

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: TailwindCSS with custom medical theme
- **Charts**: Recharts for interactive data visualizations
- **Maps**: React Leaflet for Indonesia air quality map
- **Animations**: Framer Motion for smooth transitions
- **Internationalization**: next-intl for Indonesian/English support

### Directory Structure
```
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   ├── page.tsx       # Dashboard page
│   │   ├── prediction/    # Disease prediction page
│   │   └── statistics/    # Statistics & correlation page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Root redirect
│   └── globals.css        # Global styles
├── components/
│   ├── ThemeProvider.tsx  # Dark/light theme context
│   ├── Navigation.tsx     # Main navigation bar
│   ├── AQICard.tsx        # Air quality index card
│   ├── IndonesiaMap.tsx   # Interactive map component
│   ├── PollutionChart.tsx # Trend chart component
│   ├── PredictionForm.tsx # 25-question form
│   └── PredictionResults.tsx  # Results visualization
├── lib/
│   ├── mockData.ts        # Indonesian cities AQI data
│   ├── questions.ts       # 25 prediction questions & algorithm
│   └── utils.ts           # Utility functions
├── messages/
│   ├── id.json           # Indonesian translations
│   └── en.json           # English translations
└── Configuration files
```

### Key Features

#### 1. Air Quality Dashboard
- Real-time AQI data for 10 major Indonesian cities
- Color-coded indicators (Green, Yellow, Orange, Red, Purple)
- Interactive Indonesia map with hover effects
- 7-day pollution trend charts
- Prevention advice based on air quality levels

#### 2. Disease Prediction System
- 25 comprehensive questions covering:
  - Respiratory symptoms (cough, shortness of breath, wheezing)
  - Risk factors (smoking, pollution exposure, allergies)
  - Environmental factors (work environment, air quality)
  - Medical history and lifestyle
- Two question types:
  - Yes/No questions (scored 0 or 3)
  - Scale questions (scored 0-3)
- Weighted scoring algorithm
- Predictions for 4 disease types:
  - Chronic Cough
  - Asthma
  - COPD (Chronic Obstructive Pulmonary Disease)
  - Respiratory Infections

#### 3. Results Visualization
- Percentage risk for each disease type
- Animated pie chart showing distribution
- Color-coded risk levels (Low, Medium, High, Very High)
- Personalized health tips based on results
- Smooth animations and transitions

#### 4. Statistics & Correlation
- Scatter plot showing AQI vs disease risk correlation
- Bar charts for risk distribution across cities
- Summary statistics (correlation coefficient, average AQI)

### Disease Prediction Algorithm
The prediction algorithm uses a weighted scoring system where:
- Each question has a weight (1.0 to 2.0)
- Each question contributes differently to each disease type
- Final scores are normalized to 0-100% range
- Disease factors are based on medical research patterns

### User Preferences
- Preferred language: Indonesian (can switch to English)
- Default theme: Light mode with dark mode option
- Professional medical color scheme (blues, whites, grays)

## Development Notes
- Port 5000 is used for the development server
- All API calls are mocked for prototype purposes
- The application is fully responsive (desktop and mobile)
- Smooth animations enhance user experience
- Comments in code explain functionality clearly

## Future Enhancements
- PDF/CSV export for prediction results
- Real API integration for live air quality data
- User authentication and prediction history tracking
- Correlation heatmap for advanced analysis
- Additional languages support
