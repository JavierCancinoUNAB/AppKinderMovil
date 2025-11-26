# KinderJump - Sistema de Gestión de Asistencia para Jardines Infantiles

## Documento de Presentación del Proyecto

---

## 1. INTRODUCCIÓN

### 1.1 ¿Qué es KinderJump?

KinderJump es una aplicación móvil desarrollada para facilitar el registro y seguimiento de asistencia de estudiantes en jardines infantiles y establecimientos educativos de nivel inicial. La aplicación permite a los educadores y administradores gestionar de manera eficiente la información de los estudiantes, registrar su asistencia diaria y consultar el historial de registros.

### 1.2 Problema que Resuelve

Los jardines infantiles tradicionalmente llevan el control de asistencia mediante registros en papel o planillas manuales, lo que genera:
- Pérdida de tiempo en procesos administrativos
- Riesgo de pérdida o deterioro de información
- Dificultad para generar reportes y estadísticas
- Falta de acceso remoto a la información

KinderJump digitaliza este proceso, permitiendo un registro rápido, seguro y accesible desde dispositivos móviles.

### 1.3 Objetivo del Proyecto

Proveer una solución móvil moderna, intuitiva y confiable que permita a los educadores:
- Registrar asistencia de manera rápida y eficiente
- Gestionar la información de los estudiantes
- Consultar historiales y generar reportes
- Acceder a la información desde cualquier lugar

---

## 2. FUNCIONALIDADES DE LA APLICACIÓN

### 2.1 Sistema de Autenticación Segura

**Inicio de Sesión con Email y Contraseña**
- Los usuarios pueden acceder a la aplicación mediante credenciales personales
- Sistema de autenticación basado en Firebase para máxima seguridad
- Validación de credenciales en tiempo real
- Mensajes de error claros y específicos para guiar al usuario

**Inicio de Sesión con Google**
- Opción de autenticación mediante cuenta de Google
- Proceso simplificado sin necesidad de recordar contraseñas adicionales
- Cumple con los requisitos de seguridad de Google
- Integración completa con Firebase Authentication

**Seguridad**
- Tokens de autenticación JWT (JSON Web Tokens) para proteger las sesiones
- Comunicación encriptada entre la aplicación y el servidor
- Cierre de sesión seguro que elimina credenciales del dispositivo

### 2.2 Panel Principal (Dashboard)

El dashboard es la pantalla principal después del inicio de sesión y presenta:

**Diseño Visual Atractivo**
- Gradiente de colores morado-rosa siguiendo lineamientos de diseño modernos
- Interfaz limpia y minimalista
- Iconografía clara y comprensible

**Opciones Principales**
1. **Asistencia Rápida**: Acceso directo al registro de asistencia del día
2. **Ver Registros**: Consulta del historial completo de asistencia
3. **Ver Estudiantes**: Gestión del catálogo de estudiantes

### 2.3 Gestión de Estudiantes

**Visualización del Listado**
- Lista completa de todos los estudiantes registrados
- Información resumida de cada estudiante (nombre, curso, edad)
- Avatares con iniciales para identificación visual rápida
- Búsqueda y filtrado de estudiantes

**Agregar Nuevo Estudiante**
- Formulario intuitivo para registro de nuevos estudiantes
- Campos requeridos:
  - Nombre completo
  - Edad
  - Curso o nivel
  - Información adicional opcional (foto, fecha de nacimiento, descripción)
- Validación de datos antes del registro
- Confirmación visual al completar el registro

**Editar Información de Estudiantes**
- Modificación de datos existentes
- Preservación del historial del estudiante
- Actualización en tiempo real
- Confirmación de cambios

**Eliminar Estudiantes**
- Opción de eliminar registros (con confirmación de seguridad)
- Advertencia antes de eliminar para evitar borrados accidentales
- Proceso irreversible claramente indicado

### 2.4 Registro de Asistencia

