// product-details.js

import { addToCart } from './script.js';

const productDetailsContainer = document.getElementById('product-details');

// Function to extract the product ID from the URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch the product details based on the ID
function getProductDetails(id) {
    const apiUrl = `https://api.noroff.dev/api/v1/rainy-days/${id}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(product => {
            displayProductDetails(product);
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
            productDetailsContainer.innerHTML = '<p>Failed to load product details. Please try again later.</p>';
        });
}

function displayProductDetails(product) {
    if (!productDetailsContainer) return;

    const sizeOptions = product.sizes
    ? product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')
    : '<option value="N/A">N/A</option>';


    productDetailsContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-details-text">
            <h1>${product.title}</h1>
            <p>${product.description}</p>
            <p class="price"><strong>Price:</strong> $${product.price}</p>
            <p><strong>Available Sizes:</strong> ${product.sizes?.join(", ") || 'N/A'}</p>
      <label for="size-select"><strong>SELECT SIZE:</strong></label>
      <select id="size-select">${sizeOptions}</select>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
       
    `;

    document.querySelector('.add-to-cart').addEventListener('click', () => {
        addToCart(product.id);
    });
}

const productId = getProductIdFromURL();
if (productId) {
    getProductDetails(productId);
}



    
