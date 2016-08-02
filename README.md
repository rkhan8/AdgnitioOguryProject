# Adgnitio Project
Data Solutions tool


Introduction
-------------

This program is used in order to prepare our DMP delivery.
Thanks to this program, we are able to generate a scoring settings file, an essential file to establish some pattern matching with other data, and also to make sence, to interprate and to predict each delivery

> **Note:**

> - User need to have NodeJS installed on his computer
> - User has to launch the file **index.js**

### Just tell me what to do
1. Fork the project https://github.com/rkhan8/AdgnitioProject.git via github
2. Clone the project git clone https://github.com/YOUR_USERNAME/AdgnitioProject.git
3. Install NodeJS
4. Follow the steps.
5. Don't forget to commit and push



### Steps to do


#### Step 1 - Launch program

Once NodeJS is installed in your computer, to launch the pogram you just have to execute this command line into your terminal

> node index.js


#### Step 2 - generate a scoring_settings file

In order to prepare each DMP delivery, we need to generate a scoring settings file which will contain categorized data of some url and package name according to some respective category.
To generate this file, user has to go to the section **scoring_settings**.

> **how does it work ?:**

> - First of all, user has to put each url and package name that he has collected into the csv file called **TestAll.csv**, located at the repository **CSV**
> - Once it has been done, he just have to drag and dop it into the webpage
> - Finally, to generate the scoring_settings file, user has to click the button **Generate**
> - User can find the generated file into the local respository of the project



#### Step 3 - Visualize data volume

For each DMP delivery, it's important to visualize data that have been generated in order to interprate and predict the next delivery.
On the section **Visualize** user can see all data volume of each category and each country.

> **how does it work ?:**

> - The files that we are going to use are **part-0000.**. There is 2 **part-000** file : one containing old volunme of the previous DMP delivery, the second new volume of the atual delivery  
> - **part-0000** file of old volume, has to be placed in the repository **/Volumes/old/volume**. **part-0000** file of new volume, has to be placed in the repository **/Volumes/new/volume**.
> - Once thy have placed, the program will collect data, do some matematical calculation and make some cross validation with the file **ListCat.csv**, located at the repository **/CSV**.
> - The map is used to visualized better our data volume on esch country.


Status
-------------

**Not finished, beta version**.
**Working status**
