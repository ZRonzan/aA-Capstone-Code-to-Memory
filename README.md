# Code-to-Memory

Code-to-Memory is a website clone, inspired by brainscape, centered around the idea of coding related flashcards (although the app does not epecifically limit a user to make their classes, decks and flashcards specifically related to coding topics. This app will allow a user to create classes on any topic with a collection of decks related to the class, and each deck can contain any number of user made cards containing questions and their respective answers. The idea of this app is to be a study aid for users to have all of their materials organized into different classes and studied until they feel confident in their understanding of the topics. The current functionality is purely user driven, with all decks and classes being created are only viewable to the user that created the class.

**Live Site:** [Code-to-Memory](https://code-to-memory.herokuapp.com/)

## Wiki Links
- [API Documentation](https://github.com/ZRonzan/aA-Capstone-Code-to-Memory/wiki/API-Routes)
- [Database Schema](https://github.com/ZRonzan/aA-Capstone-Code-to-Memory/wiki/Database-Schema)
- [Feature List](https://github.com/ZRonzan/aA-Capstone-Code-to-Memory/wiki/Feature-List)
- [User Stories](https://github.com/ZRonzan/aA-Capstone-Code-to-Memory/wiki/User-Stories)

## Tech Stack

### Frameworks, Platforms, and Libraries:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
 ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Database:

![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Hosting:

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Landing Page
Users will be greeted with a splash page upon arriving at the website. They will either need to sign up or log in prior to accessing any other area of this application.

![01-splash-page](https://user-images.githubusercontent.com/100141010/189431403-b14234e7-5dbe-440b-abf2-ab6d485c1121.png)
![02-signup](https://user-images.githubusercontent.com/100141010/189431596-64a1c803-77aa-44bf-90e6-cc49a2505121.png)
![03-login](https://user-images.githubusercontent.com/100141010/189431599-a7102a70-e1e9-4260-90cf-de6b0d250daf.png)

## Dashboard Page
The dashboard page will contain a list of user created classes and present the user with their most recently created class (if they have one).

![04-dashboard](https://user-images.githubusercontent.com/100141010/189431587-9f58401d-1dda-4d6a-a4be-9a9b02c2ee88.png)

## Class Details Page
When a user first signs up, they will be redirected to their dashboard. This will be devoid of classes and ready for the user to get started on creating their own study materials. clicking the "+" icon on the sidebar will open up the class creation form and request a name for your new class. There is some additional functionality that will try to give your class an appropriate icon based on the name. So try to give your class a specific topic (Python, C++, HTML5) to cover and perhaps you'll see a fancy new icon next to it when you log in!

![05-create-new-class](https://user-images.githubusercontent.com/100141010/189431620-ea18431b-bad8-4603-8869-700cd0dd6c61.png)

Users can also edit their classes to contain more information specific to that class. This may help you keep track of what each deck covers (without needing to manually check them all) or even just a quick summary of the key lessons learned. It is completely optional, and if the user is not inclined to provide these details, they don't have to.

![06-class-details-page](https://user-images.githubusercontent.com/100141010/189431627-511d3145-bfd1-4a98-bf03-4125a28f5838.png)

![11-edit-deck-form](https://user-images.githubusercontent.com/100141010/189431799-22daec57-5da0-4f2e-afb7-e33b3696fe38.png)

## Decks Page
Users can view the cards that are part of a deck by clicking on the deck from the class page. this will then allow the user to view the study page, or to preview all cards of a deck and add cards or edit them to the user's liking.

![07-deck-browse-page](https://user-images.githubusercontent.com/100141010/189431671-f8277dbb-51d5-49f5-9ce0-30a3059264cd.png)
![08-deck-preview-page](https://user-images.githubusercontent.com/100141010/189431679-98ffa3fa-527b-433b-9a08-52ce0eb305e1.png)

## Card Mastery scoring System and Total Mastery
Users can study on the Browse/Study tab when insode of a deck. they can navigate to a card of their choosing and click the button to reveal the answer. From there, they can then give a rating for the card which will be stored and used for determining the class mastery when back on the class page.

![09-deck-mastery-score](https://user-images.githubusercontent.com/100141010/189431823-46a81ec7-f6c2-4281-82df-106450eb3939.png)

Users also have the ability to reset their progress on the deck page if they would like to start fresh.

![10-reset-deck-mastery](https://user-images.githubusercontent.com/100141010/189431828-4269d161-e883-4f35-9c2d-3fb6718cd421.png)

## 404 Page
![15-404-page](https://user-images.githubusercontent.com/100141010/189431940-85fb6013-d805-4af1-bb9f-476646ed8ea3.png)

## Run Locally

- Clone the repo
- Open up two terminals, one for the backend, and one for the frontend
- In the first terminal, in the root folder, run pipenv install to install the necessary dependencies, and then run pipenv run flask run
- In the second terminal, cd into the react-app folder, run npm install to install the necessary dependencies, and then run npm start.


### Environment Variables

To run this project, you need to add the following enviroment variables to your .env file in your root folder.

```
DATABASE_URL=sqlite:///dev.db
SECRET_KEY=«generate_strong_secret_here»
```

## To-do-list

- Adding the ability for users to view and study other people's created classes/decks/flashcards
- Being able to search for classes by classname
- Adding the ability to like/dislike other user classes so the application can recommend classes based on total likes
