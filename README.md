# Module_03_PHIBOG534_jse2407_c_Phillip-Bogopane_JSF02

# SwiftCart

SwiftCart is a sleek and user-friendly e-commerce application that allows users to browse, sort, and filter products. It provides a detailed view of each product and ensures a seamless shopping experience across all devices.

## Overview

SwiftCart offers a grid view of product cards where users can easily view essential product details such as images, titles, prices, and categories. Users can navigate to a detailed view of a product to see more information, including its description, rating, and reviews. The application is designed to be responsive, delivering an optimal experience on both mobile and desktop devices.

## Technologies Used

- **Frontend**: Svelte, HTML, CSS, JavaScript
- **Backend/API**: [Fake Store API](https://fakestoreapi.com/)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Version Control**: Git

## Installation and Setup

To run the SwiftCart project locally, you'll need to have the following installed on your system:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager, comes with Node.js)
- **Visual Studio Code** (or any code editor of your choice)

### Steps to Set Up the Project

1. **Clone the Repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/your-username/swiftcart.git


## Usage

1. **Browse Products**: Users can view a grid of product cards, each displaying an image, title, price, and category.
2. **View Product Details**: Click on a product card to see detailed information, including a description, larger image, price, category, rating, and reviews.
3. **Filter and Sort**: Users can filter products by category and sort them by price (lowest to highest and vice versa).
4. **Responsive Design**: The app is fully responsive and adapts seamlessly to different screen sizes.

## Styling Elements

SwiftCart uses Tailwind CSS for a clean and modern design. The application features a cohesive theme with a focus on usability and accessibility, ensuring users can easily find and interact with products.

## Challenges Faced

- **State Management**: Maintaining filter and sort states when navigating between product views and ensuring these states persist without using local storage.
- **API Integration**: Handling dynamic data loading from the API and managing loading states effectively.
- **Responsive Design**: Ensuring a consistent and intuitive user experience across various devices and screen sizes.

## Areas for Improvement

- **Enhanced Filtering**: Additional filtering options such as brand or price range sliders could enhance user experience.
- **User Authentication**: Implementing user accounts for personalized experiences and wish lists.
- **Performance Optimization**: Further optimization for faster loading times and smoother transitions.

## Reflections

Creating SwiftCart was an enriching experience that deepened my understanding of modern web development practices, particularly in state management and responsive design. The project emphasized the importance of user-centric design and the role of effective API integration in delivering dynamic content.

## User Stories

- As a user, I see a grid of cards.
- As a user, I see an image of the product when browsing.
- As a user, I see a title of the product when browsing.
- As a user, I see the price of the product when browsing.
- As a user, I see a category that the product belongs to when browsing.
- As a user, I am able to navigate to a detailed view of the product (navigation only).
- As a user, I can see the title of the product in the detailed product page.
- As a user, I can see the description of the product in the detailed product page.
- As a user, I can see an image of the product in the detailed product page.
- As a user, I can see the price of the product in the detailed product page.
- As a user, I can see the category of the product in the detailed product page.
- As a user, I can see the rating & number of reviews for the product in the detailed product page.
- As a user, I am able to go back to the products grid/list page from a detailed product view.
- All shop data is loaded via a fetch call from the API (Note no shop data should be hardcoded in the application).
- When viewing a specific product, data is loaded via fetch from the individual product endpoint.
- There is a loading state while initial data is being loaded.
- There is a loading state while new data is being loaded.
- As a user, I am able to filter products by category (categories fetched from the API).
- As a user, I am able to sort products by lowest & highest price (both required).
- As a user, I am able to go back to default filtering and sorting without refreshing the app (both required).
- As a user, I should still see my applied filters and sorting after navigating to a detailed view and returning to the home page (do not use local storage for this).

## Project Highlights

- The application exhibits a stunning and professional design that enhances the user experience.
- The layout is visually appealing, with a clear, cohesive theme.
- Navigation and user interaction are seamless and intuitive, providing a superb user experience.
- Users can easily find what they need with minimal effort, and the application’s design supports efficient task completion.
- The application is fully responsive across all tested screen sizes and devices. Elements adjust seamlessly to different screen widths and orientations, providing an optimal user experience on both mobile and desktop.
- The project must load and function without ANY bugs (Completed user stories possess no bugs whatsoever).
- The project’s documentation is thorough, well-structured, and highly informative.
- The project is well-documented using JSDoc.



