# 📚 Guía de Comandos Git para el Proyecto

## 🚀 Comandos Básicos del Día a Día

### Ver el estado de tus archivos
```bash
git status
```
Muestra qué archivos han cambiado, cuáles están listos para commit, etc.

### Agregar cambios al staging
```bash
# Agregar todos los archivos modificados
git add .

# Agregar un archivo específico
git add app.js

# Agregar varios archivos específicos
git add app.js index.html styles.css
```

### Hacer commit (guardar cambios)
```bash
git commit -m "Descripción clara de lo que cambiaste"
```

**Ejemplos de buenos mensajes de commit:**
- `git commit -m "Agregué función de exportación múltiple a Excel"`
- `git commit -m "Corregí bug en el filtro de jugadores"`
- `git commit -m "Actualicé estilos del modal de estadísticas"`

### Subir cambios a GitHub
```bash
git push
```

## 🔄 Flujo de Trabajo Completo

Después de hacer cambios en tus archivos:

```bash
# 1. Ver qué cambió
git status

# 2. Agregar los cambios
git add .

# 3. Hacer commit
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push
```

## 📥 Descargar Cambios de GitHub

Si trabajas desde otra computadora o alguien más hizo cambios:

```bash
# Descargar los últimos cambios
git pull
```

## 📋 Comandos de Consulta

### Ver historial de commits
```bash
# Versión resumida (recomendado)
git log --oneline

# Versión completa
git log

# Ver últimos 5 commits
git log --oneline -5
```

### Ver diferencias antes de hacer commit
```bash
# Ver todos los cambios
git diff

# Ver cambios de un archivo específico
git diff app.js
```

### Ver información del repositorio remoto
```bash
git remote -v
```

## 🌿 Trabajar con Ramas (Branches)

### Ver ramas existentes
```bash
git branch
```

### Crear una nueva rama
```bash
git branch nombre-de-la-rama
```

### Cambiar a otra rama
```bash
git checkout nombre-de-la-rama
```

### Crear y cambiar a una nueva rama (en un solo comando)
```bash
git checkout -b nueva-funcionalidad
```

### Subir una nueva rama a GitHub
```bash
git push -u origin nombre-de-la-rama
```

### Fusionar una rama con main
```bash
# Primero cambia a main
git checkout main

# Luego fusiona la otra rama
git merge nombre-de-la-rama
```

## ⚠️ Comandos de Emergencia

### Deshacer cambios en un archivo (antes de commit)
```bash
git checkout -- app.js
```

### Deshacer el último commit (mantiene los cambios)
```bash
git reset --soft HEAD~1
```

### Ver qué archivos están siendo ignorados
```bash
git status --ignored
```

## 🎯 Ejemplos Prácticos

### Ejemplo 1: Agregaste una nueva función
```bash
git add .
git commit -m "Agregué función para filtrar jugadores por posición"
git push
```

### Ejemplo 2: Corregiste un bug
```bash
git add .
git commit -m "Corregí error en cálculo de porcentaje de asistencia"
git push
```

### Ejemplo 3: Actualizaste estilos
```bash
git add styles.css
git commit -m "Mejoré diseño responsive del modal de fechas"
git push
```

### Ejemplo 4: Trabajas desde otra computadora
```bash
# Primero descarga los cambios
git pull

# Haz tus modificaciones...

# Luego sube tus cambios
git add .
git commit -m "Actualicé lista de jugadores"
git push
```

## 🔗 Enlaces Útiles

- **Tu repositorio:** https://github.com/pcoy06/rugby-attendance-tracker
- **Documentación Git:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/

## 💡 Consejos

1. **Haz commits frecuentes** - Es mejor hacer varios commits pequeños que uno grande
2. **Mensajes descriptivos** - Escribe mensajes que expliquen QUÉ y POR QUÉ cambiaste algo
3. **Pull antes de push** - Si trabajas desde varios lugares, siempre haz `git pull` antes de empezar
4. **Revisa antes de commit** - Usa `git status` y `git diff` para ver qué vas a subir
5. **No subas archivos sensibles** - Nunca subas contraseñas, API keys, etc. (usa .gitignore)

## 🆘 ¿Problemas?

### "Updates were rejected"
```bash
# Primero descarga los cambios
git pull

# Luego intenta subir de nuevo
git push
```

### "Merge conflict"
```bash
# Abre los archivos en conflicto y edítalos manualmente
# Busca las líneas con <<<<<<, ======, >>>>>>
# Luego:
git add .
git commit -m "Resolví conflictos de merge"
git push
```

### Olvidaste agregar algo al último commit
```bash
# Haz los cambios que olvidaste
git add archivo-olvidado.js
git commit --amend --no-edit
git push --force
```
