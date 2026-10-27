# Movie Booker – Phase 1 (UI implementation)

React Native + Expo (Expo Router) + NativeWind. One app to search a movie across all cinemas, pick the screen and showtime, choose seats and book.

## Run it

If your lab project already has Expo, Expo Router and NativeWind set up (Lab 03), copy the `app/` and `src/` folders into it (replace the default `app/` files) and add the two extra packages below. Otherwise:

```bash
npx create-expo-app@latest movie-booker      # default template (Expo Router)
cd movie-booker
npx expo install nativewind react-native-reanimated react-native-safe-area-context react-native-svg @expo/vector-icons
npm install tailwindcss@3 react-native-qrcode-svg
# copy this folder's app/, src/, global.css, tailwind.config.js, babel.config.js, metro.config.js, nativewind-env.d.ts
npx expo start
```

Open it with Expo Go (phone) or the Android emulator. Sign in with any email and a password of 6+ characters.

## Screens (12 + Sign In and Register)

| # | Screen | File | Owner |
|---|--------|------|-------|
| 1 | Home | `app/(tabs)/index.tsx` | Ziad Sameh |
| 2 | Search | `app/(tabs)/search.tsx` | Ziad Sameh |
| 3 | Movie Details | `app/movie/[id].tsx` | Ziad Sameh |
| 4 | Cinemas | `app/(tabs)/cinemas.tsx` | Zeyad Ashraf |
| 5 | Cinema Details | `app/cinema/[id].tsx` | Zeyad Ashraf |
| 6 | Showtimes | `app/showtimes/[movieId].tsx` | Zeyad Ashraf |
| 7 | Seat Selection | `app/seats/[showtimeId].tsx` | Ammar Yasser |
| 8 | Booking Summary | `app/summary.tsx` | Ammar Yasser |
| 9 | Payment | `app/payment.tsx` | Ammar Yasser |
| 10 | Booking Confirmation (QR) | `app/confirmation.tsx` | Nancy Mohamed |
| 11 | My Tickets | `app/(tabs)/tickets.tsx` | Nancy Mohamed |
| 12 | Profile | `app/(tabs)/profile.tsx` | Nancy Mohamed |
| – | Sign In, Register (not counted) | `app/sign-in.tsx`, `app/register.tsx` | Shared |

## Architecture: MVVM

```
app/            Views      – screens only: layout and styling, no business logic
src/viewmodels  ViewModels – hooks that hold screen state and call the repository
src/context     Shared state (signed-in user, booking in progress, bookings)
src/services    Repository – the only place that reads data
src/models      Models     – TypeScript types
src/data        Phase 1 sample data (fictional)
src/components  Reusable UI pieces
```


