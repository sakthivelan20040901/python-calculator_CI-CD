package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @GetMapping
    public List<String> getStudents() {
        return List.of("Sakthivelan", "Pranesh", "Kumar");
    }

    @GetMapping("/{id}")
    public String getStudent(@PathVariable int id) {
        return "Student ID: " + id;
    }
}