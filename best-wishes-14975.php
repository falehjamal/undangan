<?php
header('Content-Type: application/json');

$file = __DIR__ . '/best-wishes-14975.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($file)) {
        echo json_encode([]);
        exit;
    }

    $data = file_get_contents($file);
    if ($data === false || $data === '') {
        echo json_encode([]);
        exit;
    }

    $items = json_decode($data, true);
    if (!is_array($items)) {
        $items = [];
    }

    echo json_encode($items);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $payload = json_decode($input, true);

    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid payload']);
        exit;
    }

    $name = isset($payload['name']) ? trim($payload['name']) : '';
    $message = isset($payload['message']) ? trim($payload['message']) : '';

    if ($name === '' || $message === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Nama dan ucapan wajib diisi']);
        exit;
    }

    $name = mb_substr($name, 0, 100);
    $message = mb_substr($message, 0, 1000);

    if (file_exists($file)) {
        $existing = file_get_contents($file);
        $items = json_decode($existing, true);
        if (!is_array($items)) {
            $items = [];
        }
    } else {
        $items = [];
    }

    $items[] = [
        'name' => $name,
        'message' => $message,
        'createdAt' => date('c'),
    ];

    $encoded = json_encode($items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    file_put_contents($file, $encoded, LOCK_EX);

    echo json_encode($items);
    exit;
}
    
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
