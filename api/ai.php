<?php
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get the raw input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!isset($data['messages'])) {
    echo json_encode(['error' => 'No messages provided']);
    exit;
}

// Get API Key from environment variable (Vercel)
$openRouterKey = getenv('OPENROUTER_API_KEY');

if (!$openRouterKey) {
    echo json_encode(['error' => 'API key not configured']);
    exit;
}

$history = $data['messages'];

// System prompt to maintain persona
$systemPrompt = [
    'role' => 'system',
    'content' => 'You are "Sukari Companion", a gentle, empathetic, and culturally grounded AI assistant for Kenyans living with Type 2 diabetes or prediabetes. You understand local Kenyan foods (Ugali, Githeri, Managu, Skuma, etc.). Your tone is warm, non-judgmental, and encouraging. You don\'t give professional medical advice, but you provide practical tips on food pairing (e.g., eat greens first) and sustainable habits. Encourage users to stay "Sukari Smart".'
];

array_unshift($history, $systemPrompt);

$payload = [
    'model' => 'google/gemini-2.0-flash-exp:free', // Use a free/cheap model from OpenRouter
    'messages' => $history,
    'temperature' => 0.7,
];

$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $openRouterKey,
    'HTTP-Referer: https://sukarireset.vercel.app', // Required by OpenRouter
    'X-Title: Sukari Reset'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
} else {
    echo $response;
}

curl_close($ch);
