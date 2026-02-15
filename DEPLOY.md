# How to Deploy 'Lease IT'

You can make your website public for free using GitHub Pages, Netlify, or Vercel.

## Option 1: GitHub Pages (Recommended)

We have configured your project for GitHub Pages.

1.  **Commit and Push** your changes to GitHub:
    ```bash
    git add .
    git commit -m "Configure GitHub Pages deployment"
    git push origin main
    ```

2.  **Deploy** by running this command in the `frontend` directory:
    ```bash
    cd frontend
    npm run deploy
    ```
    *(If you are already in the `frontend` directory, just run `npm run deploy`)*

3.  Your app will be live at: `https://<YOUR_USERNAME>.github.io/Lease-IT/`

### Important Setup Note
- Open `vite.config.js` and check the `base` setting. It is currently set to `/Lease-IT/`.
- If your GitHub repository name is DIFFERENT from `Lease-IT`, you MUST change this value to match your repository name (e.g., `/my-repo-name/`).

---

## Accessing Your Site

### 1. From Your Phone (Same Wi-Fi)
You can test the site on your phone while developing if both devices are on the same Wi-Fi network.
1.  Find your computer's Local IP Address (e.g., `192.168.1.5`).
    - **Windows:** Open command prompt and type `ipconfig`. Look for "IPv4 Address".
    - **Mac:** Open terminal and type `ifconfig | grep "inet " | grep -v 127.0.0.1`.
2.  On your phone, visit: `http://<YOUR_IP_ADDRESS>:5173/Lease-IT/`

### 2. From ANY Phone (Public Internet)
Once you complete the deployment steps above (GitHub Pages, Netlify, or Vercel), anyone can access your site using the public URL provided by the service (e.g., `https://your-username.github.io/Lease-IT/`).

---

## Option 2: Netlify Drop (Easy - No Account Needed Initially)

1.  Run the build command:
    ```bash
    npm run build
    ```
    This creates a `dist` folder.

2.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).

3.  Drag and drop the `dist` folder.

---

## Option 3: Vercel

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run: `vercel`
