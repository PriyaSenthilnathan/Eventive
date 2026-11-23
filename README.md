# Eventive – Event Discovery Website

Eventive is a simple, responsive event discovery website that helps users explore upcoming events across different categories, including Music, Technology, Sports, and Workshops.

The website is built using HTML, CSS, and JavaScript, with sample event data stored in a JSON file. It is a frontend-only project created for learning and demonstration purposes.

## Features

- **Home Page:** Introduces Eventive and displays featured events.
- **Events Page:** Displays all available events.
- **Search Events:** Search for events by title.
- **Category Filters:** Filter events by Music, Technology, Sports, and Workshops.
- **About Page:** Provides information about the website and its features.
- **Contact Page:** Includes a contact form with JavaScript validation.
- **Responsive Design:** Works across desktop, tablet, and mobile devices.
- **Dynamic Event Loading:** Fetches event information from a JSON file using the Fetch API.

## Technologies Used

- **HTML5** – Website structure
- **CSS3** – Styling, layouts, and responsive design
- **JavaScript (ES6)** – Interactivity, search, filtering, and form validation
- **JSON** – Stores sample event information
- **Google Fonts** – Poppins typography

## Project Structure

```text
Eventive/
│
├── index.html       # Home page
├── events.html      # Events listing page
├── about.html       # About page
├── contact.html     # Contact page
├── style.css        # Stylesheet
├── script.js        # JavaScript functionality
└── events.json      # Sample event data
```

## How to Run the Project

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension if it is not already installed.
4. Right-click on `index.html`.
5. Select **Open with Live Server**.
6. The website will open in your browser.

**Note:** Use Live Server or another local HTTP server to run the project because the Events page loads data using the Fetch API.

## Pages Overview

| Page | Description |
|---|---|
| Home | Introduction and featured events |
| Events | Event listings with search and category filters |
| About | Information about Eventive |
| Contact | Contact form with client-side validation |

## Project Limitations

- This is a frontend-only demonstration project.
- Event information is loaded from a local JSON file.
- The contact form performs client-side validation only.
- No backend, database, actual email delivery, event booking, or payment functionality is implemented.

## Future Enhancements

- Add more event categories and event details.
- Integrate a backend to manage event information.
- Connect the contact form to an email service.
- Add user registration and event booking functionality.

---

**Eventive – Discover Events. Create Memories.**