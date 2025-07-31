# Web Infrastructure Summative Project

This repository demonstrates a containerized web infrastructure setup using Docker and HAProxy for load balancing. It includes two static web servers, a load balancer using **round-robin** balancing, and API access to [PokeAPI](https://pokeapi.co/) for sample data integration.


## 📦 Docker Hub Images

* **Web Servers**

  * [`https://hub.docker.com/r/acearnold/web_infra_summative-web-01`](https://hub.docker.com/r/acearnold/web_infra_summative-web-01)
  * [`https://hub.docker.com/r/acearnold/web_infra_summative-web-02`](https://hub.docker.com/r/acearnold/web_infra_summative-web-02)
* **Load Balancer**

  * [`https://hub.docker.com/r/acearnold/web_infra_summative-lb-01`](https://hub.docker.com/r/acearnold/web_infra_summative-lb-01)

Each image is a lightweight container running either Nginx (web servers) or HAProxy (load balancer).


## 🛠️ Build Instructions

To build the images locally:

```bash
# Web01
docker build -t acearnold/web_infra_summative-web-01 -f ./web/Dockerfile .

# Web02
docker build -t acearnold/web_infra_summative-web-02 -f ./web/Dockerfile .

# Load Balancer
docker build -t acearnold/web_infra_summative-lb-01 -f ./lb/Dockerfile .
```


## 🚀 Run Instructions

To run the containers:

```bash
# Web01
docker run -d --name web01 -p 8081:80 acearnold/web_infra_summative-web-01

# Web02
docker run -d --name web02 -p 8082:80 acearnold/web_infra_summative-web-02

# Load Balancer (HAProxy)
docker run -d --name lb -p 80:80 acearnold/web_infra_summative-lb-01
```

> You can pass additional environment variables or volumes if needed.


## ⚖️ Load Balancer Configuration

**HAProxy (`haproxy.cfg`) snippet:**

```haproxy
frontend http_front
    bind *:80
    default_backend http_back

backend http_back
    balance roundrobin
    server web01 web01:80 check
    server web02 web02:80 check
```

### Reloading HAProxy:

```bash
docker exec -it lb service haproxy reload
```


## ✅ Testing & Verification

### Manual Testing

Use curl or a browser to verify **round-robin** balancing:

```bash
curl http://localhost
```

Reload several times — you should see alternating content from Web01 and Web02.

### Screenshot Proof

See `proof of load balancing .png` in this repository.


## 🌐 External API Integration

This project uses [PokeAPI](https://pokeapi.co/) to fetch public Pokémon data on the web servers.

* API calls are made from JavaScript to `https://pokeapi.co/api/v2/pokemon/{name}`
* No credentials required

> All credits for Pokémon data go to [PokeAPI](https://pokeapi.co/).


## 📂 Project Tree

```bash
.
├── Dockerfile
├── README.md
├── compose.yml
├── haproxy.cfg
├── index.html
├── javascript.js
├── lb/
│   └── Dockerfile
├── nginx.conf
├── proof of load balancing .png
├── run.sh
├── styles.css
└── wallpaperflare.com_wallpaper (7).jpg
```

## Youtube link
* https://www.youtube.com/watch?v=CaJXhP5qA84

## 👤 Author

* GitHub: [AceArnold](https://github.com/AceArnold)
* Docker Hub: [https://hub.docker.com/u/acearnold](https://hub.docker.com/u/acearnold)

