<img style="width: 100%" src="https://github.com/ferrumc-rs/ferrumc/blob/master/assets/README/header.svg?raw=true" alt="FerrumC Header">

<div align="center">
<img src="https://img.shields.io/github/license/ferrumc-rs/ferrumc?style=for-the-badge&color=red" alt="License">
<img src="https://img.shields.io/github/languages/code-size/ferrumc-rs/dashboard?style=for-the-badge&color=red" alt="Code Size">
<img src="https://img.shields.io/badge/Sveltekit-FF3E00?style=for-the-badge&color=red" alt="SvelteKit">
<a href="https://discord.gg/qT5J8EMjwk">
<img alt="Discord" src="https://img.shields.io/discord/1277314213878173726?style=for-the-badge&logo=discord&logoColor=red&color=red">
</a>
</div>

## 📖 About FerrumC Dashboard

**FerrumC** is a high-performance Minecraft server implementation written from the ground up in Rust. This repository
contains the **Official Web Dashboard**, a modern management interface built with **SvelteKit**.

### 🔌 Real-time Communication

The dashboard utilizes **WebSockets** to establish a persistent, bi-directional connection with the FerrumC binary. This
allows for:

* **Live Monitoring:** Receive real-time server stats, logs, and player data instantly.
* **Remote Actions:** Send commands, manage configurations, and trigger server actions directly from the browser.

### 🛠️ Integration Workflow

* **Auto-Generated:** Built using SvelteKit and bundled via GitHub Actions.
* **Auto-Uploaded:** Every successful build is automatically uploaded to GitHub Releases as a zip artifact.
* **Native Serving:** The main FerrumC Rust binary fetches these release assets to serve the dashboard directly to users
  without requiring a separate web server setup.

---

## 🖼️ Screenshots

<div align="center">
<h4>Desktop Dashboard</h4>
<img src="https://github.com/ferrumc-rs/dashboard/blob/master/assets/README/FerrumC%20Dashboard.png?raw=true" alt="FerrumC Dashboard Desktop" width="800">

<h4>Mobile Experience</h4>
<img src="https://github.com/ferrumc-rs/dashboard/blob/master/assets/README/FerrumC%20Dashboard%20Mobile.png?raw=true" alt="FerrumC Dashboard Mobile" height="450">
</div>

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (Latest LTS recommended)
* **pnpm** (preferred package manager)

```bash
npm i -g pnpm
```

### Development Server

1. **Install dependencies:**

```bash
pnpm i
```

2. **Start the dev server:**

```bash
pnpm dev
```

> [!TIP]
> To connect the dashboard to a running FerrumC instance, specify the WebSocket port via the URL query string:
`?ws_port=9000`

---

## 📦 Building

### Building Notes

* **CI/CD Driven:** You do not need to produce a single bundled application manually for release; our CI workflow
  handles the bundling and release process.
* **Seamless Updates:** FerrumC fetches the latest release zip. If you push a new build, re-compiling or re-running the
  main FerrumC binary will trigger the dashboard update automatically.

### How to Build Locally

1. **Install dependencies:**

```bash
pnpm i
```

2. **Build the project:**

```bash
pnpm build
```

*The build output will be placed in the `./build` directory.*

---

## 🛠️ Development & Contributions

We welcome contributions to make the FerrumC management experience even better!

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request.

Join our **[Discord Community](https://discord.gg/qT5J8EMjwk)** to discuss features or get help with the setup.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](https://www.google.com/search?q=LICENSE) file for
details.