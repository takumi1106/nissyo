<?php
// PHPでAPIキーを隠す
$api_key = "fwlCEtK5ImAgiW7H8TSGBnG8ELvOBPQipq6o";

// microCMS APIを呼ぶ
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://h68alpphzq.microcms.io/api/v1/news?limit=3",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "X-MICROCMS-API-KEY: {$api_key}"
    ]
]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch news", "message" => $err]);
    exit;
}

// JSONとしてブラウザに返す
header("Content-Type: application/json");
echo $response;
