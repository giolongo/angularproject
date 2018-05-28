###  
Prerequisiti  
- Scarica xampp con apache e mysql    
- Scarica ed installa nodejs  
- Scarica ed installa angular-cli  
- Scarica ed installa composer  
- Scarica ed installa git bash  
- Assicurati di avere i comandi `php`, `composer`, `ng`, `git` nel PATH  
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
6. Deve essere disponibile l'utenza database `root` senza password.  
7. Esegui `cd C:/Path/To/BEAngularProject/`  
8. Esegui `composer install`  
9. Esegui `php artisan migrate`   

NB: le credenziali del database come il nome del database sono personalizzabili tramite il file .env del BE
