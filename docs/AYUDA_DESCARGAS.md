# 📥 Solución: El navegador bloquea las descargas de Excel

Si al hacer clic en "Excel" o "Export Stats to Excel" no se descarga el archivo, es porque tu navegador está bloqueando las descargas automáticas por seguridad.

## 🔧 Soluciones por Navegador

### Google Chrome / Microsoft Edge

**Opción 1: Permitir en el momento**
1. Cuando hagas clic en "Excel", verás un ícono de descarga bloqueada en la barra de direcciones (arriba a la derecha)
2. Haz clic en ese ícono
3. Selecciona "Permitir descargas de este sitio"
4. Vuelve a hacer clic en el botón "Excel"

**Opción 2: Configuración permanente**
1. Abre Chrome/Edge
2. Ve a `chrome://settings/content/automaticDownloads` (copia y pega en la barra de direcciones)
3. En "Permitir", haz clic en "Agregar"
4. Escribe la URL de tu aplicación (ejemplo: `https://tudominio.com` o `file://` si es local)
5. Haz clic en "Agregar"

### Mozilla Firefox

**Opción 1: Permitir en el momento**
1. Cuando hagas clic en "Excel", verás una notificación en la parte superior
2. Haz clic en "Permitir"
3. Vuelve a hacer clic en el botón "Excel"

**Opción 2: Configuración permanente**
1. Abre Firefox
2. Ve a `about:preferences#privacy` (copia y pega en la barra de direcciones)
3. Busca la sección "Permisos"
4. Junto a "Bloquear ventanas emergentes", haz clic en "Excepciones"
5. Agrega la URL de tu aplicación
6. Haz clic en "Guardar cambios"

### Safari (Mac/iOS)

**Mac:**
1. Safari → Preferencias → Sitios web
2. Selecciona "Descargas" en el menú lateral
3. Encuentra tu sitio y selecciona "Permitir"

**iOS/iPad:**
1. Configuración → Safari
2. Desactiva "Bloquear ventanas emergentes" temporalmente
3. O usa Chrome/Firefox en iOS que manejan mejor las descargas

### Brave Browser

1. Haz clic en el ícono del león (Brave Shields) en la barra de direcciones
2. Desactiva "Bloquear scripts"
3. O agrega el sitio a las excepciones en `brave://settings/content`

## 🌐 Si usas la aplicación desde un archivo local (file://)

Algunos navegadores son más restrictivos con archivos locales. Soluciones:

**Opción 1: Usar un servidor local simple**
```bash
# Si tienes Python instalado:
python -m http.server 8000

# Luego abre: http://localhost:8000
```

**Opción 2: Subir a Hostinger**
- Sube los archivos a tu hosting
- Accede desde la URL real (https://tudominio.com)
- Los navegadores son menos restrictivos con sitios HTTPS

## ✅ Verificar que funciona

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Haz clic en el botón "Excel"
4. Si ves errores en rojo, cópialos y revisa el problema
5. Si no hay errores pero no descarga, es un bloqueo del navegador

## 🔍 Diagnóstico rápido

Abre la consola (F12) y ejecuta este comando:
```javascript
console.log('XLSX disponible:', typeof XLSX !== 'undefined');
```

- Si dice `true`: La librería está cargada correctamente
- Si dice `false`: Hay un problema con la carga de SheetJS

## 📱 En Móvil

**Android (Chrome):**
1. Menú (3 puntos) → Configuración
2. Configuración del sitio → Descargas automáticas
3. Permitir

**iOS (Safari):**
1. Los archivos se descargan a la carpeta "Descargas"
2. Abre la app "Archivos" para verlos
3. O usa Chrome/Firefox en iOS

## 🆘 Si nada funciona

**Alternativa: Usar el botón Print**
1. Haz clic en "🖨️ Print"
2. En el diálogo de impresión, selecciona "Guardar como PDF"
3. Guarda el PDF con la asistencia del día

**Alternativa: Copiar datos manualmente**
1. Abre las estadísticas con "📈 Stats"
2. Selecciona la tabla
3. Copia (Ctrl+C / Cmd+C)
4. Pega en Excel o Google Sheets

## 💡 Recomendación

Para la mejor experiencia:
1. Sube la aplicación a Hostinger con HTTPS
2. Usa Chrome o Firefox (mejor soporte para descargas)
3. Permite descargas del sitio la primera vez
4. Después funcionará automáticamente

---

Si sigues teniendo problemas, verifica:
- ✅ Que la URL de SheetJS se carga correctamente (mira en la consola)
- ✅ Que no tienes extensiones que bloqueen scripts (AdBlock, etc.)
- ✅ Que tu navegador está actualizado
