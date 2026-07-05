# Srikanth Kalyanasundaram Consulting - Website

A complete, mobile-first, seven-page marketing website. Built using pure HTML, CSS, and JavaScript with no build steps or external package dependencies. The site is optimized for performance, accessibility, and credibility.

## Page Map
*   `index.html`: Homepage (introducing the practice and Srikanth)
*   `about.html`: Founder credibility (the main personal bio asset)
*   `portfolio.html`: Detailed personal portfolio (career transition, timeline, and credentials)
*   `program.html`: Mindful Professional 360° flagship curriculum
*   `for-colleges.html`: College placement readiness partnership page
*   `for-corporates.html`: Corporate L&D graduate-trainee bootcamps
*   `contact.html`: Enquiry form and contact details

## Running Locally
Since this is a static site, you can run it in two ways:
1. **Directly**: Double-click `index.html` to open it in your browser.
2. **Local Web Server**: For proper path handling, run a simple local HTTP server from the website root folder. For example, using Python:
   ```bash
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000` in your web browser.

## Deployment to GitHub Pages
To publish and host this review site on GitHub Pages:
1. Ensure Git is initialized inside the `website/` directory only:
   ```bash
   cd website
   git init
   git add -A
   git commit -m "Initial website deployment"
   ```
2. Create a new public repository on GitHub named `srikanth-consulting`.
3. Add the remote and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/srikanth-consulting.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings** > **Pages** inside your repository:
   *   Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   *   Under **Branch**, select `main` and `/ (root)` folder, then click **Save**.
5. Once built (usually 1-2 minutes), the site will be live at `https://<your-username>.github.io/srikanth-consulting/`.

*Note: The `.nojekyll` file at the root ensures that folders starting with underscores or containing static assets serve correctly.*

## Launch Checklist & placeholders
Before moving the site from staging/review to production, please verify the following:
1. **Email Address**: Replace `EMAIL_TO_CONFIRM@domain` with your professional business email across all files.
2. **Formspree Wiring**: Sign up at [formspree.io](https://formspree.io), create a form, and update the form action on `contact.html` to your endpoint.
3. **Photos**: Replace the portrait placeholder on Home, About, and Portfolio pages with a real photo named `srikanth-portrait.webp` in `assets/photos/`. See the instructions in `assets/photos/README.md` for full dimensions and other session photo guidelines.
4. **Testimonials**: Swap the placeholder text boxes on the Home, College, and Corporate pages with real testimonials once you run your first pilot cohorts.
5. **No Fabricated Claims**: Ensure that all statistics and awards remain grounded, factual, and verified.
