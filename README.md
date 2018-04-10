# Disponibilidad

Pasos para inicializar el proyecto:

En el caso de linux, dependiendo de la distribución se debe primero instalar el openvpn como root o sudo así:

$ sudo apt-get install openvpn

Una vez instalado, debe descargar los archivos de configuración (OpenVPN-Linux-ConfigFiles.zip). Copia como root o sudo, estos archivos de configuración a:

$ unzip OpenVPN-Linux-ConfigFiles.zip
$ cd OpenVPN-Linux-ConfigFiles
$ sudo cp * /etc/openvpn

Para conectarse a la VPN:

$ cd /etc/openvpn
$ sudo openvpn --config config.conf

alli le pide user/password, y listo. Ya una vez dentro de la VPN se puede ingresar a la direccion IP http://10.131.137.188 desde cualquier navegador.

1. Arquitectura

![alt text](https://i.imgur.com/o3h13Oa.png)

2. Balanceador:

El balanceador se hizo con HAproxy y tiene como nodo principal o master el DCA http://10.131.137.188 el cual tiene como tarea dividir el numero de peticiones entre el nodo 2 (http://10.131.137.206) y nodo 3 (http://10.131.137.168) con el algoritmo Roundrobin.

![alt text](https://i.imgur.com/nPj1ycH.png)

<div style="text-align:center"><img src ="https://i.imgur.com/gJfQP4H.png" /></div>

3. Replica set de MongoDB:

El master es el DCA nodo 2 http://10.131.137.206 que tiene como nodos secundarios o esclavos a el nodo 1 (http://10.131.137.188) y el nodo 3 (http://10.131.137.168)

![alt text](https://i.imgur.com/BiNmyFX.png)
![alt text](https://i.imgur.com/XUgOOIC.png)

# Pasos Web App

Creada por Juan Pablo Londoño (jlondo96@eafit.edu.co)

# Descripción

Aplicacion creada con node.js en la cual puedes ver por donde caminas en la ciudad.

# Requisitos Funcionales

- Poder ver en tiempo real los lugares por donde caminas

- Cambiar tu información personal


# Definicion De Tecnología

- Lenguaje de programación: node.js / javascript

- Framework web - backend: Express

- Framework web - frontend: ejs

- Web app server: node.js

- Web server: Nginx

- Base de datos: MongoDB

# Diseño

El diseño de la app utiliza el generado por el framework express que es un modelo mvc.

# Instalación & ejecución del proyecto
```bash
$ sudo npm install -g grunt
$ git clone https://github.com/jlondo96/topicosTelematica.git
$ npm install
$ grunt
```

