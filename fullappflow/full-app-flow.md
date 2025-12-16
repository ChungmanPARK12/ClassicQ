Full App Flow 

---

### 1. Splash Screen

<p align="center">
  <img src="https://github.com/user-attachments/assets/824f7faa-edd9-4ef7-b772-a74bf22f5db9" width="280"/>
</p>

- Displays the ClassicQ brand while the app initializes.

---

**Source:** `App.tsx`

- Keeps the splash screen visible until the Home screen is ready.  
- A short **preload** delay is applied on the first visit only and skipped on subsequent launches.

---

### 2. Home Screen

<p align="center">
  <img src="https://github.com/user-attachments/assets/0a4bbad2-87c3-4a85-9369-2f971bd97661" width="280"/>
</p>

- Displays the main entry screen of ClassicQ.

**Source:** `src/screens/HomeScreen.tsx`

- Provides access to **Random Music playback**, **Music List**, and **Favourite screen**.  
- Uses `handlePlayRandom()` to enable immediate random playback from the full music list, navigating directly to the **Random Play screen**.
- The **random track** is selected before navigation to ensure the **Ramdom Play screen** receives a fully resolved track state.

---
