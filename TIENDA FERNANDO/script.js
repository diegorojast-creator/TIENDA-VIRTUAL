// Configuración de contacto
const NUMERO_WHATSAPP = "573143753293"; // Número de WhatsApp configurado

// Base de datos local de productos
const productos = [
    {
        id: 1,
        nombre: "Audífonos Inalámbricos TWS",
        categoria: "tecnologia",
        precio: 25.00,
        imagen: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        nombre: "Smartwatch Deportivo Pro",
        categoria: "tecnologia",
        precio: 45.00,
        imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        nombre: "Humidificador Ultrasónico RGB",
        categoria: "hogar",
        precio: 18.00,
        imagen: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        nombre: "Lámpara LED Inteligente",
        categoria: "hogar",
        precio: 15.00,
        imagen: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        nombre: "Reloj Minimalista Hombre",
        categoria: "accesorios",
        precio: 30.00,
        imagen: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        nombre: "Gafas de Sol Polarizadas",
        categoria: "accesorios",
        precio: 20.00,
        imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80"
    }
];

// Carrito guardado en memoria
let carrito = [];

// Elementos del DOM
const productsGrid = document.getElementById('products-grid');
const categoryBtns = document.querySelectorAll('.category-btn');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Inicializar tienda
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos);
    
    // Filtro por categorías
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const categoria = btn.dataset.category;
            if (categoria === 'todos') {
                mostrarProductos(productos);
            } else {
                const filtrados = productos.filter(p => p.categoria === categoria);
                mostrarProductos(filtrados);
            }
        });
    });

    // Toggle menú móvil
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Abrir/Cerrar Carrito
    cartIcon.addEventListener('click', () => cartModal.classList.add('active'));
    closeCartBtn.addEventListener('click', () => cartModal.classList.remove('active'));
    
    // Checkout por WhatsApp
    whatsappCheckoutBtn.addEventListener('click', enviarPedidoWhatsApp);
});

// Función para renderizar los productos
function mostrarProductos(listaProductos) {
    productsGrid.innerHTML = '';
    listaProductos.forEach(prod => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <div class="product-info">
                <h3 class="product-title">${prod.nombre}</h3>
                <span class="product-price">$${prod.precio.toFixed(2)}</span>
                <button class="add-to-cart-btn" onclick="agregarAlCarrito(${prod.id})">
                    <i class="fa-solid fa-cart-plus"></i> Añadir al Carrito
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Función para agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

// Función para eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Función para actualizar la interfaz del carrito
function actualizarCarrito() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalUnidades = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        totalUnidades += item.cantidad;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.nombre}</h4>
                <span class="cart-item-price">$${item.precio.toFixed(2)} x ${item.cantidad}</span>
            </div>
            <i class="fa-solid fa-trash remove-item" onclick="eliminarDelCarrito(${item.id})"></i>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.textContent = totalUnidades;
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

// Función para procesar la orden vía WhatsApp
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "¡Hola! Quisiera realizar el siguiente pedido en *FERNANDO - FACTORY PRICE*:\n\n";
    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += `${index + 1}. *${item.nombre}*\n   Cantidad: ${item.cantidad} | Subtotal: $${subtotal.toFixed(2)}\n`;
    });

    mensaje += `\n*TOTAL DEL PEDIDO: $${total.toFixed(2)}*`;
    mensaje += "\n\nPor favor, confirmarme la disponibilidad y los datos para el envío. ¡Gracias!";

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}