# Study Ease Backend

> Modern Node.js + TypeScript backend for **Study Ease** – a comprehensive platform designed to make studying easier, especially for VBU students. Features robust content management for streams, subjects, notes, and previous year questions (PYQs).

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/yourusername/study-ease-backend.git
cd study-ease-backend
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Development
npm run dev

# Production
npm run build && npm start
```

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Error Handling System](#-error-handling-system)
- [Dependencies Guide](#-dependencies-guide)
- [Development Workflow](#-development-workflow)
- [Contributing](#-contributing)

---

## ✨ Features

### Core Functionality

- 📚 **Content Management**: Streams, subjects, notes, and PYQs
- 🔐 **Authentication**: JWT-based user authentication
- 👮 **Authorization**: Admin-only access for content management
- 🔍 **Advanced Filtering**: Filter by semester, stream, year, subject
- 📄 **API Documentation**: Interactive Swagger/OpenAPI docs
- 🔄 **Real-time Features**: WebSocket support for live interactions

### Technical Features

- 🛡️ **Global Error Handling**: Centralized, consistent error management
- 🏗️ **TypeScript**: Full type safety and better developer experience
- 🗄️ **Database**: PostgreSQL with TypeORM for robust data management
- 📱 **CORS Ready**: Frontend integration support
- 🔒 **Security**: Password hashing, JWT tokens, input validation

---

## 🛠️ Tech Stack

| Category           | Technologies         |
| ------------------ | -------------------- |
| **Runtime**        | Node.js, TypeScript  |
| **Framework**      | Express.js           |
| **Database**       | PostgreSQL, TypeORM  |
| **Authentication** | JWT, bcryptjs        |
| **Documentation**  | Swagger/OpenAPI      |
| **Real-time**      | Socket.io            |
| **Development**    | ts-node-dev, nodemon |

---

## 📁 Project Structure

```
study-ease-backend/
├── src/
│   ├── controllers/        # Business logic controllers
│   ├── routes/            # Express route definitions
│   ├── models/            # TypeORM entities
│   ├── middlewares/       # Custom middleware (auth, error handling)
│   ├── utils/             # Helper functions and utilities
│   ├── connectDB/         # Database configuration
│   └── index.ts           # Application entry point
├── dist/                  # Compiled JavaScript (production)
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

---

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Step-by-Step Setup

1. **Clone Repository**

   ```bash
   git clone https://github.com/yourusername/study-ease-backend.git
   cd study-ease-backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # Create .env file
   cp .env.example .env
   ```

   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=study_ease

   # Authentication
   JWT_SECRET=your_super_secure_jwt_secret_key
   SALT_ROUNDS=10

   # Optional: Socket.io configuration
   SOCKET_IO_CORS_ORIGIN=http://localhost:3001
   ```

4. **Database Setup**

   ```sql
   -- Connect to PostgreSQL and create database
   CREATE DATABASE study_ease;
   ```

5. **Run Application**

   ```bash
   # Development mode (with hot reload)
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

---

## 📖 API Documentation

### Base URL

```
Development: http://localhost:3000
Production: https://your-domain.com
```

### Interactive Documentation

Visit `/api-docs` for complete Swagger documentation:

```
http://localhost:3000/api-docs
```

### Core API Endpoints

#### Authentication

| Method | Endpoint       | Description       | Auth Required |
| ------ | -------------- | ----------------- | ------------- |
| `POST` | `/auth/signup` | Register new user | ❌            |
| `POST` | `/auth/login`  | User login        | ❌            |

#### Streams Management

| Method   | Endpoint       | Description       | Auth Required |
| -------- | -------------- | ----------------- | ------------- |
| `GET`    | `/streams`     | Get all streams   | ❌            |
| `POST`   | `/streams`     | Create new stream | ✅ Admin      |
| `GET`    | `/streams/:id` | Get stream by ID  | ❌            |
| `PUT`    | `/streams/:id` | Update stream     | ✅ Admin      |
| `DELETE` | `/streams/:id` | Delete stream     | ✅ Admin      |

