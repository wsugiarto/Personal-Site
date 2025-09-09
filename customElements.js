class CredEntry extends HTMLElement {
  static get observedAttributes() { return ['entry-id']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  escapeHtml(s) {
    if (s === null || s === undefined) {
      return '';
    }
    return String(s).replace(/[&<>"']/g, function(c) {
      if (c === '&') return '&amp;';
      else if (c === '<') return '&lt;';
      else if (c === '>') return '&gt;';
      else if (c === '"') return '&quot;';
      else if (c === "'") return '&#39;';
      return c;
    });
  }

  loadData() {
    try {
      const raw = localStorage.getItem('credentials');
      if (!raw) {
        return null;
      }
      const data = JSON.parse(raw);

      const entryId = this.getAttribute('entry-id');
      if (!entryId) {
        return null;
      }

      if (data.hasOwnProperty(entryId)) {
        return data[entryId];
      } else {
        return null;
      }
    } catch (e) {
      console.error('Bad JSON in localStorage:', e);
      return null;
    }
  }

  render() {
    const d = this.loadData();

    if (!d) {
      // fallback: show inner content inside <cred-entry>
      this.shadowRoot.innerHTML = `
        <style>
          :host { display:block; }
          hgroup { display:flex; justify-content:space-between; align-items:center; }
          .meta { display:flex; justify-content:space-between; font-style:italic; }
        </style>
        <slot></slot>
      `;
      return;
    }

    let bullets = '';
    if (Array.isArray(d.bullets)) {
      for (let i = 0; i < d.bullets.length; i++) {
        bullets += '<li>' + this.escapeHtml(d.bullets[i]) + '</li>';
      }
    }

    this.shadowRoot.innerHTML = `
      <style>
        *{
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            font-size: 1.2rem;
        }
        :host{
            display: block;  
       }
       hgroup {
            display: flex;
            justify-content: space-between;
            align-items: center;
        
       }
       div {
            display: flex;
            font-style: italic;
            justify-content: space-between;
       }
        ul li{
            list-style-position: inside;
            padding-left: 0.5rem;
        }
        p {
            font-size: 0.8em;
            font-style: italic;
            text-align: right;
        }
      </style>
      <hgroup>
        <h3>${this.escapeHtml(d.title)}</h3>
        <p>${this.escapeHtml(d.dates)}</p>
      </hgroup>
      <div class="meta">
        <p>${this.escapeHtml(d.metaLeft)}</p>
        <p>${this.escapeHtml(d.metaRight)}</p>
      </div>
      <ul>${bullets}</ul>
    `;
  }
}

customElements.define('cred-entry', CredEntry);
// const credentialsData = {
//   "instructional-assistant": {
//     "title": "Instructional Assistant - Theory of Computation",
//     "dates": "Sep 2024-Dec 2024",
//     "metaLeft": "University of California San Diego",
//     "metaRight": "San Diego, CA",
//     "bullets": [
//       "Trained and assisted over 150+ students through office hours, class forums, and detailed solution guides.",
//       "Efficiently graded and streamlined 150+ submissions and feedback using PrairieLearn and Gradescope.",
//       "Collaborated with professors and the team to analyze student feedback to improve future course iterations."
//     ]
//   },
//   "music-ml": {
//     "title": "Music Generation Model using Machine Learning",
//     "dates": "March 2025-June 2025",
//     "metaLeft": "Project",
//     "metaRight": "San Diego, CA",
//     "bullets": [
//       "Led 3 developers to create models to generate pleasant-sounding piano pieces or extend existing pieces.",
//       "Trained generative models in Python using Markov chains, single and dual LSTM architectures.",
//       "Achieved superior NLL and top-K accuracy scores compared to pretrained research-paper models."
//     ]
//   },
//   "rtr-ratings": {
//     "title": "Rating Prediction Model for Fashion Rentals",
//     "dates": "Oct 2024-Dec 2024",
//     "metaLeft": "Project",
//     "metaRight": "San Diego, CA",
//     "bullets": [
//       "Led 2 developers to create a model to predict user ratings of clothing from RentTheRunway.",
//       "Trained machine learning models in Python using concepts from Feature Engineering, Latent Factor Models, Deep Factorization Machines, and Neural Collaborative Filtering.",
//       "Achieved a mean squared error of 1.75 on a scale of 0-10 with a final model incorporating sentiment analysis."
//     ]
//   },
//   "electron-diary": {
//     "title": "Electron Developer Diary",
//     "dates": "March 2024-Sep 2024",
//     "metaLeft": "Project",
//     "metaRight": "San Diego, CA",
//     "bullets": [
//       "Collaborated with 10 developers to launch an Electron-wrapped app for tracking development tasks.",
//       "Led a sub-team to design (Figma) and build the front end (HTML, CSS, JavaScript), delivering all scheduling and creation features.",
//       "Set up a CI/CD pipeline with linters (Mocha), code analysis (Codacy), documentation (JSDocs), unit tests (Jest), and end-to-end tests (WebDriver IO & Puppeteer).",
//       "Successfully launched the application with full functionality and an actionable backlog of enhancements."
//     ]
//   },
//   "vg-modding": {
//     "title": "Video Game Modding",
//     "dates": "Aug 2023-Sep 2023",
//     "metaLeft": "Project",
//     "metaRight": "San Diego, CA",
//     "bullets": [
//       "Designed and developed a new category of items inspired by modern and fantasy weaponry in Minecraft.",
//       "Implemented new gameplay features and graphics using Java and ForgeMDK, authoring custom classes with Forge libraries.",
//       "Enhanced the player experience and received positive community feedback upon release."
//     ]
//   }
// };

// localStorage.setItem('credentials', JSON.stringify(credentialsData));