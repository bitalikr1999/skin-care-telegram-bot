#!/bin/sh
set -e

MOD=cli node dist/main.js seed
exec env MOD=bot node dist/main.js