#### Subjects Management

| Method   | Endpoint        | Description                 | Auth Required |
| -------- | --------------- | --------------------------- | ------------- |
| `GET`    | `/subjects`     | Get subjects (with filters) | ❌            |
| `POST`   | `/subjects`     | Create new subject          | ✅ Admin      |
| `GET`    | `/subjects/:id` | Get subject by ID           | ❌            |
| `PUT`    | `/subjects/:id` | Update subject              | ✅ Admin      |
| `DELETE` | `/subjects/:id` | Delete subject              | ✅ Admin      |

#### Notes Management

| Method   | Endpoint     | Description     | Auth Required |
| -------- | ------------ | --------------- | ------------- |
| `GET`    | `/notes`     | Get all notes   | ❌            |
| `POST`   | `/notes`     | Upload new note | ✅ Admin      |
| `GET`    | `/notes/:id` | Get note by ID  | ❌            |
| `PUT`    | `/notes/:id` | Update note     | ✅ Admin      |
| `DELETE` | `/notes/:id` | Delete note     | ✅ Admin      |

#### PYQs (Previous Year Questions)

| Method   | Endpoint                | Description                     | Auth Required |
| -------- | ----------------------- | ------------------------------- | ------------- |
| `GET`    | `/pyqs`                 | Get all PYQs                    | ❌            |
| `POST`   | `/pyqs`                 | Upload new PYQ                  | ✅ Admin      |
| `GET`    | `/pyqs/:id`             | Get PYQ by ID                   | ❌            |
| `PUT`    | `/pyqs/:id`             | Update PYQ                      | ✅ Admin      |
| `DELETE` | `/pyqs/:id`             | Delete PYQ                      | ✅ Admin      |
| `GET`    | `/pyqs/year/:year`      | Get PYQs by year                | ❌            |
| `GET`    | `/pyqs/available-years` | Get available years for subject | ❌            |

### Query Parameters

#### Subjects Filtering

```
GET /subjects?semester=3&stream=computer-science&search=algorithm
```

#### PYQs Filtering

```
GET /pyqs?year=2023&subjectId=123&semester=5
```

---

## 🛡️ Error Handling System

Our application uses a comprehensive 3-layer error handling system for consistent, secure error management.

### Architecture Overview

```
Route Handler → catchAsync Wrapper → Global Error Middleware → Client Response
```

### 1. Custom Exception Class

```typescript
export class CustomException extends Error {
  private status: number;

  constructor(message: string = "Bad Request", status: number = 400) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = status;
  }

  public getStatus(): number {
    return this.status;
  }
}
```

### 2. Async Error Wrapper

```typescript
export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
```

### 3. Global Error Middleware

```typescript
export const globalException = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomException) {
    return res.status(err.getStatus()).json({
      success: false,
      message: err.message,
    });
  }

  console.error("Unexpected Error:", err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
```

### Usage Examples

#### Validation Errors

```typescript
if (!name || !email || !password) {
  throw new CustomException("All fields are required", 400);
}
```

#### Not Found Errors

```typescript
if (!user) {
  throw new CustomException("User not found", 404);
}
```

#### Authorization Errors

```typescript
if (!isAdmin) {
  throw new CustomException("Admin access required", 403);
}
```

### Implementation in Routes

```typescript
// Wrap async route handlers
router.post("/signup", catchAsync(signup));
router.get("/users/:id", catchAsync(getUserById));

// Controllers throw CustomException for known errors
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomException("All fields are required");
  }

  // Business logic continues...
};
```

---

## 📦 Dependencies Guide

### NPM Scripts

| Command         | Purpose                            | Usage             |
| --------------- | ---------------------------------- | ----------------- |
| `npm run dev`   | Development server with hot reload | Development       |
| `npm run build` | Compile TypeScript to JavaScript   | Before deployment |
| `npm start`     | Run production server              | Production        |