**Asistencia Rápida**
- Vista optimizada para el registro diario
- Lista de todos los estudiantes del día
- Opciones de estado:
  - **Presente**: El estudiante asistió
  - **Ausente**: El estudiante no asistió
  - **Tardanza**: El estudiante llegó tarde
- Indicadores visuales con colores distintivos
- Registro múltiple en una sola operación
- Timestamp automático de fecha y hora

**Proceso de Registro**
1. El educador accede a "Asistencia Rápida"
2. Visualiza la lista de estudiantes del grupo
3. Selecciona el estado de asistencia para cada estudiante
4. Puede agregar notas o comentarios opcionales
5. Confirma el registro
6. El sistema guarda la información con fecha y hora automáticas

### 2.5 Historial de Asistencia

**Visualización de Registros**
- Listado cronológico de todos los registros de asistencia
- Información detallada por registro:
  - Nombre del estudiante
  - Fecha y hora del registro
  - Estado de asistencia
  - Notas adicionales (si existen)
- Diseño visual con badges de colores según el estado
- Scroll infinito para navegación de registros extensos

**Filtros y Búsqueda**
- Filtrado por fecha
- Filtrado por estudiante
- Filtrado por estado de asistencia
- Búsqueda rápida por nombre

**Estadísticas** (funcionalidad futura)
- Porcentaje de asistencia por estudiante
- Reportes mensuales
- Gráficos de tendencias

---

## 3. INTERFAZ DE USUARIO Y EXPERIENCIA

### 3.1 Principios de Diseño

**Simplicidad**
- Interfaz minimalista que evita elementos innecesarios
- Navegación intuitiva sin curva de aprendizaje pronunciada
- Acciones principales siempre visibles y accesibles

**Consistencia Visual**
- Paleta de colores uniforme en toda la aplicación
- Tipografía legible y coherente
- Iconografía estandarizada

**Accesibilidad**
- Contraste de colores adecuado para facilitar la lectura
- Tamaños de fuente apropiados
- Botones y elementos táctiles de tamaño generoso

### 3.2 Flujo de Navegación

```
Inicio de Sesión
    ↓
Dashboard (Panel Principal)
    ├── Asistencia Rápida → Registro del día → Confirmación
    ├── Ver Registros → Historial → Detalle de registro
    └── Ver Estudiantes → Lista → Agregar/Editar/Eliminar
```

### 3.3 Elementos Visuales

**Colores Principales**
- Morado/Violeta: Color primario de la aplicación
- Rosa: Color secundario para gradientes
- Verde: Indicador de "Presente"
- Rojo: Indicador de "Ausente"
- Naranja/Amarillo: Indicador de "Tardanza"

**Componentes**
- Botones con bordes redondeados
- Cards (tarjetas) para información agrupada
- Gradientes suaves para fondos
- Sombras sutiles para profundidad

---

## 4. ARQUITECTURA TÉCNICA (Vista No Técnica)

### 4.1 Componentes del Sistema

**Aplicación Móvil**
- Funciona en dispositivos Android
- Compatible con versiones recientes del sistema operativo
- Puede instalarse desde archivo APK o desde Expo Go

**Servidor Backend**
- Procesa las peticiones de la aplicación
- Almacena la información de manera segura
- Gestiona la autenticación de usuarios

**Base de Datos**
- Almacena información de estudiantes
- Guarda registros de asistencia
- Mantiene usuarios y credenciales de acceso

**Servicios de Autenticación**
- Firebase Authentication para inicio de sesión
- Integración con Google Sign-In
- Generación y validación de tokens de seguridad

### 4.2 Flujo de Datos

1. **Usuario inicia sesión** → Firebase valida credenciales → Servidor genera token de sesión
2. **Usuario registra asistencia** → App envía datos al servidor → Servidor almacena en base de datos
3. **Usuario consulta historial** → Servidor recupera datos → App muestra información formateada

### 4.3 Seguridad y Privacidad

