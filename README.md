# Sms-length 💌 📏

A simple utility function to understand how many sms will be required to send a text message via SMS. Largely inspired by sms-counter.

## Installation

```
npm install sms-length

yarn add sms-length
```

## Usage

```js
import { count } from "sms-length";

count("This is a simple text message");

/*

Returns: {
  encoding: "GSM_7BIT",
  length: 29,
  characterPerMessage: 160,
  remaining: 131,
  messages: 1,
}

*/
```

## Thanks to

https://github.com/danxexe/sms-counter
