CREATE TABLE IF NOT EXISTS db.users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS db.resources (
        resource_id INT PRIMARY KEY AUTO_INCREMENT,
        resource_name VARCHAR(50) NOT NULL,
        resource_type VARCHAR(25),
        quantity INT NOT NULL,
        status ENUM('pending', 'approved', 'declined', 'expired') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );



CREATE TABLE IF NOT EXISTS db.requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    resource_type_id INT NOT NULL,
    quantity INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status_id INT NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE IF NOT EXISTS db.approvals (
    approval_id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT NOT NULL,
    admin_id INT NOT NULL,
    approval_status_id INT NOT NULL,
    comments VARCHAR(255),
    approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests(request_id),
    FOREIGN KEY (admin_id) REFERENCES users(user_id)
);


CREATE TABLE IF NOT EXISTS db.allocations (
    allocation_id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT NOT NULL,
    resource_id INT NOT NULL,
    allocated_quantity INT NOT NULL,
    allocated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    released_at TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests(request_id),
    FOREIGN KEY (resource_id) REFERENCES resources(resource_id)
);


CREATE TABLE IF NOT EXISTS db.logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
