# Comparing Node.js Core Modules: HTTP, HTTPS, and HTTP/2
`http`, `https`, and `http2`. They all deal with handling web requests and responses,
but each one has its own purpose and use cases.

---

## 1. Purpose of Each Module

- **http** → The basic HTTP/1.1 module in Node.js. It’s simple, handles requests and responses, but everything is sent as plain text (not secure).
- **https** → Same as `http`, but with TLS/SSL encryption. This is what you use if you care about security and want to protect data in transit.
- **http2** → The newer HTTP/2 protocol. It’s faster and more efficient thanks to features like multiplexing and header compression. Most browsers require it to run over HTTPS.

---

## 2. Key Technical Differences (HTTP/1.1 vs HTTP/2)

- **Multiplexing**: HTTP/1.1 sends one request per connection, while HTTP/2 can send multiple at the same time.
- **Header Compression**: HTTP/2 compresses request/response headers to save bandwidth.
- **Server Push**: HTTP/2 can send files to the client before it even asks for them.
- **Encryption**: HTTP/1.1 doesn’t require it, but HTTP/2 is almost always used with TLS/SSL.

---

## 3. When to Use Each

- **http** → Local testing or internal apps where security doesn’t matter much.
- **https** → Public websites, APIs, or anything that handles sensitive information.
- **http2** → High-traffic apps, APIs that need speed, streaming platforms, or modern websites.

---

## 4. Comparison Table

| Module   | Protocol Version | Encryption | Key Features | Best For |
|----------|------------------|------------|--------------|----------|
| **http** | HTTP/1.1         | No       | Basic request–response handling, one request at a time | Testing, internal tools |
| **https**| HTTP/1.1         | Yes      | Same as http but secure | Public-facing apps, secure APIs |
| **http2**| HTTP/2           | Yes (in browsers) | Multiplexing, header compression, server push | High-performance, modern apps |

---

## 5. References

- [Node.js HTTP Docs](https://nodejs.org/api/http.html)  
- [Node.js HTTPS Docs](https://nodejs.org/api/https.html)  
- [Node.js HTTP/2 Docs](https://nodejs.org/api/http2.html)
