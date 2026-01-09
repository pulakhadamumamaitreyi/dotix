CREATE DATABASE job_scheduler;
USE job_scheduler;

CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskName VARCHAR(255),
  payload JSON,
  priority ENUM('Low','Medium','High'),
  status ENUM('pending','running','completed'),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
