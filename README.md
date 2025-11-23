🌐 QR Geo Logger — Google Apps Script + Google Sheets

A lightweight serverless solution for logging QR-code scans with optional geolocation.
Designed as a fast and reliable mini-tracking system that works entirely on Google Apps Script (GAS) and Google Sheets.

🚀 Features

Handles two modes:

mode=log — regular QR scan logging

mode=geo — requests device geolocation and logs coordinates



Writes records into Google Sheets:

timestamp | employee\_id | asset\_id | event\_type | lat | lng | user\_agent | token



Works on any device: Android, iOS, desktop browsers

Uses HTML pages (geo.html, success.html) hosted inside GAS

Zero deployment cost — hosted on Google infrastructure

QR codes generated via any external service (e.g. api.qrserver.com)

🧩 Project Structure
qr-geo-logger-gas/
│
├── Code.gs         # Main backend: router (doGet), logging, geo handler
├── geo.html        # Frontend page that requests device location
├── success.html    # “Success recorded” screen
└── README.md



🔧 How It Works

1. User scans a QR code

Example QR payload:

https://script.google.com/macros/s/<YOUR\_ID>/exec?mode=geo\&employee=E17\&asset=OFFICE-ENTRANCE\&token=demo

2. GAS receives the request

The script checks mode and returns the appropriate HTML page.

3. In geo mode

geo.html requests geolocation:

navigator.geolocation.getCurrentPosition(...)



Then calls back into Google Apps Script:

google.script.run.logScanGeo(employee, asset, lat, lng, userAgent, token);

4. Data is saved into Google Sheets

The spreadsheet acts as a simple database.

📊 Use Cases

Attendance tracking

Asset / checkpoint scanning

Field workforce control

Location-based confirmations

Construction, security, logistics, service teams

This setup is perfect as an MVP or lightweight production tool where a full backend would be excessive.

👨‍💻 Author

Developed by Al Demidov
Co-built together with ChatGPT (OpenAI) for architecture, code generation, and system design.

📄 License

Feel free to use or adapt this project for personal or commercial needs.



some working Urls

1. from WEB https://script.google.com/macros/s/AKfycbyG4h387WN5uRDI3K9B5XsP4fgtdrs71IyKWSk\_Cf3Ur6rLWY7ZqCpacfSAyblIaCeQpw/exec?mode=geo\&employee=E17\&asset=OFFICE-ENTRANCE\&token=change\_me\_please with geolocation \& logging
2. from WEB https://script.google.com/macros/s/AKfycbyG4h387WN5uRDI3K9B5XsP4fgtdrs71IyKWSk\_Cf3Ur6rLWY7ZqCpacfSAyblIaCeQpw/exec  - for logging  without geolocation
3. QR code from mobil https://api.qrserver.com/v1/create-qr-code/?size=240x240\&data=https%3A%2F%2Fscript.google.com%2Fmacros%2Fs%2FAKfycbyG4h387WN5uRDI3K9B5XsP4fgtdrs71IyKWSk\_Cf3Ur6rLWY7ZqCpacfSAyblIaCeQpw%2Fexec%3Fmode%3Dgeo%26employee%3DE17%26asset%3DOFFICE-ENTRANCE%26token%3Dchange\_me\_please -  for logging with geolocation (allow permission)
4. QR code from mobil https://api.qrserver.com/v1/create-qr-code/?size=240x240\&data=https%3A%2F%2Fscript.google.com%2Fmacros%2Fs%2FAKfycbyG4h387WN5uRDI3K9B5XsP4fgtdrs71IyKWSk\_Cf3Ur6rLWY7ZqCpacfSAyblIaCeQpw%2Fexec%3Fmode%3Dlog%26employee%3DE17%26asset%3DTEST-POINT%26token%3Dchange\_me\_please -  for logging without geolocation



and:

\## 📸 some Screenshots:



\### Geo mode success

!\[Geo Success](images/geo-success.png)



\### Geo error (permissions denied)

!\[Geo Error](images/geo-error.png)



\### Logged events in Google Sheets

!\[Logs Table](images/log-table.png)





