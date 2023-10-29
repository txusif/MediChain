# MediChain Dapp

MediChain is a decentralized application (Dapp) designed to revolutionize the way medical data is stored, shared, and accessed securely on the blockchain.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Introduction

MediChain is built on blockchain technology, ensuring the privacy and security of medical records, enabling users to:

- Connect their Metamask wallet for secure access.
- Register as a patient, doctor, or lab.
- Upload medical test reports to the patient's wallet.
- View and search medical reports.
- Create and donate to medical crowdfunding campaigns.
- And much more.

## Features

- **Secure Authentication:** Users can securely connect their Metamask wallet for identity.
- **User Roles:** Patients, doctors, and labs have distinct roles with specific permissions.
- **Medical Record Storage:** Securely store medical records on the blockchain.
- **Campaigns:** Create, browse, and donate to medical crowdfunding campaigns.
- **Intuitive Interface:** User-friendly interface for a seamless experience.

## Getting Started

### Prerequisites

Before getting started, you'll need to have the following installed:

- Node.js
- Foundry (for smart contract development)
- Metamask extension for your browser

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/txusif/MediChain
   ```

2. Navigate to the project directory:

   ```
   cd MediChain/client
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Run the Dapp:
   ```
   npm run dev
   ```

## Tech Stack

This project is built using the following technologies and libraries:

- **[Vite](https://vitejs.dev/):** A fast development build tool.
- **[React](https://reactjs.org/):** A JavaScript library for building user interfaces.
- **[React Router](https://reactrouter.com/):** A routing library for React applications.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework.
- **[Axios](https://axios-http.com/):** A promise-based HTTP client for making network requests.
- **[Ethers](https://docs.ethers.io/v5/):** A JavaScript library for interacting with the Ethereum blockchain.
- **[Dotenv](https://github.com/motdotla/dotenv):** A zero-dependency module that loads environment variables from a `.env` file.
- **[React Copy to Clipboard](https://github.com/nkbt/react-copy-to-clipboard):** A React component that copies text to the clipboard.
- **[React Hot Toast](https://carloscuesta.me/react-hot-toast/):** A notifications library for React.
- **[Thirdweb](https://thirdweb.io/):** A development framework for building decentralized applications on the Thirdweb blockchain.
- **[Font Awesome](https://fontawesome.com/):** A library of icons.

### Development Dependencies

- **[Vite Plugin React](https://github.com/vitejs/vite-plugin-react):** A Vite plugin for React.
- **[Autoprefixer](https://github.com/postcss/autoprefixer):** A PostCSS plugin to parse CSS and add vendor prefixes.
- **[PostCSS](https://postcss.org/):** A CSS post-processor.
- **[Vite Plugin Node Polyfills](https://github.com/alloc/vite-plugin-polyfill):** A Vite plugin to add Node.js polyfills for the browser.

Please refer to the `package.json` file for version information on these dependencies.

## Usage

- Visit the Dapp homepage.
- Connect your Metamask wallet.
- Register as a patient, doctor, or lab.
- Use the respective features based on your role.

## User Roles

- **Patient:** View medical reports, create campaigns and fund campaigns.
- **Doctor:** Search and view patient medical reports and fund campaigns.
- **Lab:** Upload medical reports to patient wallets and fund campaigns.

## Screenshots

![Screenshot 1](screenshots/screenshot1.png)
![Screenshot 2](screenshots/screenshot2.png)

## Contributing

If you'd like to contribute to this project, follow these simple steps:

1. Fork the repository by clicking the "Fork" button.
2. Create a new branch for your changes: `git checkout -b feature/your-feature-name`
3. Make your desired changes and commit them: `git commit -m 'Add your feature'`
4. Push your changes to the new branch on your fork: `git push origin feature/your-feature-name`
5. Open a pull request (PR) on the original repository's GitHub pagVe.

I welcome contributions and appreciate your help in making this project better!

## License

This project is licensed under the [MIT License](client/LICENSE.md).
This project is licensed under the [MIT License](client/LICENSE).

---

For any questions or support, please contact txusif@gmail.com
