# React + TypeScript + Vite

# Wardrobe Management System

The Wardrobe Management System is a web application that allows users to manage their wardrobe efficiently. Users can add, edit, delete, and categorize clothing items, as well as filter and search through their wardrobe.

## Features

- User authentication (login/registration)
- Add, edit, delete clothing items
- Categorize items (e.g., tops, bottoms, shoes)
- Filter and search functionality
- Responsive and user-friendly UI

## Technologies Used

- React
- TypeScript
- Axios
- React Router
- React Icons
- CSS

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/wardrobe-management-system.git

   cd wardrobe-management-system

   npm install

   npm start


wardrobe-management-system
├── public
│   ├── index.html
│   └── styles
│       └── main.css
├── src
│   ├── components
│   │   ├── Auth
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── AuthForm.tsx
│   │   ├── Clothing
│   │   │   ├── AddClothing.tsx
│   │   │   ├── EditClothing.tsx
│   │   │   ├── DeleteClothing.tsx
│   │   │   └── ClothingItem.tsx
│   │   ├── Categories
│   │   │   ├── Tops.tsx
│   │   │   ├── Bottoms.tsx
│   │   │   └── Shoes.tsx
│   │   ├── Filter
│   │   │   ├── Filter.tsx
│   │   │   └── Search.tsx
│   │   └── Layout
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── routes.tsx
├── package.json
├── tsconfig.json
└── README.md