# WorkBear - Project Management App

### Deployed Link
**TBD**

## Overview
Introducing WorkBear, an organized, accessible, and intuitive application that helps ensure project teams work effectively and collaboratively while hashing out those big league projects. WorkBear streamlines all of the project planning and management so your team can focus on what really makes a project successful, the project. Rather than worrying about who's doing what, what they should be doing, or when it's expected to be finished, WorkBear allows team members to stay on track and stay up to date on all of the inner workings of the project. And the best part...it's 100% free!

## Wireframes
ERD

![wireframe](https://i.imgur.com/M8W1hEc.png?1)

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
| Request   | Route URL  | Description   |
| --------- | --------- | ------------- |
|   POST    | /users    | user signup   
|   POST    | /users/login | user login 
|   GET     | /users/profile | user profile
|   PUT     | /users/profile | user update
|   POST    | /projects | create project
|   GET     | /projects | get projects
|   GET     | /projects/:id | get one project
|   PUT     | /projects/:id | update project
|   POST    | /projects/:id/collaborators | add collaborator
|   DELETE    | /projects/:projectId/collaborators/:userId | remove collaborator
|   DELETE  | /projects/:id | delete project
|   POST    | /projects/:id/tasks | create project task
|   GET     | /projects/:id/tasks | get project tasks
|   GET     | /tasks/:id | get one task
|   PUT     | /tasks/:id | update task
|   DELETE  | /tasks/:id | delete task
|   GET     | /tasks/:id/comments | get task comments
|   GET     | /comments/:id | get one comment
|   PUT     | /comments/:id | update comment
|   DELETE  | /comments/:id | delete comment
    
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