- Toda comunicación está encriptada
- Las contraseñas nunca se almacenan en texto plano
- Los tokens de sesión expiran automáticamente
- Solo usuarios autenticados pueden acceder a la información

---

## 5. GUÍA DE USO

### 5.1 Primer Acceso

**Paso 1: Instalación**
- Descargar la aplicación KinderJump
- Instalar en el dispositivo Android
- Abrir la aplicación

**Paso 2: Inicio de Sesión**
- Ingresar email y contraseña proporcionados por el administrador
- O seleccionar "Iniciar con Google" para usar cuenta de Google
- Presionar el botón "Iniciar Sesión"

**Paso 3: Exploración del Dashboard**
- Familiarizarse con las tres opciones principales
- Revisar el diseño y navegación

### 5.2 Registro Diario de Asistencia

**Proceso Paso a Paso:**

1. **Acceder a Asistencia Rápida**
   - Desde el dashboard, presionar "Asistencia Rápida"

2. **Visualizar Lista de Estudiantes**
   - Aparecerá la lista completa de estudiantes del grupo
   - Cada estudiante tiene un selector de estado

3. **Marcar Asistencia**
   - Tocar sobre cada estudiante
   - Seleccionar estado: Presente, Ausente o Tardanza
   - El color del registro cambiará según la selección

4. **Agregar Notas (Opcional)**
   - Si es necesario, agregar comentarios adicionales
   - Por ejemplo: "Llegó tarde por cita médica"

5. **Confirmar Registro**
   - Presionar botón "Guardar Asistencia"
   - Esperar confirmación visual
   - El registro quedará guardado con fecha y hora automáticas

### 5.3 Gestión de Estudiantes

**Agregar un Nuevo Estudiante:**

1. Ir a "Ver Estudiantes" desde el dashboard
2. Presionar el botón "+" o "Agregar Estudiante"
3. Completar el formulario:
   - Nombre completo
   - Edad
   - Curso/Nivel
   - (Opcional) Foto, fecha de nacimiento, notas
4. Presionar "Guardar"
5. El estudiante aparecerá en la lista inmediatamente

**Editar Información de un Estudiante:**

1. En la lista de estudiantes, tocar sobre el estudiante a editar
2. Presionar el ícono de edición (lápiz)
3. Modificar los campos deseados
4. Presionar "Guardar Cambios"
5. La información se actualizará instantáneamente

**Eliminar un Estudiante:**

1. En la lista, tocar sobre el estudiante
2. Presionar el ícono de eliminar (papelera)
3. Confirmar la acción en el mensaje de advertencia
4. El estudiante será eliminado permanentemente

### 5.4 Consulta de Historial

**Ver Registros Históricos:**

1. Desde el dashboard, seleccionar "Ver Registros"
2. Explorar la lista cronológica de registros
3. Cada registro muestra:
   - Nombre del estudiante
   - Fecha y hora
   - Estado de asistencia (con color distintivo)
   - Notas adicionales

**Aplicar Filtros:**

1. Presionar el ícono de filtro
2. Seleccionar criterios:
   - Rango de fechas
   - Estudiante específico
   - Estado de asistencia
3. Aplicar filtros
4. La lista se actualizará mostrando solo registros que cumplan los criterios

### 5.5 Cierre de Sesión

1. Desde cualquier pantalla, acceder al menú (ícono de hamburguesa o perfil)
2. Seleccionar "Cerrar Sesión"
3. Confirmar la acción
4. La aplicación volverá a la pantalla de inicio de sesión

---

## 6. CASOS DE USO PRÁCTICOS

### 6.1 Caso: Registro de Asistencia Matutino

**Escenario:**
La educadora llega al jardín infantil a las 8:00 AM y debe registrar la asistencia de su grupo de 20 estudiantes.

**Proceso con KinderJump:**
1. Abre la aplicación e inicia sesión (15 segundos)
2. Selecciona "Asistencia Rápida" (5 segundos)
3. Va marcando cada estudiante según lleguen (2-3 minutos)
4. Guarda el registro (5 segundos)

