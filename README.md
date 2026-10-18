# MovieBox

MovieBox is a movie and TV discovery app built with React. Browse what's trending, explore popular movies and TV shows, search across both types of content, and keep a personal watchlist for titles you want to revisit.

Movie and TV metadata and poster images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.

## What You Can Do

- **Discover what's popular:** The home page brings together titles trending today, popular movies, and popular TV shows.
- **Browse by category:** Open dedicated movie and TV pages to explore popular titles in a poster grid.
- **Search movies and TV:** Search for a title from the top search field. Results include movies and TV shows and open into their own detail pages.
- **View title details:** See a poster, overview, rating, release or first-air date, and genres when available.
- **Manage a watchlist:** Add or remove titles from a card or its detail page. The watchlist is saved in browser local storage, so it remains available in that browser on that device.
- **Use it on mobile:** Navigation switches to a menu drawer on narrower screens.

## Pages

| Path | Description |
| --- | --- |
| `/` | Trending titles, popular movies, and popular TV shows |
| `/movies` | Popular movies |
| `/tv` | Popular TV shows |
| `/search?q=title` | Search results for movies and TV shows |
| `/details/:type/:id` | Details for a movie or TV show |
| `/watchlist` | Titles saved in this browser |

## Getting Started

### Requirements

- Node.js 20.19+ or 22.12+ (required by the Vite version used in this project)
- npm
- A TMDB API Read Access Token

### Install and run locally

1. Clone the repository and enter its folder:

	```bash
	git clone https://github.com/kabuyevictor2-arch/movie-discovery-app.git
	cd movie-discovery-app
	```

2. Install dependencies:

	```bash
	npm install
	```

3. Create a `.env` file in the project root and add your TMDB Read Access Token:

	```env
	VITE_TMDB_TOKEN=your_tmdb_api_read_access_token
	```

	You can create or find an API token in your [TMDB account API settings](https://www.themoviedb.org/settings/api). Keep the variable name exactly as shown. Restart the development server after changing `.env`.

4. Start the development server:

	```bash
	npm run dev
	```

Vite prints the local URL in the terminal, usually `http://localhost:5173`.

## Build and Preview

Create an optimized production build:

```bash
npm run build
```

To serve that build locally:

```bash
npm run preview
```

The generated static site is written to `dist/`.

## Deploying to Vercel

1. Import the GitHub repository into Vercel.
2. Select **Vite** as the framework preset. The standard settings are build command `npm run build` and output directory `dist`.
3. In the Vercel project settings, add `VITE_TMDB_TOKEN` with your TMDB API Read Access Token. Add it to each environment (Production, Preview, or Development) where you want the app to run.
4. Redeploy after adding or changing the environment variable.

Vite embeds variables prefixed with `VITE_` in the client-side app. Treat this token as visible to users; use a TMDB read-only token and do not put private server credentials in a `VITE_` variable. The `.env` file is ignored by Git and should not be committed.

## How It Works

The app is a client-side single-page application. React Router handles navigation, Material UI supplies the interface components, and the TMDB service module sends requests for trending content, popular movies, popular TV shows, search results, and title details. Movie posters are loaded from TMDB's image service. If a title has no poster, MovieBox displays a placeholder image.

The watchlist is managed with React context and saved in `localStorage`. It is local to the current browser and is not synced between devices or accounts. Clearing browser storage removes the saved list.

## Tech Stack

- React 19
- Vite 8
- React Router
- Material UI and Emotion
- TMDB API
- Oxlint

## Project Structure

```text
src/
  App.jsx                 Routes, theme, and app providers
  components/             Shared layout, content rows, and title cards
  context/                Watchlist state and browser persistence
  Pages/                  Home, search, details, and category pages
  services/tmdb.js        TMDB requests and poster URL helper
```

File and directory capitalization matters in production builds. For example, the pages directory is `Pages`, and the category component file is `Gridpage.jsx`; imports must use the same casing on case-sensitive build systems such as Vercel.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
