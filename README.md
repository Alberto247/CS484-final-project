# Sneakerscanner
## What does our application do?
Sneakers reselling is a growing business online.
As far as we know, the current market is splitted between multiple vendors online, each using its own website or hosted on different websites.
Our idea is to create a web app able to quickly search for a sneaker on multiple website and provide the user with the best offers currently available. 
These websites are often hard to find, and sparse over the internet, our app would reunite all of the offers in a simple web interface, leading the users to the original website for purchase.

## How is it different from a CRUD app?
It needs to interface with multiple APIs from different websites, probably mantain a real-time database to speed up queries, and allow the user to receive notifications throught mail if a certain item is found.
The user has also the possibility to create a list of favourite sneakers, and receive notification via mail if the price of those items changes. 

## Security and privacy
While our web app would not have sensitive data, it should keep the users accounts and the vendor data secure.

## Link to the site
[Sneakerscanner](https://fluffy-dusk-8cf61e.netlify.app/)

## Tech stack diagram
![image](cs484.jpg)

## Minimum viable product
The first version of our app offers the following features:
- The results are taken from [sneaks-api](https://npm.io/package/sneaks-api) and [Klekt](https://www.klekt.com/us)
- Home page showing the most popular sneakers
- Clicking on a sneaker opens another page with a description of the sneaker and links to the sites that purchase it with the cost
- Navbar allows to login (Google, Facebook or new account) and to search for a sneaker
- Clicking on the name of the site in the navbar returns to the Home Page
- When a search is performed pagination appears and allows to change result pages

## Final product
In the final version of our app we would like to add/enhance the following functionalities:
- Check that the results returned are all sneakers
- Enhance layout of the site
- A user can create its own list of favourite shoes
- A user can be notified by email when the price goes under a certain threshold 
- Add [Ebay](https://developer.ebay.com/develop/apis) APIs to have more results