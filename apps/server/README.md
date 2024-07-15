# Alex Kidd Jan Ken Pon Server

## Delete all containers

```bash
docker rm $(docker ps -a -q)
```

## Delete specific container

```bash
docker rm <container_id>
```

## Build

```bash
docker build -t alexkidd-jankenpon:latest .
```

## Run

```bash
docker run -d -p 3000:3000 --name rspserver alexkidd-jankenpon:latest
```

## Stop

```bash
docker stop alexkidd-jankenpon
```

