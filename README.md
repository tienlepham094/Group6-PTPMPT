Group 6
Member name

- Tran Pham Thanh Long 20207616
- Nguyen Xuan Son 20207648
- Nguyen Duy Thai 20207630
- Le Pham Thuy Tien 20207633

  Quy tắc:
- Mỗi lần commit không được quá 10 files
- Message khi commit VD:"[FE/BE][Tên Project(PTPTPT)]taskName"
- Tạo nhánh tên cũng tương tự VD: fe/projectName/sprint-1 hoặc be/projectName/sprint-1

## Run docker
Cách chạy docker cho ứng dụng
- Thay trong file ./frontend/vite.config.ts target: "http://localhost:8080" -> target: "http://backend-app:8080"
```
docker compose up -d
docker exec -it container_id /bin/bash
```
- Khi update lại code sử dụng lệnh
```
docker-compose up -d --build
```

