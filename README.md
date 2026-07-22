# Mormon Scripture Presenter

Local prototype of the scripture presenter UI. Includes an operator console and a live preview window.

Quick start

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open the operator UI (`/`) and click "Launch Live" to open the live/receiver window.

Notes
- AI integration is stubbed; provide `VITE_API_KEY` in `.env` for real AI calls.
- Uses `BroadcastChannel` + `localStorage` for syncing state between windows.


- phase 5
Cloud Sync

Accounts

Storage

Sharing

Collaboration


- phase 6
Performance

Caching

Offline Database

Search Index

Optimization


- phase 7
Enterprise Features

Service Planning

Scheduling

Remote Control

Analytics

Administration


Overview
This is my Python football analytics project. It takes match event data and turns it into a Momentum Index, team/player ratings, a Streamlit dashboard, and PDF/Excel/HTML reports.
I built it after going through a bunch of data analysis lessons on LinkedIn Learning, mostly Python refreshers, data visualization, pandas/data cleaning, and a bit of machine learning.
In this project, I built the Dashboard using Streamlit.
The main idea is simple: track which team is taking control of a match and how attacking pressure changes over time. I made it with the Nigerian Premier League in mind.
Software Demo Video
Development Environment
Python
Jupyter Notebook
Pandas
Numpy
Matplotlib
BeautifulSoup
Streamlit
docker

Python Programming Language
Useful Websites
LinkedIn learning
LinkedIn learning
LinkedIn learning
Youtube - ciao.football
Youtube - ciao.football
Youtube - ciao.football
Youtube - ciao.football
Youtube - ciao.football
preview
python -m streamlit run src/dashboard.py