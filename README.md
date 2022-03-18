# Popcorn Club

[View Demo here](https://popcorn-club.netlify.app/)

A redesigned and refactored movie library built with React JS using [The Movie Database API](https://www.themoviedb.org/documentation/api). For an older version, take a look [here](https://github.com/yumietzk/popcorn-club-old).  
Users can search movies and TV shows and get data by different genres and categories. Users can also see a movie and TV show’s details, movie trailer, and official webpage.  
I implemented Google OAuth 2.0 for user authentication. When users sign in, they can save their favorite movies and TV shows. I created a REST API with JSON Server run on Heroku to save and fetch data stored in favorite.

## Features

### Search and sort data by categories  
Users can search data by changing genres and sort data by title name, release date and rating. Users can also decide how many data they want to get.  
![Search by category](./assets/searchByCategory.gif)

### See detail  
Users can see the detail of movies and TV shows such as movie trailer, website, casts, reviews and related shows. Users can also jump to a detail page of casts. For TV shows, users can see all seasons and episodes' details. And more to explore!  
![See detail](./assets/seeDetail.gif)

### Search  
Users can search both movies and TV shows related to a term submitted in a search input.  
![Search](./assets/search.gif)

### Sign In & Sign Out  
After users sign in, they can save their favorite movies or TV shows by clicking a favorite heart button in each movie and TV show's detail page, and can see the saved data in a favorite page. Without signing in, the favorite button doesn't show up and they can't save data.  
![Sign in](./assets/sigin.gif)

## Built With

- React JS
- Redux
- React Router
- Redux Thunk
- CSS Modules

## Getting Started

### Prerequisites

Install npm.

- npm
  ```
  npm install npm@latest -g
  ```

### Installation

1. Get an API key at [The Movie Database API](https://www.themoviedb.org/documentation/api).
2. Get a client ID at [Google Cloud Platform](https://console.cloud.google.com/).
3. Clone the repo.
   ```
   git clone https://github.com/yumietzk/popcorn-club.git
   ```
4. Install NPM packages.
   ```
   npm install
   ```
5. Create your API key and proxy in a .env file.
   ```
   REACT_APP_API_KEY=yourapikey
   REACT_APP_GoogleAuth_ClientID=yourclientID
   ```
6. Start the server.
   ```
   npm run start
   ```

### Testing

- Run tests.
  ```
  npm run test
  ```

## Contact

Yumie Tsuzuki - yumie.tsuzuki@gmail.com
