# Technology Wave - FastAPI Backend

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` (especially SECRET_KEY and admin credentials)

## Running the Server

Development mode:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Production mode:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Default Admin Credentials

Username: `admin`
Password: `admin123`

**IMPORTANT:** Change these in production via the `.env` file!

## File Upload Storage

Uploaded files are stored in the `uploads/` directory with the following structure:
- `uploads/hero/` - Hero banner images
- `uploads/about/` - About section images
- `uploads/services/` - Service images
- `uploads/shop/` - Shop section images
- `uploads/news/` - News images

## Database

The application uses SQLite by default (`technologywave.db`). The database is created automatically when the server starts.

## Deployment to VPS

1. Install Python 3.8+ on your VPS
2. Clone the repository
3. Follow the setup steps above
4. Configure `.env` with production values
5. Run with a process manager like systemd or supervisor
6. Use nginx as a reverse proxy
