package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

type Inventory struct {
	ProductID int    `json:"product_id"`
	Stock     int    `json:"stock"`
	Warehouse string `json:"warehouse"`
	Status    string `json:"status"`
}

var inventoryData = map[int]Inventory{

	// Electronics

	1: {1, 25, "Chennai", "In Stock"},
	2: {2, 150, "Bangalore", "In Stock"},
	3: {3, 75, "Mumbai", "In Stock"},
	4: {4, 12, "Delhi", "Limited Stock"},
	5: {5, 0, "Hyderabad", "Out Of Stock"},
	6: {6, 18, "Chennai", "In Stock"},
	7: {7, 45, "Pune", "In Stock"},
	8: {8, 8, "Delhi", "Limited Stock"},
	9: {9, 32, "Bangalore", "In Stock"},

	17: {17, 10, "Chennai", "Limited Stock"},
	18: {18, 14, "Mumbai", "In Stock"},
	19: {19, 6, "Delhi", "Limited Stock"},
	20: {20, 120, "Bangalore", "In Stock"},
	21: {21, 85, "Hyderabad", "In Stock"},

	// Fashion

	10: {10, 100, "Tiruppur", "In Stock"},
	11: {11, 85, "Coimbatore", "In Stock"},
	12: {12, 40, "Chennai", "In Stock"},
	13: {13, 20, "Mumbai", "Limited Stock"},

	22: {22, 130, "Tiruppur", "In Stock"},
	23: {23, 55, "Bangalore", "In Stock"},
	24: {24, 70, "Chennai", "In Stock"},
	25: {25, 28, "Mumbai", "Limited Stock"},

	// Books

	14: {14, 60, "Chennai", "In Stock"},
	15: {15, 45, "Bangalore", "In Stock"},
	16: {16, 55, "Delhi", "In Stock"},

	26: {26, 35, "Pune", "In Stock"},
	27: {27, 20, "Mumbai", "Limited Stock"},
	28: {28, 50, "Chennai", "In Stock"},
	29: {29, 25, "Bangalore", "In Stock"},
	30: {30, 18, "Delhi", "Limited Stock"},
}

func inventory(w http.ResponseWriter, r *http.Request) {

	id := strings.TrimPrefix(r.URL.Path, "/inventory/")

	productID, err := strconv.Atoi(id)

	if err != nil {

		http.Error(
			w,
			"Invalid Product ID",
			http.StatusBadRequest,
		)

		return
	}

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	if data, ok := inventoryData[productID]; ok {

		json.NewEncoder(w).Encode(data)

	} else {

		json.NewEncoder(w).Encode(
			map[string]interface{}{
				"product_id": productID,
				"stock":      0,
				"warehouse":  "Unknown",
				"status":     "Product Not Found",
			},
		)
	}
}

func health(w http.ResponseWriter, r *http.Request) {

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(w).Encode(
		map[string]string{
			"service": "inventory-service",
			"status":  "healthy",
		},
	)
}

func allInventory(w http.ResponseWriter, r *http.Request) {

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(w).Encode(inventoryData)
}

func main() {

	http.HandleFunc(
		"/inventory/",
		inventory,
	)

	http.HandleFunc(
		"/inventory",
		allInventory,
	)

	http.HandleFunc(
		"/health",
		health,
	)

	println("Inventory Service Running on :8081")

	http.ListenAndServe(
		":8081",
		nil,
	)
}
