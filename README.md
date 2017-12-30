###Introduction

The purpose of this project is to create a companion app for the RPG "Houses of the Blooded". Its major componenets will be: 

* **Creation Sheet** -  Users will be able to create ven character, aspects, provinces, regions, etc. This tool will be a CRUD app for saving user created information as well as viewing it. 

	* *Ven Creation* - Your typical 'character sheet'. This will display User created/entered Ven info as well as allow for updating and saving. 

	* *Province Creation* - This app will create Provinces as well keep track of 

* **Campaign Tool** - This tool is for DMs to keep track of player's season actions. The idea is that the DM will have a 'workbench' to see all of his notes, player's season actions. How far should we go into enforcing the rules?  

* **Wiki** - This will be a encyclopedia of all the user created data. Other DMs could look up other characters, players could easily see what they missed. This will allow users to see all other user created data. 

###Architecture

* **Frontend** - Functional React Compomenets with a Redux state.

* **Backend** - CouchDB, schemaless?

###DevGoals

* Successfully create, save and retrieve a full character sheet from the db
