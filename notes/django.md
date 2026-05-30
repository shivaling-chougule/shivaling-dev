# Django Installation Guide for macOS

## Overview

This guide explains how to install Django on a Mac, create a virtual environment, verify the installation, and start your first Django project.

---

# Step 1: Check Python Installation

Before installing Django, ensure Python 3 is installed.

```bash
python3 --version
```

### Description

Displays the installed Python version.

### Example Output

```text
Python 3.12.4
```

If Python is not installed, download it from:

https://www.python.org/downloads/mac-osx/

---

# Step 2: Create a Project Directory

Create a folder for your Django projects.

```bash
mkdir myproject
cd myproject
```

### Description

* `mkdir myproject` creates a new directory.
* `cd myproject` moves into the directory.

---

# Step 3: Create a Virtual Environment

Create an isolated Python environment.

```bash
python3 -m venv venv
```

### Description

Creates a virtual environment named `venv`.

### Directory Structure

```text
myproject/
└── venv/
```

---

# Step 4: Activate the Virtual Environment

Activate the virtual environment.

```bash
source venv/bin/activate
```

### Description

Activates the virtual environment so packages are installed locally to the project.

### Example Output

```text
(venv) MacBook:myproject user$
```

---

# Step 5: Upgrade pip

Upgrade Python's package manager.

```bash
pip install --upgrade pip
```

### Description

Installs the latest version of pip.

---

# Step 6: Install Django

Install the Django framework.

```bash
pip install django
```

### Description

Downloads and installs Django into the active virtual environment.

---

# Step 7: Verify Django Installation

Check the installed Django version.

```bash
python -m django --version
```

### Description

Displays the currently installed Django version.

### Example Output

```text
5.2.1
```

---

# Alternative Ways to Check Django Version

## Method 1

```bash
python3 -m django --version
```

### Description

Checks Django version using Python 3 directly.

---

## Method 2

Open Python shell:

```bash
python3
```

Then run:

```python
import django
print(django.get_version())
```

### Example Output

```text
5.2.1
```

Exit Python:

```python
exit()
```

---

## Method 3

Using pip:

```bash
pip show django
```

### Description

Displays detailed package information.

### Example Output

```text
Name: Django
Version: 5.2.1
Location: /path/to/site-packages
```

---

## Method 4

List installed packages:

```bash
pip list | grep Django
```

### Example Output

```text
Django 5.2.1
```

---

# Step 8: Create Your First Django Project

Create a Django project.

```bash
django-admin startproject mysite
```

### Description

Creates a new Django project named `mysite`.

### Project Structure

```text
mysite/
├── manage.py
└── mysite/
    ├── settings.py
    ├── urls.py
    ├── asgi.py
    ├── wsgi.py
    └── __init__.py
```

---

# Step 9: Navigate Into the Project

```bash
cd mysite
```

### Description

Moves into the Django project directory.

---

# Step 10: Start the Development Server

Run:

```bash
python manage.py runserver
```

### Description

Starts Django's built-in development server.

### Example Output

```text
Watching for file changes with StatReloader
Starting development server at http://127.0.0.1:8000/
```

Open the following URL in your browser:

```text
http://127.0.0.1:8000/
```

You should see the Django welcome page.

---

# Common Issues

## pip: command not found

Use:

```bash
python3 -m pip install django
```

instead of:

```bash
pip install django
```

---

## Django Not Found

Check whether Django is installed:

```bash
pip list | grep Django
```

or

```bash
pip show django
```

---

# Deactivate Virtual Environment

When finished working, deactivate the virtual environment:

```bash
deactivate
```

### Description

Returns your terminal to the system Python environment.

---

# Quick Command Reference

```bash
# Check Python version
python3 --version

# Create project folder
mkdir myproject
cd myproject

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install Django
pip install django

# Check Django version
python -m django --version

# Create Django project
django-admin startproject mysite

# Enter project
cd mysite

# Run development server
python manage.py runserver

# Deactivate virtual environment
deactivate
```
