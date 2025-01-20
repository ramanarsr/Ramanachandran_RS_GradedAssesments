
# SQLite Exercises: Employee Management System

## Introduction
This project involves working with an SQLite database containing two tables: `Employees` and `Departments`. 
The goal is to execute various queries to analyze and manipulate the data using the SQLite command-line interface.

---

## Prerequisites
1. SQLite installed on your system. You can check by running:
   ```bash
   sqlite3 --version
   ```
2. Basic knowledge of SQL commands and SQLite syntax.

---

## Setup Instructions

### Step 1: Create the Database
1. Open a terminal or command prompt.
2. Create a new SQLite database by running:
   ```bash
   sqlite3 company.db
   ```

### Step 2: Create Tables
Inside the SQLite prompt, create the `Employees` and `Departments` tables using the following commands:

#### Create the `Employees` Table
```sql
CREATE TABLE Employees (
    EmployeeID INTEGER PRIMARY KEY,
    Name TEXT,
    DepartmentID INTEGER,
    Salary INTEGER,
    HireDate TEXT
);
```

#### Create the `Departments` Table
```sql
CREATE TABLE Departments (
    DepartmentID INTEGER PRIMARY KEY,
    DepartmentName TEXT
);
```

### Step 3: Insert Data
Insert data into the tables using these commands:

#### Insert Data into `Employees`
```sql
INSERT INTO Employees (EmployeeID, Name, DepartmentID, Salary, HireDate) VALUES
(1, 'Alice', 101, 70000, '2021-01-15'),
(2, 'Bob', 102, 60000, '2020-03-10'),
(3, 'Charlie', 101, 80000, '2022-05-20'),
(4, 'Diana', 103, 75000, '2019-07-25');
```

#### Insert Data into `Departments`
```sql
INSERT INTO Departments (DepartmentID, DepartmentName) VALUES
(101, 'HR'),
(102, 'IT'),
(103, 'Finance');
```

---

## Exercises and Queries

### Q1: List Names of Employees Hired After January 1, 2021
```sql
SELECT Name FROM Employees WHERE HireDate > '2021-01-01';
```

### Q2: Calculate the Average Salary of Employees in Each Department
```sql
SELECT DepartmentID, AVG(Salary) AS AverageSalary FROM Employees GROUP BY DepartmentID;
```

### Q3: Find the Department with the Highest Total Salary
```sql
SELECT DepartmentName
FROM Departments
JOIN Employees ON Departments.DepartmentID = Employees.DepartmentID
GROUP BY Departments.DepartmentID
ORDER BY SUM(Employees.Salary) DESC
LIMIT 1;
```

### Q4: List All Departments with No Employees Assigned
```sql
SELECT DepartmentName
FROM Departments
LEFT JOIN Employees ON Departments.DepartmentID = Employees.DepartmentID
WHERE Employees.EmployeeID IS NULL;
```

### Q5: Fetch All Employee Details with Their Department Names
```sql
SELECT Employees.*, Departments.DepartmentName
FROM Employees
JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;
```

---

## Execution Instructions

### Option 1: Run Commands Manually
1. Enter the SQLite prompt:
   ```bash
   sqlite3 company.db
   ```
2. Execute each query manually.

### Option 2: Use an SQL Script
1. Save the setup and queries in a file, e.g., `setup.sql`.
2. Run the file in SQLite:
   ```bash
   sqlite3 company.db < setup.sql
   ```

---

## Expected Outputs

### Q1: Employees Hired After January 1, 2021
| Name    |
|---------|
| Charlie |

### Q2: Average Salary of Each Department
| DepartmentID | AverageSalary |
|--------------|---------------|
| 101          | 75000         |
| 102          | 60000         |
| 103          | 75000         |

### Q3: Department with Highest Total Salary
| DepartmentName |
|----------------|
| HR             |

### Q4: Departments with No Employees
| DepartmentName |
|----------------|
| None           |

### Q5: Employee Details with Department Names
| EmployeeID | Name    | DepartmentID | Salary | HireDate    | DepartmentName |
|------------|---------|--------------|--------|-------------|----------------|
| 1          | Alice   | 101          | 70000  | 2021-01-15  | HR             |
| 2          | Bob     | 102          | 60000  | 2020-03-10  | IT             |
| 3          | Charlie | 101          | 80000  | 2022-05-20  | HR             |
| 4          | Diana   | 103          | 75000  | 2019-07-25  | Finance        |

---

## Notes
- To exit the SQLite prompt, type:
  ```bash
  .exit
  ```

- If any errors occur, verify your SQL syntax and ensure the database file exists in the correct directory.
