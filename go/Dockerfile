FROM golang:1.25 AS builder

WORKDIR /app
COPY . .
RUN go build -o main main.go

FROM debian:bookworm-slim

WORKDIR /app
COPY --from=builder /app/main .

EXPOSE 8081

CMD ["./main"]