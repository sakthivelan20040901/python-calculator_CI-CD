package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

func inventory(w http.ResponseWriter, r *http.Request) {

	id := strings.TrimPrefix(r.URL.Path, "/inventory/")
	productID, _ := strconv.Atoi(id)

	response := map[string]interface{}{
		"product_id": productID,
		"stock":      20,
		"warehouse":  "Chennai",
		"status":     "In Stock",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/inventory/", inventory)
	http.ListenAndServe(":8081", nil)
}