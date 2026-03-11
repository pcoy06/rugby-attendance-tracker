# 🔥 Configuración de Firebase para Rugby Attendance

## Paso 1: Crear proyecto en Firebase (GRATIS)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto" o "Add project"
3. Nombre del proyecto: `rugby-attendance` (o el que prefieras)
4. Desactiva Google Analytics (no es necesario)
5. Haz clic en "Crear proyecto"

## Paso 2: Configurar Realtime Database

1. En el menú lateral, ve a **Build** → **Realtime Database**
2. Haz clic en "Crear base de datos" o "Create database"
3. Selecciona ubicación: **United States** (us-central1) o Europe (europe-west1)
4. Modo de seguridad: Selecciona **"Modo de prueba"** (test mode)
5. Haz clic en "Habilitar"

## Paso 3: Configurar reglas de seguridad

En la pestaña "Reglas" (Rules), reemplaza el contenido con:

```json
{
  "rules": {
    "rugby-attendance": {
      ".read": true,
      ".write": true
    }
  }
}
```

⚠️ **IMPORTANTE**: Estas reglas permiten acceso público. Para producción, deberías:
- Agregar autenticación (email/password)
- Restringir acceso solo a usuarios autenticados

## Paso 4: Obtener configuración

1. Ve a **Configuración del proyecto** (ícono de engranaje arriba a la izquierda)
2. En la sección "Tus apps", haz clic en el ícono **</>** (Web)
3. Registra la app con el nombre: `rugby-attendance-web`
4. NO marques "Firebase Hosting"
5. Haz clic en "Registrar app"
6. Copia la configuración que aparece (algo como esto):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "rugby-attendance-xxxxx.firebaseapp.com",
  databaseURL: "https://rugby-attendance-xxxxx-default-rtdb.firebaseio.com",
  projectId: "rugby-attendance-xxxxx",
  storageBucket: "rugby-attendance-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

## Paso 5: Configurar en tu aplicación

1. Abre el archivo `app.js`
2. Busca la sección al inicio que dice:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  ...
```

3. Reemplaza TODO el objeto `firebaseConfig` con el que copiaste de Firebase
4. Guarda el archivo

## Paso 6: Probar la aplicación

1. Abre `index.html` en tu navegador
2. Abre la consola del navegador (F12)
3. Deberías ver: `✅ Firebase initialized`
4. Marca algunos jugadores como presentes
5. Deberías ver en el footer: `✅ Synced`

## Paso 7: Subir a Hostinger

1. Sube todos los archivos a tu hosting:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `logo-fuengirola.png`

2. Accede desde tu móvil usando la URL de tu sitio

3. Los cambios se sincronizarán automáticamente entre todos los dispositivos

## 📱 Uso desde móvil

- Abre la URL en Safari (iOS) o Chrome (Android)
- Para agregar a pantalla de inicio:
  - **iOS**: Toca el botón compartir → "Agregar a pantalla de inicio"
  - **Android**: Menú → "Agregar a pantalla de inicio"

## 🔒 Seguridad (Opcional pero recomendado)

Para proteger tus datos:

1. Ve a **Authentication** en Firebase
2. Activa "Email/Password"
3. Crea usuarios para los entrenadores
4. Modifica las reglas de la base de datos:

```json
{
  "rules": {
    "rugby-attendance": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## 💰 Costos

Firebase es **GRATIS** para:
- Hasta 100 conexiones simultáneas
- 1 GB de almacenamiento
- 10 GB de transferencia/mes

Para un equipo de rugby, esto es más que suficiente.

## ❓ Problemas comunes

**No se sincroniza:**
- Verifica que copiaste bien la configuración
- Revisa la consola del navegador (F12) para errores
- Verifica que las reglas de Firebase permitan lectura/escritura

**Dice "Firebase not configured":**
- Asegúrate de reemplazar `"TU_API_KEY"` con tu API key real

**Error de permisos:**
- Verifica las reglas en Realtime Database
- Asegúrate de que `.read` y `.write` estén en `true`
