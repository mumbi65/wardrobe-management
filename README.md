# Wardrobe App

Wardrobe is a full-stack web application that allows users to manage their clothing collection. Users can add, edit, and categorize clothing items while also interacting with a well-structured backend.

## Live Demo
  Frontend (Vercel): https://wardrobe-management.vercel.app/
  Backend (Render): https://wardrobe-backend-y3po.onrender.com
  

## Tech Stack
### Frontend:
1. React (Vite + TypeScript)
2. CSS
3. Axios (for API requests)
4. React Router

### Backend:
1. Django (Django REST Framework)
2. SQLite (Database)
3. Gunicorn (WSGI server for deployment)
4. Render (Hosting)


## Features
1. User authentication (login/register)
2. Add, update, and delete clothing items
3. Categorization of clothing items
4. API with CRUD functionality
5. Responsive UI


## Setup Instructions

### Clone the repository
```sh
git clone https://github.com/mumbi65/wardrobe-management.git
cd wardrobe-management
```

### Backend Setup (Django)
```sh
cd wardrobe_backend
python -m venv venv
source venv/bin/activate
# On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

#### Set up environment variables**
Create a `.env` file in `wardrobe_backend/` and add:
```env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_database_url
ALLOWED_HOSTS=your_allowed_hosts

## replace them with your own values 
```

#### Apply Migrations & Run Server
```sh
python manage.py migrate
python manage.py runserver
```

---

### Frontend Setup (React + Vite)
```sh
cd ../wardrobe-frontend
npm install  # Use npm or yarn if you prefer
```

#### **Run the Frontend**
```sh
npm run dev
```

---

## Deployment
### Backend (Render)
1. Push changes to GitHub.
2. Link the repository to Render.
3. Set environment variables in Render.
4. Deploy the backend.

### Frontend (Vercel)
1. Push changes to GitHub.
2. Link the repository to Vercel.
3. Set up environment variables in Vercel.
4. Deploy the frontend.

---

## API Endpoints
### Authentication
1. `POST /api/auth/register/` - Register a new user
2. `POST /api/auth/login/` - Log in a user

### Clothing Items
1. `GET /clothing-items/` - Fetch all clothing items
2. `POST /clothing-items/` - Add a new clothing item
3. `PUT /clothing-items/{id}/` - Update a clothing item
4. `DELETE /clothing-items/{id}/` - Delete a clothing item

---

##  License
This project is licensed under the MIT License.

---

## Contact
For any issues, feel free to reach out!

- **Email:** mumbic65@gmail.com
- **GitHub:** mumbi65 (https://github.com/mumbi65)

