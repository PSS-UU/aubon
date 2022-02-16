# AUBON

## Installing backend

1. Install postgresql
    - Ubuntu: <https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart>
    - Mac: <https://www.postgresqltutorial.com/install-postgresql-macos/>
2. Create a database called `aubon` in postgresql. If you are using Ubuntu for windos (WSL) you need to manually start the database after installing it by running `sudo service postgresql start`.
    - Ubuntu: `createdb aubon`
    - Mac: use the application pgAdmin
3. Run `cd backend`
4. Copy `.env-template` and rename it to `.env` and fill in the variables:
    - DB_USER: The name of the database user you created in step 2
    - DB_PASSWORD: The password for the database user you created in step 2
    - DB_HOST (optional): If you host is not available via the default (localhost) you can change it here.
    - DB_PORT: If you changed the default port (5432) during installation you need to enter that port here.
5. Run `npm install`
6. Install db-migrate `npm install -g db-migrate`
7. Setup the database with `db-migrate up`
8. Run `npm start` to start the server. 

If you are running Ubuntu for Windows (WSL) you need to run `sudo service postgresql start` to start the database the first time you start your terminal.

### Updating the database

If you need to make a change to the database (add a column, add a key etc.) you do so with db-migrate. 
With db-migrate you create `migrations` where you write the changes you want to make to the database.
That way those changes can get committed and everyone can update their database to the correct version.

To create a migration, run `db-migrate create <name_of_the_migration_file>` which creates the migration file.
Instructions for what to write in the migration can be found in their [documentation](https://db-migrate.readthedocs.io/en/latest/API/SQL/).

To apply recent migrations, run `db-migrate up`

## Installing Flutter for the app

1. Install Flutter (https://docs.flutter.dev/get-started/install)
2. Update your path variable (see https://docs.flutter.dev/get-started/install/macos#update-your-path)
3. Run `flutter doctor` to check for dependencies
4. If the doctor finds any issues, instructions on how to solve them will be given by the doctor