### Production Dependencies

#### Core Framework

- **express** `^5.1.0` - Web framework for Node.js
- **cors** `^2.8.5` - Cross-Origin Resource Sharing middleware
- **dotenv** `^17.2.1` - Environment variable management

#### Database & ORM

- **typeorm** `^0.3.26` - TypeScript-first ORM for PostgreSQL
- **pg** `^8.16.3` - PostgreSQL client for Node.js

#### Authentication & Security

- **jsonwebtoken** `^9.0.2` - JWT token generation and verification
- **bcryptjs** `^3.0.2` - Password hashing and comparison

#### Documentation & Real-time

- **swagger-jsdoc** `^6.2.8` - API documentation generator
- **swagger-ui-express** `^5.0.1` - Interactive API documentation
- **socket.io** `^4.8.1` - Real-time bidirectional communication

### Development Dependencies

#### TypeScript Ecosystem

- **typescript** `^5.9.2` - TypeScript compiler
- **ts-node** `^10.9.2` - Run TypeScript files directly
- **ts-node-dev** `^2.0.0` - Development server with auto-restart

#### Type Definitions

- **@types/express** `^5.0.3` - Express.js type definitions
- **@types/cors** `^2.8.19` - CORS middleware type definitions
- **@types/jsonwebtoken** `^9.0.10` - JWT type definitions
- **@types/node** `^24.3.0` - Node.js type definitions

---

## 👨‍💻 Development Workflow

### Getting Started

1. **Setup Development Environment**

   ```bash
   npm run dev
   ```

   This starts the development server with:

   - Hot reload on file changes
   - TypeScript compilation
   - Automatic server restart

2. **API Testing**

   - Use Swagger UI at `http://localhost:3000/api-docs`
   - Import Postman collection (if available)
   - Test WebSocket connections using Socket.io client

3. **Database Management**
   ```bash
   # TypeORM will auto-sync tables in development
   # For production, use migrations:
   npm run typeorm migration:generate -- -n MigrationName
   npm run typeorm migration:run
   ```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **Error Handling**: Use `CustomException` for all known errors
- **Async Operations**: Always wrap with `catchAsync`
- **Database**: Use TypeORM repositories for data operations

### Testing Strategy

```typescript
// Example unit test for error handling
describe("CustomException", () => {
  it("should create exception with message and status", () => {
    const error = new CustomException("Test error", 404);
    expect(error.message).toBe("Test error");
    expect(error.getStatus()).toBe(404);
  });
});
```

---

## 🚀 Deployment

### Build Process

```bash
# 1. Install dependencies
npm ci

# 2. Build TypeScript
npm run build

# 3. Start production server
npm start
```

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=3000
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-password
DB_NAME=study_ease_prod
JWT_SECRET=your-super-secure-jwt-secret
```

### Health Check Endpoint

```typescript
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Process

1. **Fork & Clone**

   ```bash
   git clone https://github.com/yourusername/study-ease-backend.git
   cd study-ease-backend
   ```

2. **Create Feature Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**

   - Follow existing code patterns
   - Use TypeScript strictly
   - Add proper error handling
   - Update documentation if needed

4. **Test Changes**

   ```bash
   npm run dev
   # Test your changes thoroughly
   ```

5. **Commit & Push**

   ```bash
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

6. **Create Pull Request**
   - Provide clear description
   - Reference related issues
   - Include testing instructions

### Code Standards

- **TypeScript**: Use strict type checking
- **Error Handling**: Always use `CustomException` for known errors
- **Async Functions**: Wrap route handlers with `catchAsync`
- **Database**: Use TypeORM entities and repositories
- **Documentation**: Update API docs for new endpoints

### Commit Convention

```
feat: add new feature
fix: bug fix
docs: documentation updates
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

---

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/study-ease-backend/issues)
- **Documentation**: [API Docs](http://localhost:3000/api-docs)
- **Email**: support@studyease.com

---

**Built with ❤️ for VBU students and the broader academic community.**
