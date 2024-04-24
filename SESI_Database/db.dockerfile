FROM mysql

ENV MYSQL_ROOT_PASSWORD Senai115
ENV MYSQL_USER api
ENV MYSQL_PASSWORD Senai115

COPY ./BANCO_DE_DADOS.sql /docker-entrypoint-initdb.d/


WORKDIR /var/lib/mysqld

# https://stackoverflow.com/questions/62999267/how-to-run-mysql-scripts-in-docker-image#62999651
