# Test-CM

## Goals
- Show a list of users
    - Avatar is not provided by [typicode](s https://jsonplaceholder.typicode.com/users), two were created
    - `hasCompany` as boolean is always true (all users have company); name was displayed instead
- Basic functionalities
    - All user details can be edited except avatar and tasks (to keep simplicity, the form has no validation or feedback of any kind)
    -  Also, address can't be edited but technically it's similar to `company`.
- Bonus
    - This document serves as a simple documentation

## Font & Tools
- Red Hat Text (Google Fonts)
- bootstrap@5.1.3
- react-bootstrap
- axios

## Documentation

### App.js
Gets and manages data for users using `localStorage`; allows refresh users

### Usertable.js
Displays users

### Sidebar.js
Shows user details and allows deleting the user

### Usertable.js
Alllows editing the user

### Preview
![preview.png](preview.png)
