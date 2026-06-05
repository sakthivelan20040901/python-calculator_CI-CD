package main

import (
	"encoding/json"
	"net/http"
	"runtime"
)

func systemInfo(w http.ResponseWriter, r *http.Request) {
	info := map[string]string{
		"os": runtime.GOOS,
		"arch": runtime.GOARCH,
	}
	json.NewEncoder(w).Encode(info)
}

func main() {
	http.HandleFunc("/", systemInfo)
	http.ListenAndServe(":8081", nil)
}