<?php

header('Content-Type: application/json');

if(isset($_GET['price'])){

    $price = (int)$_GET['price'];

    $tax = $price * 0.18;
    $shipping = 500;
    $discount = 1000;

    $total = $price + $tax + $shipping - $discount;

    echo json_encode([
        "price" => $price,
        "tax" => $tax,
        "shipping" => $shipping,
        "discount" => $discount,
        "total" => $total
    ]);

}
else{

    echo json_encode([
        "service" => "Billing Service Running"
    ]);

}