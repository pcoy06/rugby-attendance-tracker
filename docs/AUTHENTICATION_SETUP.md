# 🔐 Configuración de Autenticación Firebase

## ✨ ¿Qué incluye?

La aplicación ahora tiene:
- ✅ Pantalla de login con email y contraseña
- ✅ Solo usuarios autorizados pueden acceder
- ✅ Botón de cerrar sesión
- ✅ Protección de datos en Firebase
- ✅ Sesión persistente (no necesitas login cada vez)

---

## 📋 Paso 1: Activar Authentication en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `rugby-attendance`
3. En el menú lateral, ve a **Build** → **Authentication**
4. Haz clic en **"Get started"** o **"Comenzar"**
5. En la pestaña **"Sign-in method"** o **"Método de acceso"**
6. Haz clic en **"Email/Password"**
7. Activa el primer switch (Email/Password)
8. NO actives "Email link (passwordless sign-in)"
9. Haz clic en **"Save"** o **"Guardar"**

---

## 👥 Paso 2: Crear Usuarios (Entrenadores)

### Opción A: Desde Firebase Console (Recomendado)

1. En **Authentication**, ve a la pestaña **"Users"** o **"Usuarios"**
2. Haz clic en **"Add user"** o **"Agregar usuario"**
3. Ingresa:
   - **Email**: `entrenador1@fuengirolarc.com` (o el email que prefieras)
   - **Password**: Una contraseña segura (mínimo 6 caracteres)
4. Haz clic en **"Add user"**
5. Repite para cada entrenador que necesite acceso

### Ejemplo de usuarios:

```
Email: entrenador1@fuengirolarc.com
Password: Rugby2024!

Email: entrenador2@fuengirolarc.com
Password: Fuengirola2024!
```

⚠️ **IMPORTANTE**: Guarda estas credenciales en un lugar seguro y compártelas solo con los entrenadores autorizados.

---

## 🔒 Paso 3: Actualizar Reglas de Seguridad

Ahora que tienes autenticación, actualiza las reglas de Realtime Database:

1. Ve a **Realtime Database** → **Rules** (Reglas)
2. Reemplaza las reglas con:

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

3. Haz clic en **"Publish"** o **"Publicar"**

Esto significa:
- ✅ Solo usuarios autenticados pueden leer datos
- ✅ Solo usuarios autenticados pueden escribir datos
- ❌ Usuarios no autenticados no tienen acceso

---

## 🚀 Paso 4: Probar la Aplicación

1. Abre tu aplicación en el navegador
2. Verás la pantalla de login
3. Ingresa el email y contraseña de un usuario que creaste
4. Haz clic en **"🔐 Iniciar Sesión"**
5. Si las credenciales son correctas, verás la aplicación principal
6. Tu sesión se mantendrá aunque cierres el navegador

### Cerrar Sesión:

- Haz clic en el botón **"🚪 Salir"** en la esquina superior derecha
- Volverás a la pantalla de login

---

## 📱 Uso desde Móvil

1. Abre la URL de tu aplicación en el móvil
2. Inicia sesión con tus credenciales
3. La sesión se mantiene en el dispositivo
4. Puedes cerrar el navegador y volver sin necesidad de login

---

## 🔐 Seguridad Adicional (Opcional)

### Restringir Dominios Autorizados

1. Ve a **Authentication** → **Settings** (Configuración)
2. En **"Authorized domains"** (Dominios autorizados)
3. Agrega solo tu dominio de Hostinger
4. Elimina dominios no necesarios

### Habilitar Verificación de Email (Opcional)

Si quieres que los usuarios verifiquen su email:

1. En **Authentication** → **Templates** (Plantillas)
2. Configura la plantilla de verificación de email
3. Modifica el código para enviar verificación al registrar

---

## ❓ Problemas Comunes

### "Usuario no encontrado"
- Verifica que creaste el usuario en Firebase Console
- Revisa que el email esté escrito correctamente

### "Contraseña incorrecta"
- Verifica la contraseña (distingue mayúsculas/minúsculas)
- Puedes resetear la contraseña desde Firebase Console

### "Error al iniciar sesión"
- Verifica que Authentication esté activado en Firebase
- Revisa la consola del navegador (F12) para más detalles
- Asegúrate de que el SDK de Auth esté cargado

### No puedo acceder a los datos
- Verifica que las reglas de Realtime Database permitan acceso autenticado
- Asegúrate de estar logueado correctamente

---

## 🔄 Resetear Contraseña de Usuario

Desde Firebase Console:

1. Ve a **Authentication** → **Users**
2. Encuentra el usuario
3. Haz clic en los tres puntos (⋮)
4. Selecciona **"Reset password"**
5. Puedes enviar email de reset o establecer nueva contraseña

---

## 👥 Gestión de Usuarios

### Agregar más entrenadores:
- Repite el Paso 2 para cada nuevo entrenador

### Eliminar acceso:
1. Ve a **Authentication** → **Users**
2. Encuentra el usuario
3. Haz clic en los tres puntos (⋮)
4. Selecciona **"Delete user"**

### Deshabilitar temporalmente:
1. Ve a **Authentication** → **Users**
2. Encuentra el usuario
3. Haz clic en los tres puntos (⋮)
4. Selecciona **"Disable user"**

---

## 💰 Costos

Firebase Authentication es **GRATIS** para:
- Hasta 10,000 verificaciones de teléfono/mes
- Autenticación ilimitada con email/password
- Para un equipo de rugby, es completamente gratis

---

## 🎯 Próximos Pasos

1. ✅ Activa Authentication en Firebase
2. ✅ Crea usuarios para los entrenadores
3. ✅ Actualiza las reglas de seguridad
4. ✅ Prueba el login
5. ✅ Comparte credenciales con los entrenadores

---

## 📝 Notas Importantes

- **Guarda las contraseñas de forma segura**: Usa un gestor de contraseñas
- **No compartas credenciales públicamente**: Solo con entrenadores autorizados
- **Cambia contraseñas periódicamente**: Para mayor seguridad
- **Usa contraseñas fuertes**: Mínimo 8 caracteres, con números y símbolos

---

¡Tu aplicación ahora está protegida y solo los entrenadores autorizados pueden acceder! 🔐🏉
