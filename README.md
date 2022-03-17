# Popcorn Club

[View Demo here](https://popcorn-club.netlify.app/)

![Popcorn Club Screen Shot]()

A redesigned and refactored movie library built with React JS using [The Movie Database API](https://www.themoviedb.org/documentation/api). For an older version, take a look [here](https://github.com/yumietzk/popcorn-club-old).  
Users can search movies and TV shows and get data by different genres and categories. Users can also see a movie and TV show’s details, trailer, and official webpage.  
I implemented Google OAuth 2.0 for user authentication. When users sign in, they can save their favorite movies and TV shows. I created a rest api with JSON Server run on Heroku to save and fetch data stored in favorite section.

## Key Features

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

## Contact

Yumie Tsuzuki - yumie.tsuzuki@gmail.com
