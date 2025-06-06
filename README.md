# LexiLog

LexiLog is a personal vocabulary tracker where users can log new words, automatically fetch definitions, add notes and familiarity tags, and review or update entries over time. Each user has their own private word list thanks to Firebase authentication.

---

## ✨ Features

- 🔐 **Authentication** via Email/Password and GitHub (Firebase Auth)
- 📖 **Add new words** and automatically fetch definitions via [Free Dictionary API](https://dictionaryapi.dev)
- 📝 **Add notes** and apply familiarity tags (New, Familiar, Mastered)
- 🔎 **View, update, or delete** word entries
- 👤 **User-specific data** stored in Firestore
- 🎨 Styled using **Tailwind CSS** and responsive components

---

## 📁 Project Structure

```
src/
│
├── App.js                # Sets up routing and navigation
├── index.js              # Entry point with AuthProvider
├── index.css             # Tailwind setup
│
├── pages/
│   ├── 0_Home.js         # View all saved words (filtered by tag)
│   ├── 1_AddWord.js      # Add new words using dictionary API
│   ├── 2_WordDetail.js   # Edit/delete individual word entries
│   └── Login.js          # Signup, login, GitHub login
│
├── components/
│   └── PrivateRoute.js   # Protects routes for logged-in users
│
└── firebase/
    ├── firebaseConfig.js # Firebase setup (Firestore, Auth)
    └── AuthContext.js    # Auth context with login/signup/logout logic
```

---

## 🛠️ Technologies Used

- **React** 
- **Firebase Auth** (Email & GitHub)
- **Cloud Firestore**
- **Tailwind CSS**
- **React Router**
- **Lucide React** (icons)
- **Free Dictionary API**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:gali-alony/HCDE438_FINALTRUE.git
cd HCDE438_FINALTRUE
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

- Go to [Firebase Console](https://console.firebase.google.com)
- Create a new project
- Enable **Authentication** (Email/Password + GitHub)
- Enable **Cloud Firestore**
- Copy your Firebase config into `firebaseConfig.js`

### 4. Run the App Locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🔑 Authentication

- Users must log in to access any page other than `/login`
- Auth state is managed via `AuthContext.js`
- Users only see their own saved words (each word entry includes a `uid`)

---

## 🧪 How It Works

- **Adding a Word**:
  - User enters a word and clicks *Search*
  - The app fetches the definition using Free Dictionary API
  - User can then save notes and tag the word
  - Data is saved to Firestore with the user's UID

- **Viewing Words**:
  - Home screen shows all saved words
  - Words are filterable by tag (New, Familiar, Mastered)
  - Each word links to a detail view with update/delete options

---

## 🛣️ Future Improvements

- Add word search functionality
- Support image or sentence examples
- Dark mode and accessibility enhancements
- Mobile-first UX refinements
- Backup/export functionality

---

