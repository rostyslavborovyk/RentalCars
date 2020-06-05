#!/bin/bash
# This is a comment
cd quart_backend/
source venv/bin/activate
export DATABASE_URL=mysql://srv84190_rost:pbhDcMq3Z@mysql-srv84190.hts.ru:3306/srv84190_cars

pytest

quart run
