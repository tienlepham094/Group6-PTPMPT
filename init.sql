-- CREATE TABLE
CREATE TABLE db.users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'user', 'admin'
    telegram_id BIGINT UNIQUE, -- Telegram chat ID để gửi thông báo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE db.resources (
    resource_id INT PRIMARY KEY AUTO_INCREMENT,
    resource_type ENUM('GPU', 'CPU', 'RAM', 'Disk') NOT NULL,
    quantity INT NOT NULL,
    status_resources ENUM('available', 'allocated', 'maintenance') NOT NULL, -- Trạng thái tài nguyên
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE db.requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    resource_type ENUM('GPU', 'CPU', 'RAM', 'Disk') NOT NULL, -- Loại tài nguyên yêu cầu
    quantity INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status_request ENUM('pending', 'approved', 'rejected') NOT NULL, -- Trạng thái yêu cầu
    reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);


CREATE TABLE db.approvals (
    approval_id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT,
    admin_id INT,
    approval_status ENUM('approved', 'rejected') NOT NULL, -- Trạng thái phê duyệt
    comments VARCHAR(255),
    approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE SET NULL,
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE SET NULL
);


CREATE TABLE db.allocations (
    allocation_id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT,
    resource_id INT,
    allocated_quantity INT NOT NULL,
    allocated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    released_at TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE SET NULL,
    FOREIGN KEY (resource_id) REFERENCES resources(resource_id) ON DELETE SET NULL
);


CREATE TABLE db.logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT, -- Không có ràng buộc khóa ngoại
    request_id INT, -- Không có ràng buộc khóa ngoại
    action VARCHAR(100) NOT NULL, -- Ví dụ: 'created request', 'approved request'
    description TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- INSERT DATA
-- Insert data into users table
INSERT INTO db.users (username, email, password_hash, role, telegram_id)
VALUES 
    ('user1', 'user1@example.com', 'hash_pass1', 'user', 10001),
    ('user2', 'user2@example.com', 'hash_pass2', 'user', 10002),
    ('admin1', 'admin1@example.com', 'hash_admin1', 'admin', 20001),
    ('admin2', 'admin2@example.com', 'hash_admin2', 'admin', 20002);

-- Insert data into resources table
INSERT INTO db.resources (resource_type, quantity, status_resources)
VALUES 
    ('GPU', 10, 'available'),
    ('CPU', 20, 'allocated'),
    ('RAM', 32, 'available'),
    ('Disk', 100, 'maintenance');

-- Insert data into requests table
INSERT INTO db.requests (user_id, resource_type, quantity, start_time, end_time, status_request, reason)
VALUES 
    (1, 'GPU', 2, '2024-10-10 09:00:00', '2024-10-11 09:00:00', 'pending', 'Need GPU for machine learning'),
    (2, 'CPU', 4, '2024-10-12 10:00:00', '2024-10-13 10:00:00', 'approved', 'High-performance computing'),
    (1, 'RAM', 16, '2024-10-14 08:00:00', '2024-10-15 08:00:00', 'rejected', 'Memory-intensive task');

-- Insert data into approvals table
INSERT INTO db.approvals (request_id, admin_id, approval_status, comments)
VALUES 
    (2, 3, 'approved', 'Approved for HPC task'),
    (3, 4, 'rejected', 'Insufficient resources available');

-- Insert data into allocations table
INSERT INTO db.allocations (request_id, resource_id, allocated_quantity, allocated_at)
VALUES 
    (2, 2, 4, '2024-10-12 10:05:00');

-- Insert data into logs table
INSERT INTO db.logs (user_id, request_id, action, description)
VALUES 
    (1, 1, 'created request', 'User1 requested 2 GPUs for machine learning.'),
    (3, 2, 'approved request', 'Admin1 approved User2 CPU request.'),
    (4, 3, 'rejected request', 'Admin2 rejected User1 RAM request.');