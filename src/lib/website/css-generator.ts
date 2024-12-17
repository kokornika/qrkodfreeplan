export function generateCSS(data: VCardFormData): string {
  return `
    /* Reset & Base Styles */
    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary-color: ${data.backgroundColor};
      --text-primary: #1a1a1a;
      --text-secondary: #666666;
      --background: #ffffff;
      --surface: #f8f9fa;
      --border: #e5e7eb;
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --radius: 12px;
    }

    body {
      font-family: 'Inter', sans-serif;
      line-height: 1.5;
      color: var(--text-primary);
      background: var(--surface);
      min-height: 100vh;
    }

    /* Desktop Layout */
    .card-container {
      width: 100%;
      min-height: 100vh;
      display: flex;
      align-items: stretch;
    }

    .digital-card {
      display: grid;
      grid-template-columns: 400px 1fr;
      width: 100%;
      background: var(--background);
      box-shadow: var(--shadow);
    }

    /* Left Panel */
    .left-panel {
      background: linear-gradient(135deg, var(--primary-color), ${data.backgroundType === 'gradient' ? `${data.backgroundColor}22` : data.backgroundColor});
      color: white;
      padding: 3rem;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .profile-section {
      text-align: center;
    }

    .profile-image {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 4px solid white;
      box-shadow: var(--shadow);
      margin: 0 auto 1.5rem;
      object-fit: cover;
      background: white;
    }

    .profile-placeholder {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 4px solid white;
      margin: 0 auto 1.5rem;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
    }

    .monogram {
      font-size: 2.5rem;
      font-weight: 600;
      color: var(--primary-color);
    }

    .profile-section h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .profile-section p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .contact-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: var(--radius);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      color: white;
      text-decoration: none;
      transition: transform 0.2s, background-color 0.2s;
    }

    .contact-item:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateX(4px);
    }

    .contact-item i {
      font-size: 1.25rem;
    }

    /* Right Panel */
    .right-panel {
      padding: 3rem;
      background: var(--background);
      overflow-y: auto;
    }

    .section {
      margin-bottom: 2.5rem;
      padding-bottom: 2.5rem;
      border-bottom: 1px solid var(--border);
    }

    .section:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .section h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
    }

    .section p {
      font-size: 1.1rem;
      color: var(--text-secondary);
      line-height: 1.7;
    }

    /* Social Links */
    .social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .social-link {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--brand-color);
      background: color-mix(in srgb, var(--brand-color) 15%, white);
      transition: transform 0.2s;
      text-decoration: none;
      font-size: 1.25rem;
    }

    .social-link:hover {
      transform: scale(1.1);
    }

    /* QR Code Section */
    .qr-section {
      text-align: center;
    }

    .qr-code {
      width: 240px;
      height: 240px;
      margin: 1.5rem auto;
      padding: 1rem;
      background: white;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
    }

    .qr-code img {
      width: 100%;
      height: 100%;
    }

    /* Action Buttons */
    .actions {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-top: 2rem;
    }

    .action-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem;
      border-radius: var(--radius);
      border: none;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .action-button.primary {
      background: var(--primary-color);
      color: white;
    }

    .action-button.secondary {
      background: white;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
    }

    .action-button:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }

    /* Mobile Layout */
    @media (max-width: 1024px) {
      .digital-card {
        grid-template-columns: 1fr;
      }

      .left-panel {
        padding: 2rem;
      }

      .right-panel {
        padding: 2rem;
      }

      .profile-image,
      .profile-placeholder {
        width: 140px;
        height: 140px;
      }

      .monogram {
        font-size: 2rem;
      }

      .profile-section h1 {
        font-size: 1.75rem;
      }

      .section h2 {
        font-size: 1.25rem;
      }

      .qr-code {
        width: 200px;
        height: 200px;
      }
    }

    @media (max-width: 640px) {
      .left-panel,
      .right-panel {
        padding: 1.5rem;
      }

      .profile-image,
      .profile-placeholder {
        width: 120px;
        height: 120px;
      }

      .monogram {
        font-size: 1.75rem;
      }

      .profile-section h1 {
        font-size: 1.5rem;
      }

      .section {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
      }

      .social-link {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1rem;
      }

      .actions {
        grid-template-columns: 1fr;
      }
    }
  `;
}