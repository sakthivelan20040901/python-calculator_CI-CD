package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/products")
public class ProductController {

    @GetMapping
public List<Map<String,Object>> getProducts() {

    return List.of(

        // Electronics

        Map.of(
            "id",1,
            "name","Laptop",
            "price",50000,
            "category","Electronics",
            "image","https://source.unsplash.com/600x400/?laptop"
        ),

        Map.of(
            "id",2,
            "name","Mouse",
            "price",1000,
            "category","Electronics",
            "image","https://source.unsplash.com/600x400/?computer-mouse"
        ),

        Map.of(
            "id",3,
            "name","Keyboard",
            "price",2000,
            "category","Electronics",
            "image","https://source.unsplash.com/600x400/?keyboard"
        ),

        Map.of(
            "id",4,
            "name","Monitor",
            "price",12000,
            "category","Electronics",
            "image","https://source.unsplash.com/600x400/?monitor"
        ),

        Map.of(
            "id",5,
            "name","Phone",
            "price",25000,
            "category","Electronics",
            "image","https://source.unsplash.com/600x400/?smartphone"
        ),

        Map.of(
            "id",6,
            "name","Tablet",
            "price",18000,
            "category","Electronics",
            "image","https://source.unsplash.com/600x400/?tablet"
        ),

        Map.of(
            "id",7,
            "name","Headphones",
            "price",3500,
            "category","Electronics",
            "image","https://source.unsplash.com/600x400/?headphones"
        ),

        Map.of(
            "id",8,
            "name","Speaker",
            "price",4500,
            "category","Electronics",
            "image","https://source.unsplash.com/600x400/?speaker"
        ),

        Map.of(
            "id",9,
            "name","Webcam",
            "price",2500,
            "category","Electronics",
            "image","https://source.unsplash.com/600x400/?webcam"
        ),

        // Fashion

        Map.of(
            "id",10,
            "name","Shirt",
            "price",999,
            "category","Fashion",
            "image","https://source.unsplash.com/600x400/?shirt"
        ),

        Map.of(
            "id",11,
            "name","Jeans",
            "price",1499,
            "category","Fashion",
            "image","https://source.unsplash.com/600x400/?jeans"
        ),

        Map.of(
            "id",12,
            "name","Shoes",
            "price",2999,
            "category","Fashion",
            "image","https://source.unsplash.com/600x400/?shoes"
        ),

        Map.of(
            "id",13,
            "name","Watch",
            "price",4999,
            "category","Fashion",
            "image","https://source.unsplash.com/600x400/?watch"
        ),

        // Books

        Map.of(
            "id",14,
            "name","Java Programming",
            "price",799,
            "category","Books",
            "image","https://source.unsplash.com/600x400/?programming-book"
        ),

        Map.of(
            "id",15,
            "name","DevOps Handbook",
            "price",999,
            "category","Books",
            "image","https://source.unsplash.com/600x400/?devops"
        ),

        Map.of(
            "id",16,
            "name","Python Crash Course",
            "price",899,
            "category","Books",
            "image","https://source.unsplash.com/600x400/?python-book"
        )

    );
}

    @GetMapping("/{id}")
    public Map<String,Object> getProduct(@PathVariable int id) {

        return getProducts()
            .stream()
            .filter(p -> ((Integer)p.get("id")) == id)
            .findFirst()
            .orElse(Map.of());
    }
}