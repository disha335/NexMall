<p>This project is a robust e-commerce platform that provides users with a seamless online shopping experience. It includes features for browsing products, managing a cart, placing orders, and an admin panel for managing products and their categories.</p>

<h1>Features</h1>
<h4>User Features</h4>
<ul>
  <li><b>Browse Products:</b> View detailed information about products, including images, prices, and descriptions</li>
  <li><b>Search and Filters:</b> Search for products and filter them by price range, and newly added.</li>
  <li><b>User Authentication:</b> Secure user registration, login, and logout functionality.</li>
  <li><b>Shopping Cart: </b>Add and remove products in the cart.</li>
  <li><b>Wishlist Option: </b> Add and remove products in the wishlist</li>
  <li><b>Order Placement: </b> Complete orders with card payment</li>
</ul>

![image](https://github.com/user-attachments/assets/b0cb0f6e-2efd-4426-afd3-aff61811aba5)

Log In as user -
email - hello567@gmail.com
password - hello123

<h4>Admin Features</h4>
<ul>
  <li><b>Add, Update or Delete Proucts</b> Admins can create products, delete or update them</li>
  <li><b>Add, Update or Delete Categories</b> Admins can create categories of products, delete or update them</li>
  <li><b>Search and Filters:</b> Admins can search for products and filter them</li>
</ul>

![image](https://github.com/user-attachments/assets/d302cdbd-1e18-42bc-baff-6f17e7453035)

Log In as Admin -
email - admin@gmail.com
password - Admin#123

<h1>Technologies Used</h1>
<ul>
  <li><b>Frontend - </b> React</li>
  <li><b>Backend - </b> Node.js with express</li>
  <li><b>Database- </b>MongoDB</li>
</ul>

<h2>Steps to Run Locally</h2>
<ol>
  <li>
    <strong>Clone the repository:</strong> 
    <pre><code>git clone https://github.com/disha335/NexMall.git</code></pre>
  </li>
  
  <li>
     <strong>Create .env file :</strong> 
    <pre><code>MONGODB_URL = mongodb+srv://testing:testing123@cluster0.bybuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
REFRESH_TOKEN_SECRET = REFRESHTOKEN
ACCESS_TOKEN_SECRET = ACCESSTOKEN
STRIPE_SECRET_KEY = sk_test_51I05t8IvLvDP1ZyZ98E4YVzXzHFuaw4s4Fxsd4ejxXwHI9IENdBhh937TY38HjqI6AicIFIDj76gAIDBt6ISSEKh00bF4tIJtY</code></pre>
  </li>
  
  <li>
    <strong>Install dependencies:</strong> 
    <pre><code>npm install</code></pre>
  </li>
  <li>
    <strong>Start the backend server:</strong>
    <ul>
      <li>Navigate to the server directory:</li>
      <pre><code>cd server/</code></pre>
      <li>Run the development server:</li>
      <pre><code>npm run dev</code></pre>
    </ul>
  </li>
  <li>
    <strong>Start the frontend server:</strong>
    <ul>
      <li>Navigate to the client directory:</li>
      <pre><code>cd client/</code></pre>
      <li>Start the frontend application:</li>
      <pre><code>npm start</code></pre>
    </ul>
  </li>
</ol>

