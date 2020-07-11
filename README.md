# Chinchin
REST API para el mercado de criptomonedas 

A continuacion se presentan las rutas de la API de la prueba 


## Servicio 1 Entrega los valores de todas las monedas en USD

1. **Para conseguir el valor de todas las monedas en USD**
https://chichin-api.herokuapp.com/coins   

2. **Obtiene elvalor de solo las monedas BS y PTR**
https://chichin-api.herokuapp.com/local 

3. **AL hacer put se edita el precio del Bs al dolar**
https://chichin-api.herokuapp.com/local/5f0a29f058949322dca2cd5e 

4. **AL hacer put se edita el precio del Bs al Petro**
https://chichin-api.herokuapp.com/local/5f0a2ad339e9581b00e48a58 

## Servicio 2 Conversor de monedas 
Transforma una cantida de una moneda al resto cambiando la Moneda y cantidad, por ejemplo:

  1. https://chichin-api.herokuapp.com/transform/**Moneda**/**cantidad** 
  2. https://chichin-api.herokuapp.com/transform/BTC/1
  3. https://chichin-api.herokuapp.com/transform/ETH/2
 

