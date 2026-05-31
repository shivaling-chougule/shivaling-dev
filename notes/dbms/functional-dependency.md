# Functional Dependency (FD) in DBMS

## Why Do We Need Functional Dependency?

Functional Dependency helps us understand the relationship between attributes in a database table. It is used to:

1. **Reduce Data Redundancy**

   * Prevents storing the same information multiple times.

2. **Maintain Data Consistency**

   * Ensures that related data remains accurate and synchronized.

3. **Identify Candidate Keys**

   * Helps determine which attributes can uniquely identify a record.

4. **Normalize Database Tables**

   * Used in normalization (1NF, 2NF, 3NF, BCNF) to remove anomalies.

5. **Prevent Data Anomalies**

   * Avoids:

     * Insert Anomalies
     * Update Anomalies
     * Delete Anomalies

---

## What is Functional Dependency?

A Functional Dependency (FD) is a relationship between two sets of attributes in a table.

It states that:

> If the value of attribute A determines exactly one value of attribute B, then B is functionally dependent on A.

### Notation

```text
A → B
```

Read as:

```text
A determines B
```

or

```text
B is functionally dependent on A
```

---

## Example 1: Student Table

| Student_ID | Student_Name | Email                                     |
| ---------- | ------------ | ----------------------------------------- |
| 101        | Rahul        | [rahul@gmail.com](mailto:rahul@gmail.com) |
| 102        | Priya        | [priya@gmail.com](mailto:priya@gmail.com) |
| 103        | Amit         | [amit@gmail.com](mailto:amit@gmail.com)   |

### Functional Dependencies

```text
Student_ID → Student_Name
Student_ID → Email
```

### Explanation

Each `Student_ID` uniquely identifies a student.

For example:

```text
101 → Rahul
101 → rahul@gmail.com
```

Since one Student_ID can have only one Student_Name and one Email, the dependency exists.

---

## Example 2: Employee Table

| Emp_ID | Emp_Name | Department |
| ------ | -------- | ---------- |
| E101   | John     | HR         |
| E102   | Alice    | IT         |
| E103   | Bob      | Finance    |

### Functional Dependencies

```text
Emp_ID → Emp_Name
Emp_ID → Department
```

Because each employee ID belongs to exactly one employee and one department.

---

## Real-Life Example

Consider a university database:

```text
USN → Student_Name
USN → Branch
USN → Email
```

Knowing the USN is enough to determine all other details of a student.

---

## Key Terms

### Determinant

The attribute on the left side of the dependency.

Example:

```text
Student_ID → Email
```

`Student_ID` is the determinant.

### Dependent Attribute

The attribute on the right side of the dependency.

Example:

```text
Student_ID → Email
```

`Email` is dependent on `Student_ID`.

---

## Important Rule

For a dependency:

```text
A → B
```

If two rows have the same value of A, they must have the same value of B.

### Valid Example

| Student_ID | Student_Name |
| ---------- | ------------ |
| 101        | Rahul        |
| 102        | Priya        |

No problem because each Student_ID maps to only one name.

### Invalid Example

| Student_ID | Student_Name |
| ---------- | ------------ |
| 101        | Rahul        |
| 101        | Amit         |

Here:

```text
101 → Rahul
101 → Amit
```

One Student_ID determines two different names, so the functional dependency is violated.

---

## Summary

* Functional Dependency describes relationships between attributes.
* Notation:

```text
A → B
```

* It means A uniquely determines B.
* Functional Dependency helps:

  * Reduce redundancy
  * Maintain consistency
  * Find keys
  * Perform normalization
  * Eliminate anomalies
* Example:

```text
Student_ID → Student_Name
Student_ID → Email
```

Because one Student_ID corresponds to exactly one student and one email.
