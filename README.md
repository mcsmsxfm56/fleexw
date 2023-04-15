# Uso horario

como la mayoria del equipo es argentino decidi que seria mejor usar la hora argentina (en este readme toda hora esta expresada en hora argentina GMT-3)
hora colombia GMT-5

# Tecnologias

1. Javascript Framework: NextJS seteado con typescript, optimizar para que tenga un highlight score de 100 o cercano (esto se hace para mejorar la SEO y que la pagina genere mas traccion cuando se lanze al publico)
   1. https://github.com/GoogleChrome/lighthouse#using-lighthouse-in-chrome-devtools (para medir performance y SEO del sitio)
2. Database: PostgreSQL
3. ORM: Sequelize
4. CSS: Tailwind CSS

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
4. Invitado (Usuario no registrado)

# User Stories (agregar a issues)

formato "Como [Rol], quiero [objetivo del software], para lograr [resultado]"

1. Como **Empresa**, quiero crear eventos, para lograr que el **Usuario** los conozca y se inscriba
   1. la empresa solo puede ver sus eventos creados
   2. Pasada la fecha del evento debe borrarse (borrado logico, el borrado logico es que el evento no se ve mas pero el admin juan zapata puede seguir viendolo en el dashboard admin)
   3. Formulario crear evento
      1. Nombre del evento
      2. fecha del evento (dd/mm/aa)
      3. horario
      4. lugar
      5. cantidad de personas
      6. perfil
      7. pago
      8. observaciones
2. Como **Empresa**, quiero poder autorizar la entrada del **Usuario** al evento, para decidir que **Usuario** puede entrar y cual no
3. Como **Usuario**, quiero registrarme en la pagina, para tener un usuario
   1. Telefono Celular
   2. Email
   3. Contraseña
   4. Rol (empresa o usuario)
   5. Nombre Y Apellido
   6. Tipo de identificacion y numero(cedula, tarjeta de identidad, pasaporte, nit)
4. Como **Admin**, quiero tener un dashboard, para poder manejar mejor el sitio
   1. Ver Usuarios y empresas registrados
5. Como **Empresa**, quiero poder ver los usuarios anotados en mi evento, para saber cuanta gente ira a mi evento
6. Como **Usuario**, quiero poder ver todos los eventos, para saber en cual quiero participar
7. Como **Usuario**, quiero que se me notifique por email si se me autorizo para ir al evento, asi se si tengo que ir o no
8. Como **Usuario**, quiero tener un historial de los eventos a los que fui, por motivos de consulta
9. Como **Empresa**, quiero tener un historial de los eventos que cree, por motivos de consulta
10. Como **Empresa**, quiero poder descargar un excel con todos los datos del evento, por motivos de consulta
    1. Podes descargar el excel de un evento en especifico o el excel de todos los eventos del mes
11. Como **Empresa**, quiero que cuando cancele el evento se envia una notificacion por email a los invitados, asi saben que no deben asistir
12. Como **Empresa**, quiero que la pestaña confirmar evento solo aparezca si hay por lo menos una persona para confirmar, asi se si hay gente para confirmar en el evento
13. Como **Empresa**, quiero tener un filtro en la seccion de mis eventos para verlos como mas quiera, asi me organizo mejor
    1. Filtros (de evento mas cercano a mas lejano-de mas lejano a mas cercano)

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

## /events DONE

US #6 #10 #13 ADMIN-EMPRESA-USUARIO

## /events/create-events DONE

US #1 EMPRESA

## /events/:id/cancelform DONE

US #11 EMPRESA

## /events/:id DONE

US #2 #5 #12 EMPRESA-USUARIO

## /register DONE

US #3

## /login landing page DONE

## /dashboard

(restringir solo para usuarios admin) US #4 ADMIN
Ver Usuarios y empresas registrados

## /history

US #8 #9 EMPRESA-USUARIO

# URL diagram

![url_flow](https://res.cloudinary.com/dok0di4qp/image/upload/v1681499114/flipper-henry-project/url-flow_mcvnnw.png)

# Datos personales de participantes

Swistoniuk Pablo
