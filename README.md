
# User Management Dashboard

A React-based application for managing and displaying user information. This application includes features like searching, filtering by city, and viewing detailed user profiles.

---

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Shailendra-vi/users
```

Replace `https://github.com/Shailendra-vi/users` with the actual URL of the repository.

---

### 2. Navigate to the Project Directory

```bash
cd users
```

Replace `users` with the folder name where the project was cloned.

---

### 3. Install Dependencies

Ensure you have Node.js installed on your system. Then, run:

```bash
npm install
```

This will install all required dependencies specified in `package.json`.

---

### 4. Start the Application

To run the application locally in development mode:

```bash
npm start
```

The app will start on `http://localhost:3000` by default.

---

### 5. Build for Production

To build the application for production:

```bash
npm run build
```

This will generate a production-ready version in the `build` folder.

---

## ⚙️ Configuration

The app fetches user data from an external API. You can update the API URL in the `config.js` file.

1. Locate the `config.js` file in the `src` directory.
2. Modify the `URL` value:

```javascript
URL = "https://jsonplaceholder.typicode.com/users";
```

Replace `"https://jsonplaceholder.typicode.com/users"` with the desired endpoint.

---

## 🛠️ Technologies Used

- React
- Redux
- React Router
- TailwindCSS
- Hero Icons

---
