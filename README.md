# LDS Scripture Presenter

LDS Scripture Presenter is a browser-based scripture search and presentation tool built for Latter-day Saint scripture and KJV Bible readings. It provides an operator control view for searching scripture references, browsing recent history, and opening a synchronized live projection window.

## Features

- Search scriptures by reference across KJV, Book of Mormon, Doctrine and Covenants, and Pearl of Great Price
- Live projection mode with synchronized operator/live window communication
- Manual scripture entry for custom text or offline presentations
- Recent history list for quick access to previous scripture slides
- Adjustable display settings including font size, theme, reference visibility, and alignment
- Optional verse insight service when an API key is configured

## Demo

- YouTube video: https://youtu.be/R2OifddJKfw

## Installation

```bash
npm install
npm run dev
```

Then open the local development URL shown in the terminal, typically `http://localhost:5173`.

## Usage

1. Open the app in your browser.
2. Enter a scripture reference in the search box (for example `Matt 1:2`, `1Nph 1:1`, `D&C 1:1`).
3. Use the `Launch Live` button to open the live presentation window.
4. Use the `Copy Live Link` button to copy a `?mode=live` URL for projection in another tab or browser.
5. Switch to the `Manual` tab to present custom text if the scripture database is unavailable.
6. Use the history panel to revisit recently presented verses.

## Development

This project uses:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- `BroadcastChannel` API and `localStorage` for real-time operator/live sync

## Project Structure

- `src/` - application source files
- `src/components/` - React components for UI and presentation logic
- `src/services/` - scripture search and insight fetching logic
- `src/styles/` - global styling and animations
- `package.json` - dependencies and scripts

# Useful Websites
Youtube - https://www.youtube.com/playlist?list=PLF3C8E9D4F6A1B6F4&utm_source=chatgpt.com (official ProPresenter Basic Playlist (About 2+ hours)
Youtube - https://www.youtube.com/@PaulAlanClifford?utm_source=chatgpt.com (Paul Alan Clifford - ProPresenter Tutorials)
Youtube - https://support.easyworship.com/support/solutions/6000132416?utm_source=chatgpt.com (EasyWorship Video Library)
Youtube - https://www.youtube.com/@MicrosoftDeveloper?utm_source=chatgpt.com (Microsoft Developer Youtube Channel)
Youtube - https://www.churchofjesuschrist.org/developer?utm_source=chatgpt.com (Church of Jesus Christ Developer Resources)
Youtube - https://github.com/search?q=book+of+mormon+api&type=repositories&utm_source=chatgpt.com (Scriptures API GitHub Search)


## Notes

- The live presentation window uses query parameter `mode=live` to render the receiver view.
- Scripture data is loaded from local JSON for LDS scriptures and public KJV resources.
- The app works offline with manual text entry and saved history.

## Author

David O. Alade
