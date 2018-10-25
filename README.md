# lightswitch
The feature switch service

## Usage

`npx lightswitch serve -d /path/to/data -b /path/to/config.toml`

## Config

The config bundles are written using TOML. Here is an example:

```toml
[all]
  enableHeader = true

[org.1234]
  enableHeader = false
[org.4321]
  enableHeader = false
  superSpeed = true
```
