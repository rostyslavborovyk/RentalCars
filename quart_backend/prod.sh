#!/bin/bash

hypercorn asgi:app -w 1 --bind 0.0.0.0:5000
