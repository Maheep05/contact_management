
# **Contact Management System**

This project is a **Contact Management System** that allows users to create, read, update, and delete (CRUD) contact details. It uses the MERN stack (MongoDB, Express.js, React, and Node.js).

---

## **Features**
- **Add Contacts**: Create a new contact with details such as name, email, phone, job title, and company.
- **View All Contacts**: Retrieve a list of all saved contacts.
- **Delete Contacts**: Remove contacts from the database.

---

## **Setup Instructions**
---

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/your-repo/contact-management-system.git
cd contact-management-system
```

---

### **Step 2: Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following content:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/mydatabase
   PORT=3000
   ```
   Replace `MONGO_URL` with your MongoDB connection string if hosted on a cloud instance.
4. Start the server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:3000`.

---

### **Step 3: Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`.

---
## **How It Works**

### **Frontend (React)**
1. **Add Contact Modal**:
   - A form in a modal where users can enter contact details and save them by making an API call to the backend.

2. **List of Contacts**:
   - Displays all contacts fetched from the backend.

3. **Delete Options**:
   - Users can edit contact details or delete a contact from the list.

4. **Libraries Used**:
   - `Material-UI`: For UI components.
   - `Axios`: For API requests.

---

### **Backend (Express)**
1. **Endpoints**:
   - `POST /create`: Adds a new contact.
   - `GET /all`: Fetches all contacts.
   - `PUT /update`: Updates an existing contact.
   - `DELETE /delete/:id`: Deletes a contact.

2. **Validation**:
   - Uses `zod` for request body validation.

3. **Database**:
   - MongoDB is used to store contact details.

---

### **Major Technical Decisions**
1. **Separation of Concerns**:
   - Kept frontend and backend in separate directories for better scalability.
2. **Validation**:
   - Used `zod` for schema validation to ensure data integrity.
3. **CORS**:
   - Configured CORS to allow requests only from the frontend domain.
4. **Reusable UI**:
   - Used Material-UI for a consistent and modern design.
5.
---