**Tiempo total:** Aproximadamente 3-4 minutos

**Beneficio:** Comparado con registro en papel (5-10 minutos), ahorra tiempo y elimina errores de transcripción.

### 6.2 Caso: Consulta de Asistencia de un Estudiante

**Escenario:**
Los padres de un estudiante solicitan conocer el historial de asistencia del último mes.

**Proceso con KinderJump:**
1. Educadora accede a "Ver Registros"
2. Filtra por nombre del estudiante
3. Selecciona rango de fechas (último mes)
4. Revisa los registros o genera reporte

**Tiempo total:** 1-2 minutos

**Beneficio:** Información instantánea sin necesidad de revisar cuadernos o planillas físicas.

### 6.3 Caso: Incorporación de Nuevo Estudiante

**Escenario:**
Un nuevo estudiante se incorpora al jardín infantil en mitad del año escolar.

**Proceso con KinderJump:**
1. Educadora accede a "Ver Estudiantes"
2. Presiona "Agregar Estudiante"
3. Completa información básica
4. Guarda el registro

**Tiempo total:** 2 minutos

**Beneficio:** El estudiante queda inmediatamente disponible para registro de asistencia sin necesidad de procesos administrativos adicionales.

---

## 7. BENEFICIOS Y VENTAJAS

### 7.1 Para Educadores

**Ahorro de Tiempo**
- Registro de asistencia 50% más rápido que métodos tradicionales
- Eliminación de transcripciones manuales
- Búsqueda instantánea de información

**Reducción de Errores**
- Validación automática de datos
- Timestamps precisos
- Eliminación de errores de escritura manual

**Accesibilidad**
- Información disponible desde cualquier lugar
- No necesita estar en el aula para consultar datos
- Acceso simultáneo de múltiples usuarios (si está autorizado)

### 7.2 Para Administradores

**Centralización de Información**
- Todos los registros en un solo lugar
- Fácil generación de reportes
- Respaldo automático de información

**Trazabilidad**
- Registro de quién, cuándo y qué se modificó
- Historial completo de cambios
- Auditoría de accesos

**Escalabilidad**
- Funciona igual con 10 o 100 estudiantes
- Preparado para crecimiento del establecimiento
- Posibilidad de agregar más funcionalidades

### 7.3 Para Padres y Apoderados

**Transparencia** (funcionalidad futura)
- Posibilidad de consultar asistencia de sus hijos
- Notificaciones automáticas
- Comunicación directa con educadores

**Tranquilidad**
- Confirmación de llegada al establecimiento
- Registro de observaciones importantes
- Historial accesible

---

## 8. REQUISITOS Y COMPATIBILIDAD

### 8.1 Requisitos del Dispositivo

**Sistema Operativo**
- Android 7.0 (Nougat) o superior
- Se recomienda Android 10 o más reciente para mejor rendimiento

**Hardware**
- Procesador: Quad-core 1.5 GHz o superior
- Memoria RAM: Mínimo 2 GB (recomendado 4 GB)
- Almacenamiento: 100 MB de espacio disponible
- Pantalla: Resolución mínima 720p

**Conectividad**
- Conexión a Internet (WiFi o datos móviles)
- GPS (opcional, para funcionalidades futuras)

### 8.2 Requisitos de Conectividad

**Internet**
- Velocidad mínima: 2 Mbps
- Conexión estable para sincronización en tiempo real
- Funcionalidad offline limitada (próxima actualización)

**Servidor Backend**
- Debe estar en ejecución
- Accesible desde la red local o Internet
- IP configurada: 192.168.100.18:3000 (configurable)

---

## 9. SOPORTE Y MANTENIMIENTO

### 9.1 Actualizaciones

**Frecuencia**
- Actualizaciones menores: Mensuales
- Actualizaciones mayores: Trimestrales
- Parches de seguridad: Cuando sea necesario

