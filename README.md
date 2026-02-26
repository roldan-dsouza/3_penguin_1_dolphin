### Project Name: ReadEase

### Project Statement Id:PS02EDU

### Team Name:3_penguins_1_dolphin

### College Name:St Aloysius (Deemed to be University)

---

# ReadEase

### Making Reading Effortless, One Page at a Time

---

## Problem Statement

Reading should be empowering, not exhausting.

Millions of people with dyslexia and other reading challenges struggle with:

- Dense paragraphs
- Complex vocabulary
- Cluttered web layouts
- Poor font and spacing choices
- Hard-to-navigate documents

Despite the explosion of digital information, accessibility for neurodivergent readers remains limited.

The web is built for speed and volume, not for cognitive comfort.

We asked:

> What if the internet could adapt to how _you_ read?

---

## Proposed Solution

**ReadEase** is an AI-powered accessibility platform that transforms digital content into a dyslexia-friendly format instantly.

It consists of two powerful components:

---

### 1. ReadEase Chrome Extension

- Simplifies live web pages in real time
- Preserves HTML structure while rewriting visible text
- Allows full customization:
  - Font style
  - Font size
  - Line height
  - Word spacing
  - Background color
- Applies changes globally using dynamic style injection

Users can adapt _any_ website to their comfort level.

---

### 2. ReadEase Web App

- Upload documents
- Simplify content using AI
- Store both original and simplified versions
- Create a personal accessible document library

It transforms static documents into readable, digestible material.

---

## Innovation & Creativity

ReadEase goes beyond simple text enlargement.

### Key Innovations:

- AI-driven HTML transformation without breaking page structure
- Live HTML simplification
- Real-time DOM manipulation

---

## Tech Stack & Technical Depth

### Frontend

- Chrome Extension (Manifest v3)
- NextJS

### Backend

- Node.js
- Express.js
- MongoDB
- Multer (file uploads)
- Groq API (LLM-powered simplification)

### Architecture Highlights

- Separate routes for:
  - `/api/document/upload`
  - `/api/simplify` (Live HTML transformation)
- Structured DOM-safe content handling
- Scalable backend design

---

## Usability & Impact

ReadEase aims to improve:

- Reading comfort
- Cognitive clarity
- Information retention
- Digital inclusivity

### Who Benefits?

- Students with dyslexia
- Neurodivergent learners
- ESL readers
- Elderly users
- Anyone who prefers simplified content

Accessibility should not be optional & ReadEase makes it effortless.

---

## Setup Instructions

---

### 1. Clone the Repository

```bash
git clone https://github.com/roldan-dsouza/3_penguin_1_dolphin.git
cd 3_penguin_1_dolphin
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```
MONGODB_URI=mongodb_url
DB_NAME=readease
PORT=8000
GROQ_API_KEY=your_api_key_here
```

Start the backend:

```bash
npm run dev
```

---

### 3. Chrome Extension Setup

1. Open Chrome
2. Navigate to `chrome://extensions`
3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select the `dyslexia-extension` folder

---

## Vision

ReadEase is not just a tool.

It is a step toward a more inclusive internet —
where information adapts to people,
not the other way around.

---
