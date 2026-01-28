FOURCi — Static site + simple backend

Quick start (backend static server):

1. Install dependencies (from `backend`):

```powershell
cd backend
npm install
```

2. Run the static server (serves `/static_site` and provides `/api/resources` file DB):

```powershell
npm run start:static
```

3. Test resources API:

```powershell
# fetch list
Invoke-RestMethod -Uri http://localhost:5000/api/resources -Method Get

# create
Invoke-RestMethod -Uri http://localhost:5000/api/resources -Method Post -Body (ConvertTo-Json @{ title='Test'; description='desc' }) -ContentType 'application/json'
```

Stop the server with `Stop-Process -Id <pid>` if launched detached.

Files of interest:

- `static_site/` — generated static HTML/CSS/JS pages
- `backend/static_server.js` — static server + file-based JSON DB
- `backend/data/resources.json` — file DB
