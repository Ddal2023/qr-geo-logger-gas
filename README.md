=======================================================================================================



\# 🌐 QR Geo Logger — Google Apps Script + Google Sheets



A lightweight \*\*serverless\*\* solution for logging QR-code scans with optional \*\*geolocation\*\*.  

Works entirely on \*\*Google Apps Script (GAS)\*\* and \*\*Google Sheets\*\* — no separate backend or hosting required.



---



\## 🚀 Features



\- Two tracking modes:

&nbsp; - `mode=log` — regular QR scan logging

&nbsp; - `mode=geo` — requests device geolocation and logs coordinates

\- Writes records into Google Sheets in a flat, analytics-friendly format:



&nbsp; `timestamp | employee\_id | asset\_id | event\_type | lat | lng | user\_agent | token`



\- Works on any device:

&nbsp; - Android / iOS (mobile browser)

&nbsp; - Desktop browsers

\- Frontend served directly from GAS:

&nbsp; - `geo.html` — requests geolocation and calls the backend

&nbsp; - `success.html` — “Scan recorded” / “Success” screen

\- Zero deployment cost — everything runs on Google infrastructure

\- QR codes generated via any external service  

&nbsp; (e.g. `api.qrserver.com`, `goqr.me`, etc.)



---



\## 🧩 Project Structure



```text

qr-geo-logger-gas/

│

├── Code.gs         # Backend: doGet router, logging, geo handler

├── geo.html        # Page that requests device location

├── success.html    # “Success recorded” screen

└── README.md



🔧 How It Works



User scans a QR code



Example QR payload:



https://script.google.com/macros/s/<YOUR\_DEPLOYMENT\_ID>/exec

&nbsp; ?mode=geo

&nbsp; \&employee=E17

&nbsp; \&asset=OFFICE-ENTRANCE

&nbsp; \&token=demo





GAS receives the request



doGet(e) inspects e.parameter.mode and:



for log → immediately appends a row (event\_type = 'scan')



for geo → returns geo.html



In geo mode



geo.html runs in the user’s browser:



navigator.geolocation.getCurrentPosition(

&nbsp; successCallback,

&nbsp; errorCallback,

);





On success it calls back into Google Apps Script:



google.script.run.logScanGeo(employee, asset, token, lat, lng, userAgent);





Data is saved into Google Sheets



The spreadsheet acts as a simple database / log table — easy to filter, pivot, export, or feed into BI tools.



📊 Typical Use Cases



Attendance / check-in tracking



Asset / checkpoint scanning



Field workforce control



Location-based confirmations



Construction, security, logistics, service teams



This setup is perfect as an MVP or lightweight production tool where a full backend (Django, Node, etc.) would be overkill.



🚀 Live Demo URLs (current deployment)



These URLs point to a live demo deployment.

They can be disabled or rotated at any time.



Web (with geolocation \& logging)



https://script.google.com/macros/s/AKfycbyG4h387WN5uRDI3K9B5XsP4fgtdrs71IyKWSk\_Cf3Ur6rLWY7ZqCpacfSAyblIaCeQpw/exec?mode=geo\&employee=E17\&asset=OFFICE-ENTRANCE\&token=change\_me\_please





Web (logging without geolocation)



https://script.google.com/macros/s/AKfycbyG4h387WN5uRDI3K9B5XsP4fgtdrs71IyKWSk\_Cf3Ur6rLWY7ZqCpacfSAyblIaCeQpw/exec





QR (mobile, with geolocation)



https://api.qrserver.com/v1/create-qr-code/?size=240x240\&data=https%3A%2F%2Fscript.google.com%2Fmacros%2Fs%2FAKfycbyG4h387WN5uRDI3K9B5XsP4fgtdrs71IyKWSk\_Cf3Ur6rLWY7ZqCpacfSAyblIaCeQpw%2Fexec%3Fmode%3Dgeo%26employee%3DE17%26asset%3DOFFICE-ENTRANCE%26token%3Dchange\_me\_please





QR (mobile, without geolocation)



https://api.qrserver.com/v1/create-qr-code/?size=240x240\&data=https%3A%2F%2Fscript.google.com%2Fmacros%2Fs%2FAKfycbyG4h387WN5uRDI3K9B5XsP4fgtdrs71IyKWSk\_Cf3Ur6rLWY7ZqCpacfSAyblIaCeQpw%2Fexec%3Fmode%3Dlog%26employee%3DE17%26asset%3DTEST-POINT%26token%3Dchange\_me\_please



⚙️ Deployment (Google Apps Script)



Create a new Apps Script project (or open from your Google Sheet).



Replace Code.gs content with the file from this repo.



Add geo.html and success.html (File → New → HTML).



Click Deploy → New deployment.



Choose Web app:



Execute as: your account



Who has access: Anyone with the link



Click Deploy and copy the Web app URL — this becomes your <YOUR\_DEPLOYMENT\_ID> base.



📸 Screenshots

Geo mode success



Geo error (permissions denied)



Logged events in Google Sheets



👨‍💻 Author



Developed by Al Demidov.

Co-built together with ChatGPT (OpenAI) for architecture, code generation, and system design.



📄 License



Feel free to use or adapt this project for personal or commercial needs.

If you build something cool on top of it, a mention is appreciated but not required.





