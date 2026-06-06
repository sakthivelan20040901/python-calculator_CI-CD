<?php

header('Content-Type: application/json');

$price = isset($_GET['price'])
    ? (float)$_GET['price']
    : 0;

$category = isset($_GET['category'])
    ? $_GET['category']
    : '';

$tax = $price * 0.18;

$shipping = ($price > 5000)
    ? 0
    : 100;

$discount = 0;

switch ($category) {

    case "Electronics":

        if ($price > 40000)
            $discount = $price * 0.10;

        elseif ($price > 20000)
            $discount = $price * 0.08;

        elseif ($price > 5000)
            $discount = $price * 0.05;

        break;

    case "Fashion":

        if ($price > 3000)
            $discount = $price * 0.15;

        elseif ($price > 1000)
            $discount = $price * 0.10;

        else
            $discount = $price * 0.05;

        break;

    case "Books":

        $discount = $price * 0.05;

        break;
}

$total =
    $price +
    $tax +
    $shipping -
    $discount;

echo json_encode([

    "price" => $price,

    "category" => $category,

    "tax" => round($tax,2),

    "shipping" => round($shipping,2),

    "discount" => round($discount,2),

    "total" => round($total,2)

]);