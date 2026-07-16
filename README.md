# 🛍️ ShopHub - Product Catalog Application

A production-ready product catalog application built with React.js and TypeScript. This project demonstrates modern React practices including state management with Redux Toolkit, client-side filtering, responsive design, and smooth animations.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Why I Built This](#why-i-built-this)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [What I Learned](#what-i-learned)
- [Approach & Thought Process](#approach--thought-process)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [API Integration](#api-integration)
- [State Management Strategy](#state-management-strategy)
- [UI/UX Decisions](#uiux-decisions)
- [Challenges Faced](#challenges-faced)
- [Future Improvements](#future-improvements)
- [Screenshots](#screenshots)
- [Contact](#contact)

---

## 📖 Overview

This is a product catalog application that fetches data from the Fake Store API and provides users with a seamless shopping experience. Users can browse products, search by title, filter by category, and view detailed product information.

I built this application to showcase my understanding of React fundamentals, TypeScript, state management, and creating responsive, user-friendly interfaces.

**Live Demo:** [Insert your deployed URL]

---

## 🤔 Why I Built This

I created this project to demonstrate:

1. **React Proficiency** - Functional components, hooks, and best practices
2. **TypeScript Implementation** - Type safety and better developer experience
3. **State Management** - Real-world usage of Redux Toolkit
4. **API Integration** - Working with external APIs and handling async operations
5. **UI/UX Design** - Creating an intuitive, responsive interface
6. **Problem Solving** - Handling edge cases like loading, errors, and empty states

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework with latest features
- **TypeScript 6** - Type safety and better DX
- **Redux Toolkit 2** - State management with RTK
- **React Router 7** - Navigation and routing
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion 11** - Animations and transitions
- **Axios 1** - HTTP requests
- **Vite 8** - Build tool and dev server

### Why These Choices?

| Technology | Why I Chose It |
|------------|----------------|
| React | Industry standard, component-based architecture |
| TypeScript | Catches errors early, better IDE support |
| Redux Toolkit | Simplifies Redux, built-in best practices |
| Tailwind CSS | Speeds up development, consistent styling |
| Framer Motion | Smooth animations with minimal code |
| Vite | Fast development server, quick builds |

---

## ✨ Features

### I've implemented the following features:

#### 1. Product Listing
- Fetches products from `https://fakestoreapi.com/products`
- Displays product image, title, price, category, and rating
- Grid layout that adapts to screen size

#### 2. Search Functionality
- Real-time search by product title
- Instant filtering without page reload
- Clear button to reset search

#### 3. Category Filtering
- Dynamic category buttons generated from API data
- Visual feedback for selected category
- Reset button to clear all filters

#### 4. Product Details
- Dedicated product detail page
- Large product image with loading state
- Full description, price, category, and ratings
- Related products from same category

#### 5. Loading States
- Animated spinner while fetching data
- Skeleton or placeholder for images

#### 6. Error Handling
- User-friendly error messages
- Retry button to refetch data
- Graceful fallbacks for failed images

#### 7. Empty States
- Message when no products match filters
- Suggestion to clear filters

#### 8. Routing
- React Router for navigation
- `/` - Home page
- `/catalog` - Product listing
- `/product/:id` - Product details

#### 9. Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Optimized touch targets for mobile

---

## 📚 What I Learned

During this project, I strengthened my understanding of:

- **React Hooks** - useEffect, useState, custom hooks
- **Redux Toolkit** - createSlice, createAsyncThunk, useSelector, useDispatch
- **TypeScript** - Interfaces, types, generics, type safety
- **API Integration** - Axios, async/await, error handling
- **Animations** - Framer Motion, transitions, variants
- **Responsive Design** - Tailwind CSS breakpoints, mobile-first
- **Git Workflow** - Feature branches, commits, push

---

## 🧠 Approach & Thought Process

### My Development Process

1. **Planning Phase**
   - Analyzed the requirements
   - Designed the data flow
   - Sketched the UI layout

2. **Setup Phase**
   - Created Vite + React + TypeScript project
   - Configured Tailwind CSS
   - Set up React Router

3. **API Integration**
   - Created service layer for API calls
   - Defined TypeScript interfaces for API responses
   - Implemented error handling

4. **State Management**
   - Set up Redux store
   - Created slices for products and filters
   - Implemented async thunk for fetching

5. **Component Development**
   - Built reusable components
   - Added animations for better UX
   - Ensured responsiveness

6. **Testing & Refinement**
   - Tested all features
   - Fixed edge cases
   - Optimized performance

### Key Design Decisions

1. **Why Redux over Context?**
   - Redux provides better debugging tools
   - More predictable state updates
   - Easier to scale for future features

2. **Why Client-side Filtering?**
   - API doesn't support search/filter parameters
   - Instant feedback for users
   - No additional API calls

3. **Why Framer Motion?**
   - Declarative animations
   - Good performance
   - Easy to implement

---

## 📁 Project Structure
