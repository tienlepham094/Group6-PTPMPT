# Resource management system - Group 6 PTPMPT
---
## Introduction
The **Resource Management System** is a comprehensive solution designed to manage and monitor computational resources efficiently. It provides a user-friendly interface and robust API endpoints

### Team member
ID| Name | Email |
--- | --- | --- |
20207616 | Trần Phạm Thành Long | long.tpt207616@sis.hust.edu.vn|
20207648 | Nguyễn Xuân Sơn | son.nx207648@sis.hust.edu.vn|
20207630 | Nguyễn Duy Thái| thai.nd2076306@sis.hust.edu.vn|
20207633 | Lê Phạm Thuỷ Tiên | tien.lpt207633@sis.hust.edu.vn|
---
## Table of contents
1. Introduction
2. [Function and Features](#function-and-features)  
   - [1. User Management](#1-user-management)  
   - [2. Admin Capabilities](#2-admin-capabilities)  
   - [3. Real-Time Resource Monitoring](#3-real-time-resource-monitoring)  
   - [4. Telegram Bot Integration](#4-telegram-bot-integration)  
3. [Technologies](#technologies)   
4. [Project Structure](#project-structure)  
5. [Deployment](#deployment)  

---
## Function and Features 🛠️
This document outlines the **features** of a Resource Management System
### **1. User Management**  
- **Login & Registration**: Secure user authentication and onboarding.  
- **Change Password**: Users can update their credentials securely.  
- **User Requests**:  
   - Create, cancel, and monitor resource allocation requests.  

### **2. Admin Capabilities**  
- **Resource Management**:  
   - View, add, and update resources.  
   - Monitor detailed user resource usage history.  
   - Revoke resources before the allocation expires.  
- **Request Approval**:  
   - View all pending requests.  
   - Approve or reject resource requests manually.  
- **User Management**:  
   - View, delete, and update user accounts.

### **3. Real-Time Resource Monitoring**  
- **Detailed System Metrics**:  
   - **CPU Metrics**: Usage percentage, logical processors, physical cores.  
   - **Memory Metrics**: Available, used, and total memory with usage percentages.  
   - **Disk Metrics**: Free and used disk space with total capacity.  
   - **Network Traffic**: Monitor network traffic including sent and received data.  
- **Visualization**: Collected metrics can be visualized through graphs for better insights.

### **4. Telegram Bot Integration** 🚀  
The system now includes an additional **Telegram Bot** integration to provide enhanced accessibility and notifications:  
- **Instant Notifications**:  
   - Activate account with telegram bot
   - Admins and users receive real-time updates on resource requests, approvals, or issues.  
- **System Alerts**:  
   - Receive alerts on critical resource usage metrics, ensuring proactive management.  
---

## Technologies ⚙️
- **Languages**:  
  - Java 21 🖥️  
  - TypeScript 📜
  
- **Backend**:  
  - Java Spring Boot 3.3.4 🚀
  
- **Frontend**:  
  - ReactJS ⚛️  
  - Vite ⚡️

- **Database**:  
  - MySQL 🗃️
---
## Deployment 🚀
Fill the information with template file .env.example
### Run docker
```
docker compose up -d
docker exec -it container_id /bin/bash
```
- When updating backend code
```
cd backend && maven package
docker-compose up -d --build
```
