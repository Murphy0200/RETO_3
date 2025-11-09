# RETO_3 - Automatización de Pruebas UI y API

## Descripción

Este proyecto corresponde al **Reto Práctico #3** del Diplomado de Automatización Inteligente de Pruebas de Software.  
Incluye:

- **Pruebas UI**: Automatización de flujos con **Cucumber + Playwright**.  
- **Pruebas API**: Validación de endpoints de login y usuarios con **Jest + node-fetch**.  
- **Reportes**: Generación de reportes **HTML separados** para UI y API.  

## Requisitos

Antes de ejecutar el proyecto, tener instalado:

- **Node.js** ≥ 22  
- **npm** ≥ 10  
- Git 
- Typescrit
- Cucumber 
- Playwright 


Instala las dependencias del proyecto:


`npm ci`


Ejecución de pruebas
1. Ejecutar todos los tests (UI + API) y generar reportes

`npm run test:all`

Esto hará:

Ejecutar los tests UI con Cucumber + Playwright

Generar el reporte HTML de UI en: reports/cucumber_report.html

Ejecutar los tests API con Jest

Generar el reporte HTML de API en: reports/api/index.html 

2. Ejecutar solo UI

`npm run test:ui      # Ejecuta los tests UI'
`npm run report:html  # Genera el reporte HTML UI'

Reporte generado: reports/cucumber_report.html

3. Ejecutar solo API

`npm run test:api`

Reporte generado: reports/api/index.html

## Ambientes cubiertos

Local: Ejecución en máquina de desarrollo con Node.js

CI/CD GitHub Actions:

Ejecuta pruebas automáticamente en cada push a la rama main

Genera reportes HTML de UI y API

Posibilidad de publicar reportes en GitHub Pages


