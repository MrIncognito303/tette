let cart = [];
let wishlist = [];
let totalAmount = 0;

function addToCart(productName, productPrice) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        cart[productIndex].quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    totalAmount += productPrice;
    updateCart();
    alert(`${productName} dodano do koszyka!`);
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} PLN x ${item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Usuń';
        removeButton.onclick = () => removeFromCart(item.name, item.price);
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
    document.getElementById('cartTotal').textContent = `Łączna kwota: ${totalAmount} PLN`;
}

function removeFromCart(productName, productPrice) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity--;
            totalAmount -= productPrice;
        } else {
            totalAmount -= productPrice;
            cart.splice(productIndex, 1);
        }
        updateCart();
    }
}

document.getElementById('checkoutButton').addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Koszyk jest pusty!");
    } else {
        alert("Zamówienie złożone! Dziękujemy za zakupy.");
        cart = [];
        totalAmount = 0;
        updateCart();
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('contactResponse').textContent = "Dziękujemy za Twoją wiadomość!";
    this.reset();
});

// Lista życzeń
function addToWishlist(productName, productPrice) {
    const productIndex = wishlist.findIndex(item => item.name === productName);
    if (productIndex === -1) {
        wishlist.push({ name: productName, price: productPrice });
        updateWishlist();
        alert(`${productName} dodano do listy życzeń!`);
    } else {
        alert(`${productName} jest już w liście życzeń!`);
    }
}

function updateWishlist() {
    const wishlistItems = document.getElementById('wishlistItems');
    wishlistItems.innerHTML = '';
    wishlist.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} PLN`;
        wishlistItems.appendChild(li);
    });
}

// Logowanie
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Przykładowe dane do logowania
    if (username === "admin" && password === "password") {
        document.getElementById('loginResponse').textContent = "Zalogowano pomyślnie!";
        this.reset();
    } else {
        document.getElementById('loginResponse').textContent = "Nieprawidłowa nazwa użytkownika lub hasło.";
    }
});

// Rejestracja
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = this[0].value;
    const password = this[1].value;
    // W tym miejscu można dodać logikę do zapisu użytkownika
    document.getElementById('registerResponse').textContent = `Użytkownik ${username} zarejestrowany pomyślnie!`;
    this.reset();
});
