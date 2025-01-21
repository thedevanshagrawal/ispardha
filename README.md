
# i-Spardha Project

The i-Spardha project is a web-based platform designed for managing sports events, players, and points tables. It is built using Next.js and includes features for user authentication, match fixtures, and point tracking.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Directory Structure](#directory-structure)
4. [Configuration Files](#configuration-files)
   - [ESLint Configuration](#eslint-configuration)
   - [Next.js Configuration](#nextjs-configuration)
   - [PostCSS and Tailwind Configuration](#postcss-and-tailwind-configuration)
5. [Application Flow](#application-flow)
   - [Main Layout](#main-layout)
   - [Routing](#routing)
6. [API Endpoints](#api-endpoints)
   - [PointTable Controller](#pointtable-controller)
   - [Game Controller](#game-controller)
   - [MatchFixture Controller](#matchfixture-controller)
   - [Player Controller](#player-controller)
   - [User Controller](#user-controller)
7. [Components](#components)
8. [Models](#models)
9. [Database Connection](#database-connection)
10. [Example Workflows](#example-workflows)
    - [Adding a Game](#adding-a-game)
    - [Fetching the Point Table](#fetching-the-point-table)
    - [Managing Players](#managing-players)

## Project Overview

i-Spardha is a sports management platform that helps track games, manage player data, and maintain point tables. It is built using Next.js for server-side rendering and MongoDB for the backend database.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v14 or higher.
- **MongoDB**: A local or cloud-based instance.
- **Environment Variables**: A `.env` file with `MONGODB_URI`.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd i-spardha
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**: Create a `.env` file and add:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Build and Start for Production**:
   ```bash
   npm run build
   npm start
   ```

## Directory Structure

```
.
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.mjs
├── public/
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.js
    │   ├── page.js
    │   ├── (dashboards)/
    │   └── api/
    ├── components/
    ├── db/
    └── models/
```

### Key Directories:

- **`public/`**: Contains static files.
- **`src/app/`**: Main application files including pages, API routes, and styles.
- **`src/components/`**: Reusable React components.
- **`src/db/`**: Database connection utilities.
- **`src/models/`**: Mongoose models defining data schemas.

## Configuration Files

### ESLint Configuration

**`eslint.config.mjs`**: Configures ESLint for linting JavaScript and React code. It extends the `next/core-web-vitals` configuration.

### Next.js Configuration

**`next.config.mjs`**: Configuration for Next.js.

### PostCSS and Tailwind Configuration

- **`postcss.config.mjs`**: Configures PostCSS to use Tailwind CSS.
- **`tailwind.config.mjs`**: Customizes Tailwind CSS, including theme colors and content paths.

## Application Flow

### Main Layout

The layout is defined in `src/app/layout.js`, including `Navbar`, `Footer`, and a session wrapper.

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
```

### Routing

Next.js uses file-based routing. For example:
- **`src/app/page.js`**: The home page.
- **`src/app/(dashboards)/(player)/AddPlayersToFixture/page.js`**: Player dashboard for adding players to fixtures.

## API Endpoints

API routes are defined in `src/app/api/` and are organized by functionality.

### PointTable Controller

- **`addGame/route.js`**: Adds a new game.
- **`deleteGame/route.js`**: Deletes a game.
- **`getGames/route.js`**: Retrieves all games.
- **`getPointTable/route.js`**: Fetches the points table.
- **`resetPoints/route.js`**: Resets all points.

### Game Controller

- **`createWinnerAndRunnerUp/route.js`**: Creates winner and runner-up records.
- **`deleteWinnerAndRunnerUp/route.js`**: Deletes winner and runner-up records.
- **`getAllGame/route.js`**: Fetches all games.
- **`getWinnerAndRunnerUp/route.js`**: Retrieves winner and runner-up details.

### MatchFixture Controller

- **`addPlayersToFixture/route.js`**: Adds players to a match fixture.
- **`deleteMatchFixture/route.js`**: Deletes a match fixture.
- **`getAllMatchFixture/route.js`**: Fetches all match fixtures.

### Player Controller

- **`bulkCreatePlayers/route.js`**: Adds multiple players.
- **`createPlayer/route.js`**: Adds a single player.
- **`deletePlayer/route.js`**: Deletes a player.
- **`getAllPlayers/route.js`**: Retrieves all players.

### User Controller

- **`deleteUser/route.js`**: Deletes a user.
- **`userDetails/route.js`**: Fetches user details.

## Components

- **`AddPlayersToMatchFixture.js`**: Component for adding players to a match fixture.
- **`Footer.js`**: Footer component with dynamic year display.
- **`LoginPage.js`**: Login component.
- **`Navbar.js`**: Navigation bar.
- **`SessionWrapper.js`**: Provides session context using NextAuth.

## Models

Mongoose models define the data structure:

- **`gameModel.js`**: Schema for games.
- **`pointTableModel.js`**: Schema for the points table.
- **`matchFixtureModel.js`**: Schema for match fixtures.
- **`playerModel.js`**: Schema for players.
- **`userModel.js`**: Schema for users.
- **`winnerRunnerUp.js`**: Schema for winners and runner-ups.

## Database Connection

`src/db/connectDB.js` handles the connection to MongoDB.

```js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
```

## Example Workflows

### Adding a Game

To add a game, use the `addGame` endpoint.

**Endpoint**: `/api/(PointTable.controller)/addGame/route.js`

**Request**:
```json
{
  "gameName": "Basketball"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Game added successfully"
}
```

### Fetching the Point Table

To fetch the point table, use the `getPointTable` endpoint.

**Endpoint**: `/api/(PointTable.controller)/getPointTable/route.js`

**Request**:
```json
{}
```

**Response**:
```json
{
  "success": true,
  "message": "Point table fetched successfully",
  "pointTable": [
    { "house": "Dominators", "gameName": "Basketball", "points": 10 },
    { "house": "Challengers", "gameName": "Football", "points": 8 }
  ]
}
```

### Managing Players

- **Add Player**: Use the `createPlayer` endpoint.

**Endpoint**: `/api/(player.controller)/createPlayer/route.js`

**Request**:
```json
{
  "playerName": "John Doe",
  "house": "Challengers",
  "gameName": "Football"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Player added successfully"
}
```

- **Delete Player**: Use the `deletePlayer` endpoint.

**Endpoint**: `/api/(player.controller)/deletePlayer/route.js`

**Request**:
```json
{
  "playerId": "1234567890abcdef"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Player deleted successfully"
}
```

This README provides a detailed guide for understanding and developing the i-Spardha project. It includes configuration details, API documentation, and example workflows to help new developers get started quickly.
