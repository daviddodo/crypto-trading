<?php
session_start();
$app = $_SESSION["app"];

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '/Users/jonniequezada/Desktop/trading/backend/models/User.php';

$app->get('/users/getUser', function (Request $request, Response $response, array $args) {
   $data = $request->getParsedBody();

    $email = $data["username"];

    $user = new User($email, '');
    $user->getUser($username);

    $response->getBody()->write($email);
    /*
     * Add to Database here
     */

    return $response;
});

$app->post('/users/signup', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();

    $email = $data["email"];
    $password = $data["password"];

    $user = new User($email, $password);
    $user->addUser($email, $password);

    $response->getBody()->write($email);
    /*
     * Add to Database here
     */

    return $response->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});