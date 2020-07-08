export DATABASE_URL=mysql://srv84190_rost:pbhDcMq3Z@mysql-srv84190.hts.ru:3306/srv84190_cars
export TEST_DATABASE_URL=mysql://srv84190_rost:pbhDcMq3Z@mysql-srv84190.hts.ru:3306/srv84190_carstest
export QUART_APP=asgi.py

pytest

quart run
pwd
