#language: es
Característica: Flujo de autenticación y compra en SauceDemo

  Escenario: Inicio de sesión exitoso y compra de un producto (Camino feliz)
    Dado que el usuario está en la página de inicio de sesión
    Cuando inicia sesión con usuario "standard_user" y contraseña "secret_sauce"
    Y agrega el producto "Sauce Labs Backpack" al carrito
    Y completa el proceso de compra con nombre "Laura", apellido "García" y código postal "110111"
    Entonces debería ver el mensaje "Thank you for your order!"

  Escenario: Inicio de sesión fallido con credenciales inválidas
    Dado que el usuario está en la página de inicio de sesión
    Cuando inicia sesión con usuario "locked_out_user" y contraseña "secret_sauce"
    Entonces debería ver el mensaje de error "Sorry, this user has been locked out."

  Escenario: Ordenar productos por menor precio
    Dado que el usuario está en la página de inicio de sesión
    Cuando inicia sesión con usuario "standard_user" y contraseña "secret_sauce"
    Y ordena los productos por "Price (low to high)"
    Entonces el primer producto mostrado debería tener el precio más bajo
