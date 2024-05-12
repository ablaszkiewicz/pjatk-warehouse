Run the database using

```
docker-compose up
```

You can login to the database using these credentials

```
host: localhost
port: 1433
username: sa
password: Password1!
```

Run scripts in this order

```
scaffold.sql
seed.sql
load_scooters.sql
load_users.sql
load_rentals.sql
```
