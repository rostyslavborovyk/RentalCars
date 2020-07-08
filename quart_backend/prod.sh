#!/bin/bash

hypercorn asgi:app --debug --access-logfile - --reload -w 1 --bind 0.0.0.0:5000
