<!--BORRADO POR YA NO SER RELEVANTE
# Archivos con comentarios a leer

1. flipper/src/styles/globals.css
2. flipper/src/index.tsx
3. flipper/src/\_document.tsx-->

# Uso horario

como la mayoria del equipo es argentino decidi que seria mejor usar la hora argentina (en este readme toda hora esta expresada en hora argentina GMT-3)
hora colombia GMT-5

# Tecnologias

1. Javascript Framework: NextJS seteado con typescript, optimizar para que tenga un highlight score de 100 o cercano (esto se hace para mejorar la SEO y que la pagina genere mas traccion cuando se lanze al publico)
   1. https://github.com/GoogleChrome/lighthouse#using-lighthouse-in-chrome-devtools (para medir performance y SEO del sitio)
2. Database: PostgreSQL con Supabase
3. ORM: Prisma<!--Sequelize CAMBIADO POR MARCOS-->
4. CSS: Tailwind CSS
5. Auth: JWT

# Diseño

## Diseño login

![login_design](https://res.cloudinary.com/dok0di4qp/image/upload/v1681489507/flipper-henry-project/login_c5j2p7.jpg)

## Diseño register

![register_design](https://res.cloudinary.com/dok0di4qp/image/upload/v1681489507/flipper-henry-project/formulario-creacion-usuario_edo5le.jpg)

## Diseño crear evento

![create_event_design](https://res.cloudinary.com/dok0di4qp/image/upload/v1681489506/flipper-henry-project/formulario-creacion-de-evento_hfvbam.jpg)

# Roles

1. Usuario
2. Empresa
3. Admin (Juan zapata)

# Organizacion

1. Backend: Franco Aglieri, Marcos Cuadrado, Pablo Swistoniuk
2. Frontend: Dante Nicolas Kaddarian, Sebastian Marchetti

# Sprint (sujeto a cambios)

Se termina el sprint cada viernes a las 12hs (horario original 10hs, cambiado a 12hs por que Pablo Swistoniuk trabaja)

# Demo

https://preview.flutterflow.app/logistica-3n4mvd/LETB1G5BoH9v8jMRp5r1  
Cuenta empresa: juanfe@gmail.com  
Clave 12345678  
Cuenta usuario: sierra@gmail.com  
Clave 12345678

# Url Map

## /home

US #6 #10 #13 ADMIN-EMPRESA-TRABAJADOR

## /home/create-events

US #1 EMPRESA

## /home/:id D

US #2 #5 #12 EMPRESA-USUARIO

## /register

US #3

## / landing page

ACA IRIA EL LOGIN

## /dashboard

(restringir solo para usuarios admin) US #4 ADMIN
Ver Usuarios y empresas registrados

## /home/history

US #8 #9 EMPRESA-USUARIO

# URL diagram

<!--
BORRADO POR QUEDAR DESACTUALIZADO
![url_flow](https://res.cloudinary.com/dok0di4qp/image/upload/v1681499114/flipper-henry-project/url-flow_mcvnnw.png)

NOTA: events/:id/cancelform fue removido por ser innecesario-->

![url_flow](https://res.cloudinary.com/dok0di4qp/image/upload/v1682176877/flipper-henry-project/Screenshot_2023-04-22_12-20-37_bmk66j.png)
