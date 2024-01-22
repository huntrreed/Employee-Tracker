DELETE FROM employee;
DELETE FROM role;
DELETE FROM department;


INSERT INTO Department (name)
VALUES
    ('Engineering'),
    ('Human Resources'),
    ('Finance'),
    ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 70000, 1),
    ('HR Manager', 65000, 2),
    ('Accountant', 55000, 3),
    ('Sales Specialist', 50000, 4),
    ('Sales Manager', 60000, 4),
    ('Project Manager', 75000, 1),
    ('Data Analyst', 68000, 1),
    ('Customer Service Rep', 45000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
/*managers*/
    ('John', 'Doe', 2, NULL),      -- HR Manager
    ('Alice', 'Johnson', 3, NULL), -- Accountant, head of Finance
    ('Mark', 'Smith', 5, NULL),    -- Sales Manager
    ('Jane', 'Davis', 6, NULL);    -- Project Manager

/*other employees*/

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Emily', 'White', 1, 4),
    ('David', 'Brown', 7, 4),
    ('Sarah', 'Miller', 8, 3),
    ('James', 'Wilson', 4, 3),
    ('Emma', 'Taylor', 3, 1),
    ('Michael', 'Harris', 1, 4),
    ('Olivia', 'Martin', 7, 4),
    ('Daniel', 'Lee', 8, 3),
    ('Liam', 'Garcia', 4, 3),
    ('Sophia', 'Lopez', 3, 2),
    ('Ethan', 'Martinez', 1, 4),
    ('Isabella', 'Rodriguez', 7, 4),
    ('Jacob', 'Lee', 8, 3),
    ('Charlotte', 'King', 4, 3),
    ('Aiden', 'Wright', 3, 2),
    ('Zoe', 'Hill', 1, 4),
    ('Benjamin', 'Scott', 7, 4),
    ('Eleanor', 'Green', 8, 3),
    ('William', 'Adams', 4, 3),
    ('Lucas', 'Nelson', 3, 2),
    ('Chloe', 'Baker', 1, 4),
    ('Alexander', 'Carter', 7, 4),
    ('Mia', 'Mitchell', 8, 3);