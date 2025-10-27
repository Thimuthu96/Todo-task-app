Todo application built with Frontend(React), Backend(Node.js/TypeScript), Database(MySQL)

## Start use below steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Thimuthu96/Todo-task-app.git
   cd Todo-task-app
   ```

2. Set up environment files:
   
   On Linux/Unix:
   ```bash
   # Database environment
   cp db/.env.example db/.env

   # Backend environment
   cp backend/.env.example backend/.env
   ```

   On Windows (PowerShell):
   ```powershell
   # Database environment
   Copy-Item -Path db/.env.example -Destination db/.env

   # Backend environment
   Copy-Item -Path backend/.env.example -Destination backend/.env
   ```

   On Windows (Command Prompt):
   ```cmd
   # Database environment
   copy db\.env.example db\.env

   # Backend environment
   copy backend\.env.example backend\.env
   ```

   Note: These commands copy the example environment files to create your local environment files.

3. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

The application will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:3001

## Application Architecture

```
Todo-task-app/
├── frontend/          # React frontend
├── backend/           # Node.js/TypeScript API
└── db/               # MySQL database
```

## Docker Components

- **Frontend**: Nginx server hosting the React application
- **Backend**: Node.js server running the REST API
- **Database**: MySQL 8.0 instance

## Docker Commands

Start the application:
```bash
docker-compose up --build    # Build and start all services
docker-compose up -d        # Run in detached mode
```

Stop the application:
```bash
docker-compose down         # Stop all services
docker-compose down -v     # Stop and remove volumes
```

View logs:
```bash
docker-compose logs -f     # Follow all logs
docker-compose logs backend # View backend logs only
```

## Testing

The project includes both unit and integration tests. To run tests:

```bash
# Set up test environment
cp backend/__tests__/.env.test.example backend/__tests__/.env.test
cp backend/src/__tests__/.env.test.example backend/src/__tests__/.env.test

# Run tests
cd backend
npm test
```

## Troubleshooting

1. If port 3306 is in use:
   - The database is exposed on port 3307 externally
   - No action needed as Docker handles internal networking

2. If the services fail to start:
   ```bash
   docker-compose down -v   # Clean up containers and volumes
   docker-compose up --build # Rebuild and start
   ```

3. To check service status:
   ```bash
   docker-compose ps
   ```

4. To view service logs:
   ```bash
   docker-compose logs -f [service_name]
   ```
   Service names: frontend, backend, db

## API Endpoints

The backend API is available at `http://localhost:3001` with the following endpoints:

- `GET /api/v1/tasks` - List all tasks
- `POST /api/v1/tasks` - Create a new task
- `PUT /api/v1/tasks/:id` - Update a task as completed
- `DELETE /api/v1/tasks/:id` - Delete a task if needed