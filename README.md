# Neomall Project

Comencé este proyecto desarrollándolo únicamente con React y JavaScript, como una forma de afianzar mis conocimientos recientes sobre el framework.
Con el avance del proyecto, surgió la necesidad de profundizar en TypeScript, lo que me permitió tipar fuertemente la aplicación y mejorar la calidad y mantenibilidad del código.

Al seguir escalando el proyecto y adquirir nuevos conocimientos, identifiqué una limitación importante: la falta de cambios en la URL de la aplicación.
Para resolverlo, realicé las modificaciones necesarias para mejorar la experiencia del usuario, permitiendo una correcta navegación y visualización. 

Inicialmente consumía únicamente la API de [DummyJSON](https://dummyjson.com/docs/products), pero mi curiosidad y ganas de ir más allá me llevaron a aprender Node.js y el uso correcto de status codes, desarrollando así mi propia API de productos.
Esto me permitió implementar funcionalidades como CRUD del carrito, login de usuarios y autenticación mediante JWT (JSON Web Token).

En el backend trabajé con Node.js y Express, realizando conexiones a una base de datos MySQL, otra tecnología que aprendí a lo largo del proyecto.
Además, utilicé herramientas y conceptos como CORS, Morgan para el registro de peticiones, Zod para validación de esquemas y el patrón de diseño MVC.

Como último paso, a modo de prueba y con el objetivo de seguir mejorando la calidad del proyecto, aprendí a utilizar node:test para testear las peticiones de la API y asegurar una mejor experiencia de usuario.

👾 Tecnologías utilizadas: <br/>
* `React`
* `TypeScript`
* `Node.js`
* `Express`
* `MySQL`
* `DBngin`
* `Morgan`
* `Zod`

📕 Desafíos realizados: <br/>
* Autenticación de usuarios (JWT)
* Testing (node:test)
* Integración con MySQL

## 🚀 Para correr el proyecto: 
**Lado del servidor:** <br>
* cd server
* npm install
* npm run dev

**Lado del cliente:** <br>
* cd client
* npm install
* npm run dev

**Aclaraciones:** <br>
1. Necesitaras DBnging para correr el servidor.
2. Copiá `.env.example`, renombralo a `.env`
3. Completá las variables según tu entorno.

#

I started this project using only React and JavaScript as a way to strengthen my recent knowledge of the framework.
As the project evolved, the need to dive deeper into TypeScript arose, allowing me to strongly type the application and improve code quality and maintainability.

As I continued scaling the project and gaining more experience, I identified an important limitation: the lack of URL changes within the application.
To address this, I implemented the necessary improvements to enhance the user experience, enabling proper navigation and visualization.

Initially, the project consumed only the [DummyJSON](https://dummyjson.com/docs/products) API
. However, my curiosity and desire to go further led me to learn Node.js and the correct use of HTTP status codes, which allowed me to develop my own product API.
This made it possible to implement features such as shopping cart CRUD, user login, and authentication using JWT (JSON Web Token).

On the backend, I worked with Node.js and Express, connecting the application to a MySQL database, another technology I learned throughout the project.
I also used tools and concepts such as CORS, Morgan for request logging, Zod for schema validation, and the MVC design pattern.

As a final step, both as a learning exercise and to further improve the project’s quality, I learned how to use node:test to test API requests and ensure a better user experience.

👾 Technologies used:
* `React`
* `TypeScript`
* `Node.js`
* `Express`
* `MySQL`
* `DBngin`
* `Morgan`
* `Zod`

📕 Challenges implemented:
* User authentication (JWT)
* Testing (node:test)
* MySQL integration

## 🚀 How to run the project

**Server side:**  
- cd server  
- npm install  
- npm run dev  

**Client side:**  
- cd client  
- npm install  
- npm run dev  

**Notes:**  
1. You will need **DBngin** to run the database server.  
2. Copy `.env.example` and rename it to `.env`.  
3. Fill in the environment variables according to your setup.



