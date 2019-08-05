# Bank Holidays Manager  
The following guide will allow you to setup the develop environment under Windows Os.  
The project uses Laravel and Angular frameworks.  
The project can be set up in Linux Os too.  

# Configuration: Global develop environment  
### Prerequisites  
- **Git CLI**  
### Init workspace  
- Download and install git CLI  
- Run on terminal:  
  ```  
  git clone https://github.com/oraziocontarino/angularproject.git  
  ```  
  
# Configuration: Laravel develop environment  
### Prerequisites    
- **COMPOSER**  
- **XAMPP** 
  - Apache  
  - MySQL  
  
### Init workspace
- Add to `PATH` environment variable the following commands: `php`, `composer`.
- Run on terminal:  
  
  ```  
  cd angularproject/BEAngularProject  
  ```  

- Open `XAMPP` installation folder and edit the `httpd.conf` file under `xampp\apache\conf` folder.  
Copy/Paste the following configuration at the bottom of the file:  

    ```  
    #!conf  
    alias /angularproject/be "C:/Path/To/angularproject/BEAngularProject/public"  
    <Directory "C:/Path/To/angularproject/BEAngularProject/public">  
    AllowOverride all  
    Require all granted  
    </Directory>  
    ```
    (Change `C:/Path/To/` with the absolute path of `angularproject`, downloaded previously from git with `git clone...` command)  
  
- Run `XAMPP` client.
- From `XAMPP` client run the following services: `Apache`, `MySQL`.
- Configure a new database via `PhpMyAdmin` web panel: `http://localhost/phpmyadmin`.  
    - Click on `new`.  
    - Insert `angularproject` as name of new database.  
    - Confirm.  
- Open new terminal in the `angularproject/BEAngularProject` folder.  
- Run in terminal:  
  
  ```  
  copy .env.example .env  
  ```  
  
  laravel configuration file will be initialized.   
- Replace laravel configuration `.env` content with the following content:  
  
    ```  
    APP_NAME=Laravel
    APP_ENV=local
    APP_KEY=
    APP_DEBUG=true
    APP_URL=http://localhost
    #------------------#
    LOG_CHANNEL=stack
    #------------------#
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=angularproject
    DB_USERNAME=root
    DB_PASSWORD=
    #------------------#
    BROADCAST_DRIVER=log
    CACHE_DRIVER=file
    SESSION_DRIVER=file
    SESSION_LIFETIME=120
    QUEUE_DRIVER=sync
    #------------------#
    REDIS_HOST=127.0.0.1
    REDIS_PASSWORD=null
    REDIS_PORT=6379
    #------------------#
    MAIL_DRIVER=smtp
    MAIL_HOST=
    MAIL_PORT=
    MAIL_USERNAME=
    MAIL_PASSWORD=
    MAIL_ENCRYPTION=tls
    #------------------#
    PUSHER_APP_ID=
    PUSHER_APP_KEY=
    PUSHER_APP_SECRET=
    PUSHER_APP_CLUSTER=mt1
    #------------------#
    MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
    MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
    #------------------#
    JWT_SECRET=
    ```

- Run in terminal:  

  ```  
  composer install  
  php artisan key:generate  
  php artisan jwt:secret  
  php artisan migrate  
  php artisan db:seed --class=InitDatabaseSeeder  
  ```  

# Configuration: Angular develop environment  
### Prerequisites:  
- NodeJS   
### Init workspace  
- Add to `PATH` environment variable the following commands: `npm`, `ng`, `ts`.  
- Run in terminal:  

  ```  
  cd C:/Path/To/FEAngularProject/  
  npm install  
  ng serve --open  
  ```  

### Demo access credentials  
- Manager user:  
  Username: `CNTRZO94P28C351T`  
  Password: `prova123`  
- Employee user:  
  Username: `LNGGNN93P12C351O`  
  Password: `prova321`  
  
### Author
- Orazio Contarino (Holiday Management)  
- Giovanni Longo (Skills Management)  
