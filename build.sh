#!/bin/bash
set -e

echo "Installing root dependencies..."
npm install

echo "Installing frontend dependencies..."
npm install --prefix ./frontend/lumina-scheduler

echo "Building frontend..."
npm run build --prefix ./frontend/lumina-scheduler

echo "Build completed successfully!"
