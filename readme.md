## Are Redis Connections Really Lightweight? 

This benchmark test compare the latency numbers of two approaches:

1- EPHEMERAL CONNECTIONS: We do not reuse the connection. Instead we create a new connection for each command and close the connection immediately. We record the latency of client creation, ping() and client.quit() together. See the `bench()` method in the code.

2- REUSE CONNECTIONS: We create a connection once and reuse the same connection for all commands. Here, we record the latency of `ping()` operation. See the `benchReuse()` method.

See [the blog post](https://blog.upstash.com/redis-connection-benchmark).