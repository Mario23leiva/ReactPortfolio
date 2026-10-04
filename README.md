# React Portfolio

My personal portfolio, designed as an interactive **macOS-style desktop**: unlock the screen, open apps from the dock and move windows around to discover my projects, my profile and some pictures.

🔗 **Live:** https://mario23leiva.github.io/ReactPortfolio/

## Features

- **Lock screen**: swipe up, or press <kbd>Space</kbd> / <kbd>Enter</kbd>, to log in. All images are preloaded before entering the desktop.
- **Dock**: macOS-like dock with hover magnification and an indicator dot for open apps.
- **Windows**: open, close, minimize, maximize (double click on the title bar) and drag them around. Clicking an app in the dock brings it to the front, or minimizes it if it is already in front.
- **Apps**
  - **Profile**: about me, certifications, skills, languages, experience and a button to download my CV.
  - **Files**: my projects in a Finder-like view, with a link to the live site, the README and the GitHub repository.
  - **Gallery**: photo grid with a viewer (arrow keys and <kbd>Esc</kbd> supported).
- **Responsive**: on mobile, windows open full screen.
- **Accessible**: keyboard navigation, visible focus and `prefers-reduced-motion` support.

## Tech stack

- [React 18](https://react.dev/) with hooks, `useReducer` and Context for the window manager
- [Vite](https://vitejs.dev/) as the build tool
- [Font Awesome](https://fontawesome.com/) icons
- Plain CSS, no UI framework
- Deployed on [GitHub Pages](https://pages.github.com/) with [`gh-pages`](https://github.com/tschaub/gh-pages)

## Getting started

Requirements: [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

| Script            | Description                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Starts the development server                   |
| `npm run build`   | Builds the production version into `dist/`      |
| `npm run preview` | Serves the production build locally             |
| `npm run lint`    | Runs ESLint                                     |
| `npm run deploy`  | Builds and publishes `dist/` to GitHub Pages    |

## Project structure

```
src/
├── assets/
│   ├── fondos/        # Wallpapers
│   ├── gallery/       # Gallery photos (loaded automatically)
│   ├── iconos/        # App and technology icons
│   └── json/          # Profile and projects data
├── screens/
│   ├── blocked_screen/    # Lock screen
│   └── main_screen/
│       ├── apps/          # Profile, Files and Gallery apps
│       ├── dock/          # Dock
│       ├── windows/       # Window manager (reducer, context, window component)
│       └── appsConfig.js  # Apps registry
└── utils/
    └── preloadAssets.js   # Image preloading for the lock screen
```

## Customizing the content

- **Gallery photos**: drop the images into `src/assets/gallery/`. They are picked up automatically, in alphabetical order. Use WebP, max. 1920 px, to keep the page light.
- **Projects**: edit `src/assets/json/projects.json`. `webUrl`, `repoUrl` and `videoUrl` are optional: each icon only appears when its field is set. `videoUrl` must be a YouTube embed URL (`https://www.youtube.com/embed/<id>`).
- **Profile**: edit `src/assets/json/my-profile.json`.
- **CV**: replace `public/cv/Mario-Leiva-Torres-CV.pdf`.
- **New app**: create the component in `src/screens/main_screen/apps/` and add it to `APPS` in `appsConfig.js`.

## Deployment

```bash
npm run deploy
```

This builds the project and pushes `dist/` to the `gh-pages` branch. In the repository settings, GitHub Pages must be set to deploy from the `gh-pages` branch (`/ (root)`).

## Credits

Favicon from [Twemoji](https://github.com/twitter/twemoji) by Twitter, Inc and other contributors, licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).
