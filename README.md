# TodoApp (React Native)

A simple to-do list application built with React Native and Expo. It uses
functional components and hooks to manage state, and demonstrates a clean,
modern UI with a green color palette.

## Features

- Add, edit, delete tasks
- Mark tasks as done (with strikethrough style)
- Scrollable list using `FlatList`
- Basic state management with `useState`
- Simple responsive layout

## Installation & Running

1. Make sure you have **Node.js** and **Expo CLI** installed:
   ```bash
   npm install -g expo-cli
   ```

2. Navigate to the project directory:
   ```bash
   cd "e:\React native apps\todo_list\TodoApp"
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

4. Start the development server:
   ```bash
   expo start
   ```

5. Scan the QR code with the Expo Go app on your phone, or launch an
   emulator/simulator from the Expo developer tools.

## Project Structure

```
TodoApp/
  app/                  # application code (entry point under (tabs)/index.tsx)
  assets/               # images and static assets
  components/           # reusable UI components
  hooks/                # custom hooks
  scripts/              # helper scripts (e.g., reset-project)
  package.json
  tsconfig.json
  eslint.config.js
  app.json
  README.md            # this file
```

> Note: This repository is written in TypeScript; the core screen in
> `app/(tabs)/index.tsx` contains the implementation of the to-do list.
## Snack Expo URL
https://snack.expo.dev/@abdulrahman.mansour/lab01
## Contributing

Feel free to fork the repository, open issues, or submit pull requests. This
is intended as a small demo app and learning project.

## License

MIT License.
