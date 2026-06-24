# PostgreSQL Basic Commands Cheat Sheet

## 1. Check PostgreSQL Version

```bash
psql --version
```

---

## 2. Check if PostgreSQL is Running

### Using Homebrew

```bash
brew services list
```

Look for:

```text
postgresql@17  started
```

* `started` → PostgreSQL is running
* `none` → PostgreSQL is stopped

---

## 3. Start PostgreSQL

```bash
brew services start postgresql
```

If using a specific version:

```bash
brew services start postgresql@17
```

---

## 4. Stop PostgreSQL

```bash
brew services stop postgresql
```

or

```bash
brew services stop postgresql@17
```

---

## 5. Restart PostgreSQL

```bash
brew services restart postgresql
```

or

```bash
brew services restart postgresql@17
```

---

## 6. Connect to PostgreSQL

```bash
psql postgres
```

Connect to a specific database:

```bash
psql mydatabase
```

---

## 7. Exit PostgreSQL Shell

```sql
\q
```

---

# Database Commands

## 8. List All Databases

```sql
\l
```

or

```sql
\list
```

---

## 9. Create a Database

```sql
CREATE DATABASE mydatabase;
```

Example:

```sql
CREATE DATABASE shopify_app;
```

---

## 10. Connect to a Database

From terminal:

```bash
psql mydatabase
```

From inside psql:

```sql
\c mydatabase
```

Example:

```sql
\c shopify_app
```

---

## 11. Delete a Database

```sql
DROP DATABASE mydatabase;
```

Example:

```sql
DROP DATABASE shopify_app;
```

> Note: You cannot drop the database you are currently connected to.

---

# User Commands

## 12. Show Current User

```sql
SELECT current_user;
```

---

## 13. List All Users

```sql
\du
```

---

## 14. Create a User

```sql
CREATE USER myuser WITH PASSWORD 'mypassword';
```

---

## 15. Grant Database Access

```sql
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
```

---

# Table Commands

## 16. List Tables

```sql
\dt
```

---

## 17. Create a Table

```sql
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
```

---

## 18. Describe a Table

```sql
\d users
```

---

## 19. Delete a Table

```sql
DROP TABLE users;
```

---

# Data Commands

## 20. Insert Data

```sql
INSERT INTO users (name, email)
VALUES ('John Doe', 'john@example.com');
```

---

## 21. View Data

```sql
SELECT * FROM users;
```

---

## 22. Update Data

```sql
UPDATE users
SET email = 'newemail@example.com'
WHERE id = 1;
```

---

## 23. Delete Data

```sql
DELETE FROM users
WHERE id = 1;
```

---

# Useful psql Meta Commands

## List Databases

```sql
\l
```

## List Tables

```sql
\dt
```

## Describe Table Structure

```sql
\d table_name
```

## Show Current Connection

```sql
\conninfo
```

## Show Help

```sql
\?
```

## Exit psql

```sql
\q
```

---

# Typical Workflow

```bash
# Start PostgreSQL
brew services start postgresql

# Connect to PostgreSQL
psql postgres
```

```sql
-- Create database
CREATE DATABASE myapp;

-- Connect to database
\c myapp

-- Create table
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100)
);

-- Insert data
INSERT INTO users (name) VALUES ('Shivaling');

-- View data
SELECT * FROM users;

-- Exit
\q
```

```bash
# Stop PostgreSQL when done
brew services stop postgresql
```
