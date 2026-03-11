# 🔐 Solución: API Key de Firebase Expuesta

## 🚨 Problema
Google detectó que tu API Key de Firebase está visible públicamente en GitHub.

## ✅ Solución Paso a Paso

### 1. Restringir la API Key Actual (URGENTE)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto: **rugby-attendance-509fc**
3. Ve a **APIs y servicios** → **Credenciales**
4. Busca la clave: `AIzaSyB-2Pb7LW7y8_N_MfmtehBsKe1zjzZvjM4`
5. Haz clic en ella para editarla
6. En **Restricciones de aplicación**, selecciona:
   - **Referentes HTTP (sitios web)**
7. Agrega tus dominios autorizados:
   ```
   https://tu-dominio.com/*
   https://tu-dominio.firebaseapp.com/*
   http://localhost:*
   ```
8. En **Restricciones de API**, selecciona:
   - Firebase Authentication API
   - Firebase Realtime Database API
   - Identity Toolkit API
9. Guarda los cambios

### 2. Crear un Archivo de Configuración Separado

En lugar de tener las credenciales directamente en `app.js`, créalas en un archivo separado:

**Opción A: Para desarrollo local (NO subir a GitHub)**

Crea `firebase-config.js`:
```javascript
// NO SUBIR ESTE ARCHIVO A GITHUB
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "rugby-attendance-509fc.firebaseapp.com",
  databaseURL: "https://rugby-attendance-509fc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rugby-attendance-509fc",
  storageBucket: "rugby-attendance-509fc.firebasestorage.app",
  messagingSenderId: "346795737660",
  appId: "1:346795737660:web:f0cbee02d3e7e50c59b939"
};
```

Agrega a `.gitignore`:
```
firebase-config.js
```

**Opción B: Para producción (Recomendada)**

Las API Keys de Firebase son seguras de exponer SI están correctamente restringidas. Firebase está diseñado para que las claves sean públicas, pero con restricciones de dominio.

### 3. Verificar Restricciones de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Configuración del proyecto** (⚙️)
4. En la pestaña **General**, baja hasta **Tus apps**
5. En **Dominios autorizados**, asegúrate de tener solo:
   - Tu dominio de producción
   - `localhost` (para desarrollo)

### 4. Configurar Reglas de Seguridad en Firebase

#### Realtime Database:
1. Ve a **Realtime Database** → **Reglas**
2. Configura reglas seguras:

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

#### Authentication:
1. Ve a **Authentication** → **Sign-in method**
2. Asegúrate de tener habilitado solo:
   - Email/Password
3. En **Dominios autorizados**, verifica que solo estén tus dominios

### 5. Eliminar el Historial de Git (Opcional pero Recomendado)

La clave sigue en el historial de Git. Para eliminarla completamente:

```bash
# ADVERTENCIA: Esto reescribe el historial de Git
# Haz un backup antes

# Instalar BFG Repo-Cleaner (más fácil que git filter-branch)
# O usar git filter-branch:

git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch app.js" \
  --prune-empty --tag-name-filter cat -- --all

# Forzar push (CUIDADO: esto reescribe el historial)
git push origin --force --all
```

**IMPORTANTE:** Esto afectará a cualquiera que haya clonado el repositorio.

### 6. Alternativa Más Simple (Recomendada)

Si no quieres reescribir el historial:

1. **Restringe la API Key** (Paso 1) ✅
2. **Configura reglas de seguridad** (Paso 4) ✅
3. **Deja la clave en el código** - Es seguro si está restringida

Las API Keys de Firebase están diseñadas para ser públicas, siempre que:
- ✅ Estén restringidas por dominio
- ✅ Tengas reglas de seguridad en la base de datos
- ✅ Solo usuarios autenticados puedan acceder

## 📋 Checklist de Seguridad

- [ ] Restringir API Key por dominio en Google Cloud Console
- [ ] Configurar dominios autorizados en Firebase
- [ ] Configurar reglas de seguridad en Realtime Database
- [ ] Verificar que solo Email/Password esté habilitado en Authentication
- [ ] Revisar que no haya otras credenciales sensibles en el código

## 🔍 Verificar que Está Seguro

1. Intenta acceder a tu base de datos sin autenticación
2. Intenta usar la API Key desde otro dominio
3. Si ambos fallan, ¡está seguro! ✅

## 📚 Más Información

- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [API Key Restrictions](https://cloud.google.com/docs/authentication/api-keys)
- [Firebase Best Practices](https://firebase.google.com/docs/projects/api-keys)

## ⚠️ Nota Importante

Las API Keys de Firebase NO son como contraseñas. Están diseñadas para ser incluidas en aplicaciones cliente. La seguridad real viene de:
1. Restricciones de dominio
2. Reglas de seguridad de Firebase
3. Autenticación de usuarios

No necesitas ocultarlas si están correctamente configuradas.
