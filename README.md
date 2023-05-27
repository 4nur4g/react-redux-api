# React Web App with Redux Toolkit and API Fetching

This is a simple web application built using React, Redux Toolkit, and Next.js. It fetches data from an API and displays it in a list view. The application also includes pagination, a details page, and a responsive UI.

To test the application, you can visit [this link]().

The app uses the following API to fetch user data: https://reqres.in/api/users?page=1&per_page=5

## How it works

- The app has two pages: the index page (`/`) and the detail page (`/[id]`).
- The index page shows a list of users with their name and id. It also has a load more button to fetch more users from the API.
- The detail page shows the full information of a single user, including their first name, last name, email, and avatar. It also has a back button to return to the index page.
- The app uses Redux Toolkit to manage the state of the user data. It defines a slice (`userSlice`) that contains the initial state, reducers, and a thunk function for fetching data asynchronously.
- The app uses React Redux hooks (`useSelector` and `useDispatch`) to access and update the state from the components.

## State structure

The state of the user data is defined as follows:

```ts
export interface usersState {
  users: User[];
  status: string;
  error: string | null;
  availablePageData: number[];
  dataLimit: { pages: number | null, limit: number | null };
}
```

## Data Fetching Logic

- When the index page is loaded for the first time, it dispatches two actions:
    - One updates the `pageNo` state with the `page` and `limit` parameters from the API.
    - Another calls the thunk function `fetchUsers` to fetch the user data from the API.
- The thunk function `fetchUsers` checks if the requested page is already available in the `availablePageData` field, used to keep track of pages for whom the data is already called.
    - If not, it makes an API call and updates the `users` and `availablePageData` states with the response data.
    - It also handles the loading and error states using `status` and `error`.
- When the "Load More" button is clicked, it dispatches another action to call the `fetchUsers` thunk function with an incremented page parameter.
    - The thunk function repeats the same logic as before but appends the new data to the existing `users` state instead of replacing it.
- When there is no more data available from the API, the "Load More" button is hidden from the UI.
- When a user item is clicked on the index page, it navigates to the detail page using Next.js dynamic routing and passes the user ID as a query parameter (`[id]`) to the detail page.
- The detail page uses useSelector hook to fetch the user data from the Redux store, which is then filtered using the user ID to obtain relevant data.
- The detail component renders the user data on a card and provides a back button to return to the index page.

## Installation

To run this app locally, follow these steps:

1. Clone this repository: ` git clone https://github.com/example/repo.git`
2. Install the dependencies: `yarn install` or `npm install`
3. Run the development server: `yarn dev` or `npm run dev`
4. Open `http://localhost:3000` in your browser.