# **App Name**: FileParser Pro

## Core Features:

- Configuración SMB: Panel para configurar la conexión SMB (dirección IP, carpeta compartida, credenciales) y probar la conexión a la ruta de archivos. El acceso al panel requiere credenciales.
- Búsqueda de Datos en Archivos Locales: Permitir a los usuarios buscar datos en archivos XML (carpeta 'firma') y CDR (carpeta 'RPTA') ubicados en la ruta local especificada a través de SMB (\\192.168.1.134\install\datasun3\botica\sunat_archivos\sfs\). Incluye soporte para búsqueda por RUC, tipo de documento, y número de comprobante. Los archivos XML siguen el formato '20546008879-01-FM01-0001570.xml' y los CDR el formato 'R20546008879-01-FM01-0001570.zip'. Si no se encuentra el documento, se mostrará una alerta.
- Descarga de Documento: Permitir la descarga del documento encontrado.

## Style Guidelines:

- Color primario: Azul Profundo (#3F51B5) para representar confiabilidad y enfoque en los datos.
- Color de fondo: Gris Claro (#F0F2F5), proporcionando un telón de fondo neutral.
- Color de acento: Naranja Vibrante (#FF9800) para llamadas a la acción y resaltado de datos importantes.
- Fuente: 'Inter', sans-serif, para una visualización de texto clara y moderna en toda la aplicación.
- Utilizar iconos minimalistas para representar tipos de archivo y acciones.
- Mantener un diseño limpio y estructurado para asegurar que los datos sean fácilmente comprensibles. Diseño similar a una web de consultas.
- Transiciones y animaciones sutiles para proporcionar retroalimentación durante el procesamiento de archivos.