###  
Prerequisiti  
- Scarica xampp con apache e mysql    
- Scarica ed installa nodejs  
- Scarica ed installa angular-cli  
- Scarica ed installa typescript  
- Scarica ed installa composer  
- Scarica ed installa git bash  
- Assicurati di avere i comandi `php`, `composer`, `ng`, `git` nel PATH (eseguibili da terminale)  
- Esegui `git clone https://github.com/oraziocontarino/angularproject.git`  

###  
Configurazione BackEnd (BE)  
1. Accedi alla configurazione Apache (httpd.conf) ed incolla la seguente configurazione:  
`#!conf`  
`alias /angularproject/be C:/Path/To/BEAngularProject/public`
`<Directory "C:/Path/To/BEAngularProject/public">`
`AllowOverride all`  
`Require all granted`  
`</Directory>`  
NB: `C:/Path/To/BEAngularProject/public` è relativo al path locale del server, addattarlo al caso specifico.  
2. Avvia XAMPP  
3. Avvia il servizio Apache  
4. Avvia il servizio MySql  
5. Crea il database `angularproject`   
6. Esegui `cd C:/Path/To/BEAngularProject/`  
7. Esegui `composer install`  
8. Esegui `php artisan migrate`  
9. Esegui `php artisan jwt:secret`  
10. Crea un file con il seguente nome `.env` nella cartella BEAngularProject  
11. Nel file creato al punto precedente incolla la seguente configurazione (modificando opportunamente i paths e le credenziali):  
`APP_NAME=Laravel`  
`APP_ENV=local`  
`APP_KEY=base64:q1BKmFCaFMFQlMbugfnIubWMMLTt0J2kKVGbc++keG0=`  
`APP_DEBUG=true`  
`APP_URL=http://localhost`  
  
`LOG_CHANNEL=stack`  
  
`DB_CONNECTION=mysql`  
`DB_HOST=127.0.0.1`  
`DB_PORT={DATABASE PORT}`  
`DB_DATABASE={DATABASE NAME}`  
`DB_USERNAME={DATABASE USER}`  
`DB_PASSWORD={DATABASE PASSWORD }`  
  
`BROADCAST_DRIVER=log`  
`CACHE_DRIVER=file`  
`SESSION_DRIVER=file`  
`SESSION_LIFETIME=120`  
`QUEUE_DRIVER=sync`  
  
`REDIS_HOST=127.0.0.1`  
`REDIS_PASSWORD=null`  
`REDIS_PORT=6379`  
  
`MAIL_DRIVER=smtp`  
`MAIL_HOST={SMTP EMAIL}`  
`MAIL_PORT={PORT EMAIL}`  
`MAIL_USERNAME={USERNAME EMAIL}`  
`MAIL_PASSWORD={PASSWORD EMAIL}`  
`MAIL_ENCRYPTION=tls`  
  
`PUSHER_APP_ID=`  
`PUSHER_APP_KEY=`  
`PUSHER_APP_SECRET=`  
`PUSHER_APP_CLUSTER=mt1`  
  
`MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"`  
`MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"`  
  
`JWT_SECRET=IWyqOAwBYniWvrvdVsnJGAbSDZ5EdOF5`  
12. Nel .env appena modificato, impostare opportunamente i campi elencati: 
DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD  
Ex:  
DB_PORT=3306  
DB_DATABASE=angularproject  
DB_USERNAME=root   
DB_PASSWORD=  
MAIL_HOST=smtp.gmail.com  
MAIL_PORT=587  
MAIL_USERNAME=mario.rossi@gmail.com  
MAIL_PASSWORD=mySecretPasswd  

###  
Configurazione FrontEnd (FE)  
1. Esegui `cd C:/Path/To/FEAngularProject/` 
2. Esegui `npm install`  
3. Esegui `npm install -g @angular/cli@latest`  
4. Esegui `npm install --save @ng-bootstrap/ng-bootstrap`  

###
Avviare l'app
- Esegui `ng serve --open` dalla cartella FEAngularProject   
 


