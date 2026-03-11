# 🏉 Rugby Attendance Tracker - Fuengirola RC M-18

Aplicación web moderna para el seguimiento de asistencia del equipo de rugby Fuengirola RC M-18.

## ✨ Características

### 📋 Gestión de Asistencia
- ✅ Marcar jugadores como: Presente, Lesionado-Presente, Lesionado-Ausente, Viaje, Estudio, Desconocido
- 📅 Navegación por fechas (anterior/siguiente/hoy)
- 🔍 Búsqueda de jugadores en tiempo real
- 📊 Estadísticas en tiempo real por sesión
- 🎯 Detección automática de sesiones de entrenamiento

### 📈 Estadísticas Avanzadas
- **Vista de estadísticas completa** con:
  - Resumen general (total jugadores, sesiones, % asistencia promedio)
  - Estadísticas detalladas por jugador
  - Porcentaje de asistencia individual
  - Ordenamiento por mejor asistencia

### 📊 Exportación de Datos
- **Excel (.xlsx)** - Exporta la asistencia del día actual con resumen
- **Excel de Estadísticas** - Exporta 3 hojas:
  1. Estadísticas por jugador (presentes, ausentes, % asistencia)
  2. Resumen general del equipo
  3. Historial completo de todas las sesiones

### 🖨️ Impresión/PDF
- Vista optimizada para impresión
- Incluye fecha de la sesión
- Formato limpio para guardar como PDF
- Colores diferenciados por estado

### ☁️ Sincronización en la Nube (Firebase)
- Sincronización automática en tiempo real
- Acceso desde múltiples dispositivos
- Backup local automático (localStorage)
- Funciona offline con sincronización posterior

## 🚀 Instalación

### Opción 1: Uso Local (Sin Firebase)
1. Descarga todos los archivos
2. Abre `index.html` en tu navegador
3. Los datos se guardan localmente en tu navegador

### Opción 2: Con Firebase (Recomendado)
1. Sigue las instrucciones en `FIREBASE_SETUP.md`
2. Configura tu proyecto Firebase (gratis)
3. Actualiza las credenciales en `app.js`
4. Sube los archivos a tu hosting (Hostinger, etc.)

## 📱 Uso desde Móvil

### Agregar a Pantalla de Inicio
**iOS (Safari):**
1. Abre la URL en Safari
2. Toca el botón compartir (cuadrado con flecha)
3. Selecciona "Agregar a pantalla de inicio"

**Android (Chrome):**
1. Abre la URL en Chrome
2. Toca el menú (3 puntos)
3. Selecciona "Agregar a pantalla de inicio"

## 🎨 Características de Diseño

- 🌙 Tema oscuro moderno con efectos glassmorphism
- 🎭 Animaciones suaves y transiciones fluidas
- 📱 Diseño responsive (móvil, tablet, desktop)
- ♿ Accesible con ARIA labels
- 🎨 Colores diferenciados por estado de asistencia

## 📊 Estados de Asistencia

| Estado | Emoji | Descripción |
|--------|-------|-------------|
| Presente | ✅ | Jugador presente en el entrenamiento |
| Lesionado-Presente | 🤕 | Jugador lesionado pero asiste |
| Lesionado-Ausente | 🤕 | Jugador lesionado y ausente |
| Viaje | ✈️ | Jugador de viaje |
| Estudio | 📚 | Jugador ausente por estudios |
| Desconocido | ❓ | Estado no definido |

## ⚙️ Configuración

### Horarios de Entrenamiento
Edita en `app.js`:
```javascript
const SESSIONS = [
  { days: [1, 3], start: 18, end: 20, label: 'Mon/Wed  18:00–20:00' },
  { days: [5],    start: 20, end: 21, label: 'Friday   20:00–21:00' },
];
```

### Jugadores Predeterminados
Edita `DEFAULT_ROSTER` en `app.js` para cambiar la lista inicial de jugadores.

## 🔧 Tecnologías

- HTML5, CSS3, JavaScript (Vanilla)
- Firebase Realtime Database (opcional)
- SheetJS (xlsx) para exportación a Excel
- LocalStorage para backup local

## 📦 Archivos

- `index.html` - Estructura de la aplicación
- `app.js` - Lógica de la aplicación
- `styles.css` - Estilos y diseño
- `logo-fuengirola.png` - Logo del club
- `FIREBASE_SETUP.md` - Guía de configuración Firebase
- `README.md` - Este archivo

## 💰 Costos

- **Hosting en Hostinger**: Según tu plan actual
- **Firebase**: GRATIS para uso del equipo
  - Hasta 100 conexiones simultáneas
  - 1 GB de almacenamiento
  - 10 GB de transferencia/mes

## 🆘 Soporte

Si encuentras problemas:
1. Verifica la consola del navegador (F12)
2. Revisa que Firebase esté configurado correctamente
3. Asegúrate de tener conexión a internet para sincronización

## 📝 Notas

- Los datos se guardan automáticamente al hacer cambios
- La sincronización con Firebase es en tiempo real
- El backup local funciona aunque Firebase falle
- Las estadísticas se calculan sobre todas las sesiones registradas

## 🎯 Próximas Mejoras Sugeridas

- [ ] Autenticación de usuarios (entrenadores)
- [ ] Notificaciones push para recordatorios
- [ ] Gráficos de tendencias de asistencia
- [ ] Exportar a Google Sheets
- [ ] Modo offline completo con PWA
- [ ] Comentarios por jugador/sesión

---

Desarrollado para Fuengirola RC M-18 🏉
