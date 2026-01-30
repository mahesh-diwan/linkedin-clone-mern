# 🚀 LinkedIn Clone: Full-Stack Containerized Deployment

A professionally architected LinkedIn clone demonstrating a full-stack microservices approach. This project focuses on container orchestration, reverse proxy routing, and automated CI/CD workflows.



## 🏗 System Architecture

The application is decomposed into independent services managed via **Docker Compose** to ensure environment parity between development and production .

* **Frontend**: React.js / Vite SPA served via **Nginx**.
* **Backend**: Node.js & Express API handling business logic and JWT-based authentication.
* **Database**: MongoDB 6.0 with persistent volume mapping for data durability.
* **Reverse Proxy**: Nginx acts as the primary entry point (Port 80), handling SPA routing and proxying `/api` requests to the internal backend service.
* **Monitoring**: Prometheus & Grafana stack for real-time container health and resource tracking.



## 🛠 Tech Stack

| Component      | Technology                               |
| :------------- | :--------------------------------------- |
| **Frontend** | React, Vite, Tailwind CSS, Axios         |
| **Backend** | Node.js, Express, Mongoose               |
| **Database** | MongoDB (NoSQL)                          |
| **DevOps** | Docker, Docker Compose, GitHub Actions   |
| **Cloud** | AWS EC2 (Ubuntu)                         |
| **Web Server** | Nginx                                    |

---

## 🚀 DevOps & CI/CD Flow

This project utilizes a fully automated pipeline to ensure rapid and reliable deployments:

1.  **Version Control**: Code is pushed to the `main` branch on GitHub.
2.  **GitHub Actions**: 
    * Triggers a build process for both Frontend and Backend images.
    * Pushes optimized images to **Docker Hub**.
    * Executes a remote SSH script to update the **AWS EC2** instance.
3.  **Deployment**: The server pulls updated images and performs a `--force-recreate` to ensure the latest code is live without manual intervention.



---

## 🔧 Engineering Challenges Solved

### 1. Reverse Proxy Optimization
Configured Nginx to resolve the "Single Page Application" routing issue (404 on refresh) using `try_files` and managed internal networking to resolve the **502 Bad Gateway** by binding the Node.js server to `0.0.0.0`.

### 2. Path-to-Regexp Migration
Resolved backend startup crashes by migrating wildcard routes from deprecated syntax (`/:any*`) to modern Express standards (`*`), ensuring compatibility with Node v18+ environments.

### 3. Data Persistence
Implemented Docker volumes to decouple the MongoDB data layer from the container lifecycle, ensuring user profiles and posts persist through updates and reboots.

---

## 🚦 Installation & Local Setup

### Prerequisites
* Docker & Docker Compose
* Node.js v18+

### Setup
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/maheshdiwan/linkedin-clone.git](https://github.com/maheshdiwan/linkedin-clone.git)
    cd linkedin-clone
    ```
2.  **Configure Environment Variables:**
    Create a `.env` file in the root with your DB credentials, JWT secrets, and API URLs.
3.  **Spin up the stack:**
    ```bash
    docker-compose up -d --build
    ```
4.  **Access the app:**
    Open `http://localhost` for the frontend and `http://localhost/api/v1` for the API.

---

## 📈 Roadmap
* **Security**: Integrating Let's Encrypt for automated SSL/TLS termination.
* **Scale**: Transitioning from Docker Compose to Kubernetes (EKS) for horizontal scaling.
* **Performance**: Implementing Redis for session caching and feed optimization.

---
