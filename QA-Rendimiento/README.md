# QA - Rendimiento

Creada por Juan Pablo Londoño (jlondo96@eafit.edu.co)

# Analisis del rendimiento

Para la primera revisión del rendimiento se realizo una prueba con jmeter en nuestro ambiente local, en el cual se realizo la prueba con 100.000 usuarios que entran a la pagina principal de la aplicación durante 10 segundos, con lo cual se generan 10.000 usuarios concurrentes cada segundo.

![](https://github.com/WilferSalas/TopicosTelematica2/blob/master/QA-Rendimiento/prueba1.png?raw=true "")

El tiempo promedio que arrojo la prueba es de 142 ms y con una desciación  de 198 ms, el maximo tiempo ms en un request fue de 3000 ms.

![](https://github.com/WilferSalas/TopicosTelematica2/blob/master/QA-Rendimiento/prueba3.png?raw=true "")

# Analisis a la mejora del rendimiento

Como nuestra app solo tiene una sona critica para el rendimiento que es el profile, nos centramos en ese, que al ser la pagina principal, será donde los usuarios estaran mas tiempo y es donde harán mas request ya que en primera instancia se llama cada 5 segundos a la funcion para optener la posición actual, por lo cual si se acumulan muchos usuarios, habrán muchos request y los tiempos de respuesta subiran generando picos muy altos para algunos usuarios, se cambio este metodos por uno en el cual analisa la distancia avanzada por el usuario y se le da un tiempo dependiendo de la distancia que este recorra, con este cambio se hizo una nueva prueba igual a la anterior pero con este cambio, se obtuvo el siguiente resultado:

![](https://github.com/WilferSalas/TopicosTelematica2/blob/master/QA-Rendimiento/prueba5.png?raw=true "")

Con esto se mostro que el tiempo promedio bajo 1 milisegundo y la desviacion bajo, con lo cual se analiza que si aumentan mas usuarios, menos peticiones por segundo resivira la aplicacion.

Ahora hicimos la misma prueba pero aplicandolo al servidor principal en el dca y con el balanceador de carga creado con nginx y funcionando, este nos arrojo el siguiente resultado:

![](https://github.com/WilferSalas/TopicosTelematica2/blob/master/QA-Rendimiento/prueba6.png?raw=true "")

Con lo cual se muestra que la aplicación tuvo mejorias en cuestión de rendimiento con los cambios hechos.
