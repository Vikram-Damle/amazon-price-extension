# Amazon Price Scraper
----------
###### By - Vikram Damle (190123065), Akshat Arun (190101007)

#### Description: 
* A Chrome Extension to scrape selected product prices off of the [Amazon Web Store](amazon.in) and store them for any user.

#### Instructions for installation:
* _Make sure you have node 14.x and npm installed_
* Clone the repository to a directory of your choice.
* In the root directory, run ```npm install``` and ```npm start``` to start up the backend server.
* In a Chrome window, navigate to the *Manage Extensions* page and enable *Developer Mode*.

![image](https://user-images.githubusercontent.com/75017128/126534493-290bb5c3-2ea4-4274-9263-63adf80cd4c3.png)

* Click on the *Load Unpacked* button and select the root directory of the repository.
* The extension should now appear in the extensions dropdown on the right.

#### Usage: 
##### First Access
* The popup is accessible from the Extensions menu - Click on the button ```Amazon Price Scraper``` to open the menu.

![image](https://user-images.githubusercontent.com/75017128/126535054-5fec5ea4-5627-4a28-9dc0-51531241168e.png)

* If this is your first time using the extension, click on the ```New User? Signup!``` button to create an account

![image](https://user-images.githubusercontent.com/75017128/126535171-28dff480-87f8-4c80-a347-fd41fe515fc2.png)

* Be sure to enter a valid Email ID and a password between 6 and 30 characters.

##### Main Menu

![image](https://user-images.githubusercontent.com/75017128/126536495-448eb513-7c87-4209-a1ee-6c48b04709fc.png)

* Users can add new items to their tracked lists as well as view their list of currently tracked items.
* To track a new item, navigate to the corresponding product page on amazon.in and click on the _Track Current Item_ button.
* To view the list of currently tracked items, click on the _Show Tracked Items_ button.

![image](https://user-images.githubusercontent.com/75017128/126537087-cbd7bc06-4b15-4b7b-9542-8dc24d7f4218.png)


#### Technologies Used
* AngularJS - Front end extension logic and user interface.
* NodeJS  - Backend business logic and communication between the front end and the database.
* MongoDB - A NoSQL database to store user and product info.

----------

