# Api Documentation

Accounts use discord OAuth bearer tokens to authenticate. You can get one using the following link: `https://discord.com/oauth2/authorize?client_id=1328707016142880818&response_type=token&redirect_uri=http%3A%2F%2Ftimezones.vt.dog%2Fauth&scope=identify`

## Base URL

`https://timezones.vt.dog`

## Accounts

### Get account information

```http
GET /accounts/{id}
```

#### Example Responses

200 OK

```json
{
  "id": 1,
  "timezone": "America/Vancouver",
  "linkedAccounts": {
    "discord": "123456789012345678",
    "twitter": "ArtificialVR",
    "bsky": "arti.gay",
    "github": "ArtificialVR",
  }
}
```

404 Not Found

```json
{

  "error": 404,
  "message": "User not found",
}
```

### Create Account

```http
POST /accounts/create
```

#### Example Request Body

```json
{
    "accessToken": "fmIGwwxNXgrgLp73lDff2iQ8FKbrvb",
    "timezone": "America/Vancouver",
}
```

#### Example Responses

200 OK

```json
{
  "id": 1,
  "timezone": "America/Vancouver",
  "linkedAccounts": {
    "discord": "123456789012345678",
    "twitter": "ArtificialVR",
    "bsky": "arti.gay",
    "github": "ArtificialVR",
  }
}
```

400 Bad Request

```json
{

  "error": 400,
  "message": "User already exists",
}
```

### Update user information

```http
POST /accounts/{id}/update
```

#### Example Request Body

```json
{
    "accessToken": "fmIGwwxNXgrgLp73lDff2iQ8FKbrvb",
    "timezone": "America/Vancouver", //optional
    "twitter": "ArtificialVR", //optional
    "bsky": "arti.gay", //optional
    "github": "ArtificialVR", //optional
}
```

#### Example Responses

200 OK

```json
{
  "id": 1,
  "timezone": "America/Vancouver",
  "discord": "123456789012345678",
  "twitter": "ArtificialVR",
  "bsky": "arti.gay",
  "github": "ArtificialVR",
}
```

401 Not Authorized

```json
{
  "error": 401,
  "message": "Not authorized to update this user.",
}
```

404 Not Found

```json
{
  "error": 404,
  "message": "User not found",
}
```

## Lookup

### Platforms

#### Bluesky

```http
GET /lookup/bsky/{username}
```

#### Discord

```http
GET /lookup/discord/{id}
```

#### Twitter

```http
GET /lookup/twitter/{username}
```

#### Github

```http
GET /lookup/github/{username}
```

### Example Responses

200 OK

```json
{
  "timezone": "America/Vancouver",
  "currentTime": "12:43 PM",
    "currentDate": "1/15/25",
  "currentOffset": "-08:00",
 "linkedAccounts": {
    "discord": "532053122017787924",
    "twitter": "ArtificialVR",// if defined
    "bsky": "arti.gay",// if defined
    "github": "artifishvr" // if defined
  },
  "serverTime": "2025-01-15T20:43:16.701Z",

}
```

404 Not Found

```json
{
  "error": 404,
  "message": "User not found",
}
```