**Proceso de Actualización**
- Notificación dentro de la app
- Descarga automática (Expo Go) o manual (APK)
- Sin pérdida de datos

### 9.2 Soporte Técnico

**Canales de Contacto**
- Email: soporte@kinderjump.com
- Chat dentro de la aplicación
- Documentación online

**Horario de Atención**
- Lunes a Viernes: 9:00 - 18:00
- Respuesta en menos de 24 horas

### 9.3 Respaldo de Información

**Frecuencia de Respaldos**
- Automático: Cada 6 horas
- Manual: Disponible cuando se requiera

**Retención**
- Respaldos diarios: 7 días
- Respaldos semanales: 1 mes
- Respaldos mensuales: 1 año

---

## 10. ROADMAP Y FUNCIONALIDADES FUTURAS

### 10.1 Corto Plazo (3 meses)

- **Modo Offline**: Registro de asistencia sin conexión a Internet
- **Notificaciones Push**: Alertas a padres cuando sus hijos llegan/salen
- **Reportes PDF**: Exportación de historiales en formato PDF
- **Fotografías de Estudiantes**: Gestión de fotos de perfil

### 10.2 Mediano Plazo (6 meses)

- **Portal de Padres**: Acceso para que padres consulten asistencia
- **Múltiples Cursos**: Gestión de varios grupos simultáneamente
- **Estadísticas Avanzadas**: Gráficos y tendencias de asistencia
- **Integración Calendario**: Sincronización con Google Calendar

### 10.3 Largo Plazo (12 meses)

- **Comunicación Bidireccional**: Chat entre educadores y padres
- **Gestión de Actividades**: Registro de actividades diarias
- **Evaluaciones**: Sistema de evaluación de estudiantes
- **Reportes Personalizados**: Generación de reportes a medida

---

## 11. GLOSARIO DE TÉRMINOS

**APK**: Archivo de instalación de aplicaciones Android

**Backend**: Parte del sistema que procesa la información en el servidor

**Dashboard**: Panel principal de la aplicación con acceso a las funciones principales

**Firebase**: Plataforma de Google para autenticación y servicios en la nube

**JWT (JSON Web Token)**: Sistema de tokens de seguridad para sesiones

**Timestamp**: Marca de fecha y hora exacta de un evento

**UI/UX**: Interfaz de Usuario / Experiencia de Usuario

**Badge**: Etiqueta visual que indica estado o categoría

**Expo Go**: Aplicación para ejecutar proyectos Expo en desarrollo

**EAS (Expo Application Services)**: Servicio para compilar y distribuir aplicaciones

---

## 12. CONCLUSIÓN

KinderJump representa una solución moderna y eficiente para la gestión de asistencia en establecimientos educativos de nivel inicial. Su interfaz intuitiva, funcionalidades completas y enfoque en la simplicidad la convierten en una herramienta valiosa para educadores y administradores.

La aplicación no solo digitaliza el proceso de registro de asistencia, sino que también proporciona una plataforma escalable para futuras funcionalidades que mejorarán la comunicación entre el establecimiento educativo y las familias.

Con KinderJump, los jardines infantiles pueden dedicar menos tiempo a tareas administrativas y más tiempo a lo que realmente importa: el cuidado y educación de los niños.

---

## 13. INFORMACIÓN DEL PROYECTO

**Nombre del Proyecto:** KinderJump - Sistema de Gestión de Asistencia

**Versión:** 1.0.0

**Fecha de Lanzamiento:** Noviembre 2025

**Desarrollador:** Javier Cancino

**Repositorio:** https://github.com/JavierCancinoUNAB/AppKinderMovil

**Licencia:** Propietaria

**Contacto:**
- Email: contacto@kinderjump.com
- GitHub: JavierCancinoUNAB

---

**Documento generado el:** 26 de Noviembre de 2025

**Versión del Documento:** 1.0
