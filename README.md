# ClassicQ Music App – Portfolio v1

![Image](https://github.com/user-attachments/assets/ea6ba522-58e8-4d9d-8354-5ce60532dd69)

A self-initiated **React Native** mobile app project, developed with full ownership of architecture and code decisions, in collaboration with AI for design and implementation improvements.

## Project Overview

This project showcases how I design and structure the core navigation
and startup experience of a mobile app.

- Clean and predictable navigation structure
- Clear separation between app initialization and navigation flow
- A solid UI and navigation foundation for a music-focused mobile app

## Features

- **Controlled splash screen** with explicit app initialization logic
- **Track list and playback flow** with predictable playback state transitions
- **Random playback logic** across the full music library
- **Favorites screen** for saving and managing user-selected tracks

## Full App Flow

An overview of the application flow from launch to the main service screens:

- [Full App Flow Documentation](fullappflow/full-app-flow.md)

## Installation

- **IDE**  
  Use any preferred editor. **Visual Studio** Code is recommended for JavaScript/TypeScript development.  
  https://code.visualstudio.com/

- **Node.js**  
  Required for React Native and Expo development tools.  
  https://nodejs.org

- **Clone the Repository**:
   ```bash
   git clone https://github.com/ChungmanPARK12/ClassicQ.git
   cd classicQ
   ```

- **Install Dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## Getting Started

This project uses the Expo workflow.  
Once dependencies are installed, you can start the development server and run the app on a mobile device.

### Start the Development Server
```bash
npx expo start 
```
If the app does not open with the default Expo start command, using `--tunnel` can improve connectivity in some network environments.

### Run the App
Use **Expo Go** on your Android or iOS device to run the app.

Scan the **QR code** shown in the terminal, and Expo Go will automatically open and load the project.

### Troubleshooting
If the Expo server does not start, try cleaning the cache:
```bash
npx expo start -c
```

## Debugging
- Key real issues you faced
- What you learned / limitations

## Expo Workflow & Environment (or Tech Stack)

## Next Steps (Portfolio v2)

## License