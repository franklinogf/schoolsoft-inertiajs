#!/bin/sh
cd domains/schoolsoftusa.com/ && php artisan queue:work --stop-when-empty --tries=3 --timeout=90 --json 


