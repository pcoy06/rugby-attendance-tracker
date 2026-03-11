# 🎨 Usar Git en VS Code sin Comandos

Guía visual para subir cambios a GitHub usando solo la interfaz gráfica de VS Code.

## 📋 Pasos para subir cambios

### 1️⃣ **Abre tu proyecto en VS Code**
- Abre VS Code
- Ve a **File → Open Folder**
- Selecciona tu carpeta: `C:\Users\Usuario\Desktop\App-M18-kiro\rugby-attendance`

---

### 2️⃣ **Haz cambios en tus archivos**
- Edita cualquier archivo (app.js, index.html, styles.css, etc.)
- Guarda los cambios con **Ctrl + S**

---

### 3️⃣ **Ve a Source Control**
- Haz clic en el **tercer ícono** de la barra lateral izquierda
- O presiona **Ctrl + Shift + G**
- Verás una lista de archivos modificados

**Iconos que verás:**
- **M** = Modified (Modificado)
- **A** = Added (Agregado)
- **D** = Deleted (Eliminado)
- **U** = Untracked (Nuevo archivo sin seguimiento)

---

### 4️⃣ **Agregar archivos al commit (Stage)**

**Opción A: Agregar todos los archivos**
- Pasa el mouse sobre **"Changes"**
- Haz clic en el **+** que aparece
- Todos los archivos se mueven a **"Staged Changes"**

**Opción B: Agregar archivos individuales**
- Pasa el mouse sobre cada archivo
- Haz clic en el **+** junto al archivo
- Solo ese archivo se mueve a **"Staged Changes"**

---

### 5️⃣ **Escribir mensaje de commit**
- En la caja de texto arriba (donde dice "Message")
- Escribe una descripción de tus cambios

**Ejemplos de buenos mensajes:**
```
Agregué función de exportación múltiple
Corregí error en el filtro de jugadores
Actualicé estilos del modal
Agregué nuevo jugador al roster
```

---

### 6️⃣ **Hacer commit**
- Haz clic en el botón **✓ Commit** (o **Ctrl + Enter**)
- Tus cambios se guardan localmente

---

### 7️⃣ **Subir a GitHub (Push)**

**Opción A: Botón Sync Changes**
- Si ves un botón azul que dice **"Sync Changes"**, haz clic en él
- Esto hace push y pull al mismo tiempo

**Opción B: Menú de tres puntos**
- Haz clic en los **⋯** (tres puntos) arriba
- Selecciona **"Push"**

**Opción C: Botón con flecha**
- Si ves un botón con una **flecha hacia arriba ↑**, haz clic en él
- Puede tener un número que indica cuántos commits hay para subir

---

### 8️⃣ **Verificar que se subió**
- Verás una notificación en la esquina inferior derecha
- Dice algo como: "Successfully pushed to origin/main"
- Ve a tu repositorio en GitHub para confirmar

---

## 🔄 **Flujo completo resumido:**

```
1. Editar archivos → Guardar (Ctrl + S)
2. Ir a Source Control (Ctrl + Shift + G)
3. Hacer clic en + para agregar archivos
4. Escribir mensaje de commit
5. Hacer clic en ✓ Commit
6. Hacer clic en Sync Changes o Push
7. ¡Listo! Netlify se actualiza automáticamente
```

---

## 🎯 **Atajos de teclado útiles:**

| Atajo | Acción |
|-------|--------|
| **Ctrl + S** | Guardar archivo |
| **Ctrl + Shift + G** | Abrir Source Control |
| **Ctrl + Enter** | Hacer commit |
| **Ctrl + `** | Abrir/cerrar terminal |

---

## 📸 **Ubicación de los elementos:**

### Barra lateral izquierda (de arriba a abajo):
1. 📁 **Explorer** - Ver archivos
2. 🔍 **Search** - Buscar en archivos
3. 🌿 **Source Control** - Git (el que necesitas)
4. 🐛 **Run and Debug** - Depuración
5. 🧩 **Extensions** - Extensiones

### Panel de Source Control:
```
┌─────────────────────────────────┐
│ Message (Ctrl+Enter to commit)  │ ← Escribe aquí tu mensaje
├─────────────────────────────────┤
│ ✓ Commit          ⋯             │ ← Botones principales
├─────────────────────────────────┤
│ Changes                      +  │ ← Archivos modificados
│   M app.js                   +  │
│   M index.html               +  │
├─────────────────────────────────┤
│ Staged Changes               -  │ ← Archivos listos para commit
│   M styles.css               -  │
└─────────────────────────────────┘
```

---

## ⚠️ **Problemas comunes:**

### "No hay cambios para hacer commit"
- Asegúrate de haber guardado los archivos (Ctrl + S)
- Verifica que realmente hiciste cambios

### "No puedo hacer push"
- Primero debes hacer commit
- Verifica tu conexión a internet
- Asegúrate de estar autenticado en GitHub

### "Conflictos de merge"
- Haz clic en el archivo con conflicto
- VS Code te mostrará las diferencias
- Elige qué versión mantener
- Guarda y haz commit de nuevo

---

## 🔐 **Primera vez usando Git en VS Code:**

Si es la primera vez, VS Code te pedirá:

1. **Autenticarte en GitHub:**
   - Haz clic en "Sign in with GitHub"
   - Autoriza VS Code en el navegador
   - Vuelve a VS Code

2. **Configurar tu nombre:**
   - Abre terminal (Ctrl + `)
   - Ejecuta:
   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu@email.com"
   ```

---

## 💡 **Consejos:**

1. **Haz commits frecuentes** - Es mejor hacer varios commits pequeños
2. **Mensajes descriptivos** - Explica QUÉ cambiaste y POR QUÉ
3. **Revisa antes de commit** - Verifica qué archivos estás subiendo
4. **Sync regularmente** - Mantén tu código actualizado

---

## 🆘 **¿Necesitas ayuda?**

Si algo no funciona:
1. Abre la terminal (Ctrl + `)
2. Ejecuta: `git status`
3. Esto te dirá el estado actual de Git

O consulta la [Guía de Comandos Git](../GIT_COMMANDS.md) para más opciones.

---

## 🔙 Volver

- [Volver a la documentación](./README.md)
- [Ver comandos Git](../GIT_COMMANDS.md)
