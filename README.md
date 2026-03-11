# 🏉 Rugby Attendance Tracker - Fuengirola RC M-18

Aplicación web moderna para el seguimiento de asistencia del equipo de rugby Fuengirola RC M-18.

## ✨ Características

### 📋 Gestión de Asistencia
- ✅ Marcar jugadores como: Presente, Lesionado-Presente, Lesionado-Ausente, Viaje, Estudio, Desconocido
- 📅 Navegación por fechas (anterior/siguiente/hoy)
- 🔍 Búsqueda de jugadores en tiempo real
- 🎯 Filtros rápidos por estado de asistencia
- 📊 Estadísticas en tiempo real por sesión
- 🎯 Detección automática de sesiones de entrenamiento

### � Autenticación y Seguridad
- **Login seguro** con Firebase Authentication
- **Recordar email** - Guarda tu email para próximas sesiones
- **Persistencia de sesión** - Mantiene tu sesión iniciada
- **API Key protegida** - Restricciones por dominio configuradas
- **Reglas de seguridad** - Solo usuarios autenticados pueden acceder

### 📱 PWA (Progressive Web App)
- **Instalable en móviles** - Funciona como app nativa
- **Ícono en pantalla de inicio** - Acceso rápido
- **Pantalla completa** - Sin barra del navegador
- **Service Worker** - Carga más rápida
- **Funciona offline** - Acceso básico sin conexión

### � Estadísticas Avaanzadas
- **Vista de estadísticas completa** con:
  - Resumen general (total jugadores, sesiones, % asistencia promedio)
  - Estadísticas detalladas por jugador
  - Porcentaje de asistencia individual
  - Ordenamiento por mejor asistencia

### 📊 Exportación de Datos
- **Excel múltiple** - Selecciona y exporta múltiples fechas a la vez
- **Excel de día actual** - Exporta la asistencia del día con resumen
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

## 🚀 Instalación y Acceso

### 🌐 Acceso Online (Recomendado)
**URL:** https://asistenciam-18.netlify.app

La aplicación está desplegada en Netlify con deploy automático desde GitHub.

### 📱 Instalar como App en Móvil
Ver guía completa: [INSTALAR_EN_MOVIL.md](docs/INSTALAR_EN_MOVIL.md)

**Android (Chrome):**
1. Abre la URL en Chrome
2. Toca "Agregar a pantalla de inicio"
3. Confirma la instalación

**iPhone (Safari):**
1. Abre la URL en Safari
2. Toca el botón compartir (□↑)
3. Selecciona "Añadir a pantalla de inicio"

### 💻 Desarrollo Local
1. Clona el repositorio:
```bash
git clone https://github.com/pcoy06/rugby-attendance-tracker.git
cd rugby-attendance-tracker
```

2. Abre con Live Server o cualquier servidor local

3. Accede a `http://localhost:5500`

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

## � Documentación Completa

Toda la documentación está organizada en la carpeta `docs/`:

### 📖 Para Usuarios
- **[Instalar en Móvil](docs/INSTALAR_EN_MOVIL.md)** - Guía paso a paso para instalar la PWA
- **[Filtros Rápidos](docs/FILTROS_RAPIDOS.md)** - Cómo usar los filtros de estado
- **[Ayuda con Descargas](docs/AYUDA_DESCARGAS.md)** - Solución de problemas con Excel

### 🔧 Para Desarrolladores
- **[Comandos Git](GIT_COMMANDS.md)** - Guía completa de Git para el proyecto
- **[Configuración Firebase](docs/FIREBASE_SETUP.md)** - Setup de Firebase Database
- **[Configuración Autenticación](docs/AUTHENTICATION_SETUP.md)** - Setup de Firebase Auth
- **[Seguridad Configurada](docs/SEGURIDAD_CONFIGURADA.md)** - Estado actual de seguridad
- **[Solucionar API Key Expuesta](docs/SOLUCIONAR_API_KEY_EXPUESTA.md)** - Guía de seguridad

### 📋 Índice de Documentación
Ver [docs/README.md](docs/README.md) para el índice completo.

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

- [x] Autenticación de usuarios (entrenadores) ✅
- [x] Exportación múltiple a Excel ✅
- [x] PWA instalable ✅
- [x] Recordar sesión ✅
- [x] Filtros por estado ✅
- [ ] Notificaciones push para recordatorios
- [ ] Gráficos de tendencias de asistencia
- [ ] Exportar a Google Sheets
- [ ] Comentarios por jugador/sesión
- [ ] Gestión de múltiples equipos

---

**Desarrollado con ❤️ para Fuengirola RC M-18** 🏉

**Repositorio:** https://github.com/pcoy06/rugby-attendance-tracker  
**Deploy:** https://asistenciam-18.netlify.app  
**Contacto:** pcoy06@gmail.com
