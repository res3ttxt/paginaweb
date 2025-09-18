# AnimeWear - Tienda de Polos Anime Premium

Una tienda online moderna y avanzada especializada en polos con diseños de anime. Desarrollada con HTML5, CSS3 y JavaScript vanilla para ofrecer una experiencia de usuario excepcional.

## 🌟 Características Principales

### 🛒 Funcionalidades de E-commerce
- **Carrito de compras** con persistencia en localStorage
- **Sistema de favoritos** con almacenamiento local
- **Filtros avanzados** por categoría, precio y talla
- **Búsqueda en tiempo real** de productos
- **Vista detallada** de productos con modal
- **Selección de tallas** interactiva

### 🎨 Diseño y UX/UI
- **Diseño responsive** que se adapta a todos los dispositivos
- **Animaciones suaves** y efectos visuales modernos
- **Navegación intuitiva** con scroll suave
- **Sidebar deslizante** para carrito y favoritos
- **Efectos hover** y animaciones de carga
- **Tema moderno** con gradientes y sombras

### 📱 Características Técnicas
- **Single Page Application (SPA)** sin frameworks
- **Lazy loading** de imágenes para mejor rendimiento
- **LocalStorage** para persistencia de datos
- **Validación de formularios** en tiempo real
- **Optimización SEO** básica
- **Código modular** y bien estructurado

## 📁 Estructura del Proyecto

```
pagina-web/
├── index.html                 # Página principal
├── css/
│   └── styles.css            # Estilos CSS principales
├── js/
│   ├── main.js              # Funciones principales
│   ├── products.js          # Gestión de productos
│   ├── cart.js              # Carrito de compras
│   └── favorites.js         # Sistema de favoritos
├── images/                   # Carpeta para imágenes
└── README.md                # Documentación
```

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desarrollo)

### Instalación Rápida
1. Descarga o clona el proyecto
2. Abre `index.html` en tu navegador
3. ¡Listo! La tienda está funcionando

### Para Desarrollo Local
```bash
# Si tienes Python instalado
python -m http.server 8000

# Si tienes Node.js instalado
npx serve .

# Si tienes Live Server (VS Code)
# Haz clic derecho en index.html > "Open with Live Server"
```

## 🎮 Productos Disponibles

La tienda incluye productos de las siguientes series de anime:

- **Naruto** - Naruto Uzumaki, Sasuke Uchiha
- **One Piece** - Luffy Gear 5, Roronoa Zoro
- **Dragon Ball** - Goku Ultra Instinto, Vegeta Príncipe
- **Attack on Titan** - Eren Titán, Levi Ackerman
- **Demon Slayer** - Tanjiro Kamado, Nezuko
- **My Hero Academia** - Deku One For All, All Might

## 🛠️ Funcionalidades Detalladas

### Carrito de Compras
- Agregar/quitar productos
- Modificar cantidades
- Cálculo automático de totales
- Persistencia entre sesiones
- Proceso de checkout simulado

### Sistema de Favoritos
- Marcar/desmarcar favoritos
- Vista dedicada de favoritos
- Acceso rápido desde favoritos al carrito
- Persistencia local

### Filtros y Búsqueda
- Filtro por categoría de anime
- Filtro por rango de precios
- Filtro por tallas disponibles
- Búsqueda por nombre y descripción
- Combinación de múltiples filtros

### Responsive Design
- **Desktop**: Layout completo con sidebars
- **Tablet**: Adaptación de grid y menú
- **Mobile**: Menú hamburguesa y layout apilado

## 🎨 Personalización

### Colores del Tema
```css
:root {
  --primary-color: #ff6b6b;      /* Rojo/Rosa principal */
  --secondary-color: #ffd93d;    /* Amarillo dorado */
  --accent-color: #667eea;       /* Azul/Púrpura */
  --dark-color: #333;            /* Texto principal */
  --light-color: #f8f9fa;        /* Fondo claro */
}
```

### Agregar Nuevos Productos
Edita el archivo `js/products.js` y agrega objetos al array `products`:

```javascript
{
    id: 13,
    name: "Nuevo Polo Anime",
    category: "nueva-categoria",
    price: 29.99,
    image: "ruta/a/imagen.jpg",
    description: "Descripción del producto",
    sizes: ["S", "M", "L", "XL"],
    badge: "Nuevo",
    rating: 4.5,
    reviews: 100
}
```

## 📱 Características Móviles

- **Menú hamburguesa** para navegación
- **Sidebars de pantalla completa** en móviles
- **Botones táctiles** optimizados
- **Swipe gestures** (futuro)
- **PWA ready** (Service Worker incluido)

## 🔧 Configuración Avanzada

### LocalStorage
Los datos se almacenan en:
- `animeWearCart`: Productos del carrito
- `animeWearFavorites`: Productos favoritos

### Códigos de Descuento
Códigos predefinidos en `cart.js`:
- `ANIME10`: 10% de descuento
- `WELCOME15`: 15% de descuento
- `NARUTO20`: 20% de descuento
- `ONEPIECE25`: 25% de descuento

### Eventos Personalizados
```javascript
// Escuchar cambios en el carrito
window.addEventListener('cartUpdated', function(e) {
    console.log('Carrito actualizado:', e.detail);
});

// Escuchar cambios en favoritos
window.addEventListener('favoritesUpdated', function(e) {
    console.log('Favoritos actualizados:', e.detail);
});
```

## 🚀 Mejoras Futuras

### Próximas Características
- [ ] Modo oscuro/claro
- [ ] Múltiples idiomas
- [ ] Sistema de reseñas
- [ ] Comparador de productos
- [ ] Recomendaciones personalizadas
- [ ] Integración con APIs de pago
- [ ] Sistema de usuarios/cuentas
- [ ] Historial de pedidos
- [ ] Notificaciones push
- [ ] Chat en vivo

### Optimizaciones Técnicas
- [ ] Service Worker para cache
- [ ] Progressive Web App (PWA)
- [ ] Optimización de imágenes WebP
- [ ] Bundle de CSS/JS minificado
- [ ] CDN para recursos estáticos
- [ ] Testing automatizado
- [ ] CI/CD pipeline

## 🤝 Contribución

### Para Contribuir
1. Fork el proyecto
2. Crea una branch de feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la branch (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### Guías de Estilo
- Usar **camelCase** para JavaScript
- Usar **kebab-case** para CSS
- Comentar código complejo
- Mantener funciones pequeñas y específicas
- Seguir convenciones de naming consistentes

## 📞 Soporte

### Contacto
- **Email**: info@animewear.com
- **Teléfono**: +1 234 567 8900
- **Dirección**: Av. Anime 123, Ciudad Otaku

### Reportar Bugs
1. Verifica que el bug no haya sido reportado
2. Incluye pasos para reproducir el error
3. Especifica navegador y versión
4. Adjunta screenshots si es posible

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Fuentes**: Google Fonts (Poppins)
- **Iconos**: Font Awesome
- **Imágenes**: Unsplash (placeholders)
- **Inspiración**: Mejores prácticas de e-commerce moderno

---

**Desarrollado con ❤️ para los fans del anime**

¡Disfruta comprando tus polos anime favoritos! 🎌✨
