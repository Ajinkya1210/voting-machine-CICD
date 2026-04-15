## End-to-End Automated Cloud Voting System: Jenkins CI/CD on AWS EKS & RDS

[![Jenkins CI/CD](https://img.shields.io/badge/Jenkins-CI%2FCD-0078D4?style=flat&logo=jenkins&logoColor=white&labelColor=555555)](https://jenkins.io/)
![AWS](https://img.shields.io/badge/AWS-Cloud%20Services-232F3E?style=flat&logo=amazonaws&logoColor=white)
![AWS EKS](https://img.shields.io/badge/AWS%20EKS-Kubernetes-FF9900?style=flat&logo=amazoneks&logoColor=white)
![AWS RDS](https://img.shields.io/badge/AWS%20RDS-MySQL-FF9900?style=flat&logo=amazon-rds&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=flat&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat&logo=nodedotjs&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-Slave-E95420?style=flat&logo=ubuntu&logoColor=white)

### Overview
A fully automated CI/CD pipeline that builds and deploys a Node.js microservice into an Amazon EKS cluster with a load-balanced frontend.
The system ensures high availability and data persistence by integrating stateless Kubernetes pods with a private Amazon RDS (MySQL) instance, secured via custom VPC Security Groups and IAM Access Entries.

### Architecture

![Architecture](photos/1.png)

### App homepage

![App page](photos/2.png)

![App page](photos/3.png)

![App page](photos/4.png)

![App page](photos/5.png)
