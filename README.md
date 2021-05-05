# WorkBear - Project Management App

### Deployed Link
https://still-stream-33780.herokuapp.com/

## Overview
Introducing WorkBear, an organized, accessible, and intuitive application that helps ensure project teams work effectively and collaboratively while hashing out those big league projects. WorkBear streamlines all of the project planning and management so your team can focus on what really makes a project successful, the project. Rather than worrying about who's doing what, what they should be doing, or when it's expected to be finished, WorkBear allows team members to stay on track and stay up to date on all of the inner workings of the project. And the best part...it's 100% free!

## Wireframes

ERD

![wireframe](https://i.imgur.com/p1ghpIx.png)

Home

![wireframe](https://i.imgur.com/3ILMqXW.png)

Profile

![wireframe](https://i.imgur.com/2sFe1vl.png)

Create Project

![wireframe](https://i.imgur.com/PrId8kg.png)

Project Details

![wireframe](https://i.imgur.com/nHGnm0H.png)

Task Details

![wireframe](https://i.imgur.com/KcCwSiO.png)


## User Stories
1. User is brought to homepage on page load.
2. User must signup or login to access site's features.
3. Once logged in, user may access their profile which shows their account information, which can be edited, as well as any projects/tasks they are working on and invites they have.
4. Once logged in, user may create a project and invite collaborators.
5. As a project owner, user may add tasks to a project and assign any collaborators to any task, even if already assigned to someone, via a dropdown menu.
6. As a project collaborator, user may add tasks to a project and assign themselves to any given task not already assigned.
7. As a project collaborator, user may comment on tasks.

## Routes
| Request   | Route URL  | Description   | Returns   |
| --------- | --------- | ------------- | --------- |
|   POST    | /users    | user signup   | new user
|   POST    | /users/login | user login | user
|   GET     | /users/verify | verify user | verified user or 'user not found' message
|   GET     | /users/profile | user profile | user
|   PUT     | /users/profile | user update | updated user
|   GET     | /users/invite | get project invites | project invites
|   DELETE  | /users/invite/:id | reply to invite | joined project (accept) or declined message (decline)
|   POST    | /projects | create project | new project
|   GET     | /projects | get user's projects | user's projects
|   GET     | /projects/:id | get one project | project with users and tasks with users
|   POST    | /projects/:id/collaborators | invite collaborator | project with users
|   POST    | /projects/:id/tasks | create project task | new task
|   GET     | /tasks/:id | get one task | task with user, project, and comments
|   POST    | /tasks/:id/assign | assign user to task | assigned task
|   POST    | /tasks/:id/comments | write comment | new comment
|   GET     | /comments/:id | get one comment | comment
    
## MVP Goals
- User creation and auth
- Project creation and management
- Able to invite collaborators to work on project
- Project team able to set tasks for projects
- Project team able to comment on and update tasks

## Stretch Goals
- CSS
- See urgent tasks (tasks that are due soon)
- Automated work progress tracker
- More in-depth details on task updates (pushed to git, needs work in areas, etc)
- Native messaging app for project teams
