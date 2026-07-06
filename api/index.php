<?php
// Vercel entry point: lives in /api/, routes all requests through root index.php
// __DIR__ here = /api/, so project root is one level up
require dirname(__DIR__) . '/index.php';
