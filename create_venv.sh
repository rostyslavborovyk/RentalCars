#!/bin/bash
# This is a comment
cd quart_backend/
python3.8 -m venv venv

source venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt
