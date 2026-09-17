// Configuración de contacto
const NUMERO_WHATSAPP = "573143753293"; // Número de WhatsApp configurado

// Base de datos local de productos
const productos = [
  { id: 1, nombre: "Afilador de Cuchillos", precio: 4000, categoria: "hogar", imagen: "https://www.google.com/imgres?q=afilador%20de%20cuchillos&imgurl=https%3A%2F%2Fhttp2.mlstatic.com%2FD_NQ_NP_863362-MCO83713309641_042025-O.webp&imgrefurl=https%3A%2F%2Fwww.mercadolibre.com.co%2Fafilador-de-cuchillos-de-cocina-4-en-1-de-acero-inoxidable%2Fup%2FMCOU3117339897&docid=0LPkHSeegbaThM&tbnid=EWKF6MZhQpwRdM&vet=12ahUKEwjEiIGh0PSWAxWtbzABHe5QLgEQnPAOegQINxAA..i&w=490&h=500&hcb=2&ved=2ahUKEwjEiIGh0PSWAxWtbzABHe5QLgEQnPAOegQINxAA" },
  { id: 2, nombre: "Termómetro de Cocina Sencillo", precio: 5000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Termometro+de+Cocina" },
  { id: 3, nombre: "Encendedor Eléctrico Recargable", precio: 5000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Encendedor+Electrico" },
  { id: 4, nombre: "Molde de Silicona x6", precio: 6000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Molde+de+Silicona" },
  { id: 5, nombre: "Gramera Amarilla", precio: 8000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Gramera+Amarilla" },
  { id: 6, nombre: "Gramera", precio: 9000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Gramera" },
  { id: 7, nombre: "Termo Vacuum (Frío o Calor)", precio: 13000, categoria: "accesorios", imagen: "https://via.placeholder.com/300?text=Termo+Vacuum" },
  { id: 8, nombre: "Cinturón de Cólicos (Calentador y Masajeador)", precio: 14000, categoria: "accesorios", imagen: "https://via.placeholder.com/300?text=Cinturon+de+Colicos" },
  { id: 9, nombre: "Licuadora de Vaso Doble", precio: 15000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Licuadora+Vaso+Doble" },
  { id: 10, nombre: "Kit Masajeador de Pistola", precio: 15000, categoria: "accesorios", imagen: "https://via.placeholder.com/300?text=Masajeador+Pistola" },
  { id: 11, nombre: "Repetidor de WiFi", precio: 16000, categoria: "tecnologia", imagen: "https://via.placeholder.com/300?text=Repetidor+WiFi" },
  { id: 12, nombre: "Cojín de Gel", precio: 17000, categoria: "accesorios", imagen: "https://via.placeholder.com/300?text=Cojin+de+Gel" },
  { id: 13, nombre: "Gallina Hervidora de Huevos", precio: 17000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Hervidor+de+Huevos" },
  { id: 14, nombre: "Depiladora Eléctrica 4 en 1 (Lady Shaver)", precio: 20000, categoria: "accesorios", imagen: "https://via.placeholder.com/300?text=Depiladora+4en1" },
  { id: 15, nombre: "Rizador 3 Tubos Onda de Sirena", precio: 20000, categoria: "accesorios", imagen: "https://via.placeholder.com/300?text=Rizador+3+Tubos" },
  { id: 16, nombre: "Calentador Handy de Conectar", precio: 20000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Calentador+Handy" },
  { id: 17, nombre: "Doñera Eléctrica x7", precio: 36000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Donera+Electrica" },
  { id: 18, nombre: "Cosmetiquera con Espejo Grande", precio: 37000, categoria: "accesorios", imagen: "https://via.placeholder.com/300?text=Cosmetiquera" },
  { id: 19, nombre: "Compresor de Aire Portátil", precio: 38000, categoria: "tecnologia", imagen: "https://via.placeholder.com/300?text=Compresor+de+Aire" },
  { id: 20, nombre: "Contenedor x7 Tarros para Granos", precio: 40000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Contenedores+x7" },
  { id: 21, nombre: "Lonchera Eléctrica Calentador", precio: 42000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Lonchera+Electrica" },
  { id: 22, nombre: "Set Cuchillos Giratorios con Soporte", precio: 47000, categoria: "hogar", imagen: "https://via.placeholder.com/300?text=Set+Cuchillos" },
  { id: 23, nombre: "Proyector P30 Max con +1000 Juegos (3 Controles)", precio: 180000, categoria: "tecnologia", imagen: "https://via.placeholder.com/300?text=Proyector+P30+Max" }
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
