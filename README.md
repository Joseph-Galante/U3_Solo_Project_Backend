# WorkBear - Project Management App

### Deployed Link
**TBD**

## Overview
Introducing WorkBear, an organized, accessible, and intuitive application that helps ensure project teams work effectively and collaboratively while hashing out those big league projects. WorkBear streamlines all of the project planning and management so your team can focus on what really makes a project successful, the project. Rather than worrying about who's doing what, what they should be doing, or when it's expected to be finished, WorkBear allows team members to stay on track and stay up to date on all of the inner workings of the project. And the best part...it's 100% free!

## Wireframes
ERD

![wireframe](https://i.imgur.com/p1ghpIx.png)

Home

![wireframe](https://i.imgur.com/3ILMqXW.png)

Profile

![wireframe](https://i.imgur.com/Wfw3P8i.png)

Create Project

![wireframe](https://i.imgur.com/4nIkn4m.png)

Project Details

![wireframe](https://i.imgur.com/nHGnm0H.png)


## User Stories
1. User is brought to homepage on page load.
2. User must signup or login to access site's features.
3. Once logged in, user may access their profile which shows their account information, which can be edited, as well as any projects/tasks they are working on.
4. Once logged in, user may create a project and invite collaborators. The project owner may also edit or delete the project at any time.
5. As a project owner, user may add tasks to a project and assign any collaborators to any task, even if already assigned to someone, via a dropdown menu.
6. As a project collaborator, user may add tasks to a project and assign themselves to any given task not already assigned.
7. As a project collaborator, user may comment on tasks and is able to edit or delete that comment.
8. Once assigned to a task, user may update task to reflect current work progress.

## Routes
| Request   | Route URL  | Description   | Returns   |
| --------- | --------- | ------------- | --------- |
|   POST    | /users    | user signup   | new user
|   POST    | /users/login | user login | user
|   GET     | /users/profile | user profile | user
|   PUT     | /users/profile | user update | updated user
|   GET     | /users/invite | get project invites | project invites
|   DELETE  | /users/invite/:id | reply to invite | joined project (accept) or declined message (decline)
|   POST    | /projects | create project | new project
|   GET     | /projects | get projects | all projects
|   GET     | /projects/:id | get one project | project with users and tasks with users
|   PUT     | /projects/:id | update project | updated project
|   POST    | /projects/:id/collaborators | invite collaborator | project with users
|   DELETE  | /projects/:id/collaborators | remove collaborator | project with new users
|   DELETE  | /projects/:id | delete project | success message
|   POST    | /projects/:id/tasks | create project task | new task
|   GET     | /tasks/:id | get one task | task with user, project, and comments
|   POST    | /tasks/:id/assign | assign user to task | assigned task
|   PUT     | /tasks/:id | update task | updated task
|   DELETE  | /tasks/:id | delete task | success message
|   GET     | /comments/:id | get one comment | comment
|   PUT     | /comments/:id | update comment | updated comment
|   DELETE  | /comments/:id | delete comment | success message
    
## MVP Goals
- User creation and auth
- Project creation and mangement
- Able to invite collaborators to work on project
- Project team able to set tasks for projects
- Project team able to comment on and update tasks

## Stretch Goals
- Native messaging app for project teams
- Automated work progress tracker
- More in-depth details on task updates (pushed to git, needs work in areas, etc)
- See urgent tasks (tasks that are due soon)
