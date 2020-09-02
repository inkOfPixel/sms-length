import { count } from "./index";

test("Single message with only default characters", async () => {
  const message = "simple message";

  const response = count(message);
  expect(response).toEqual({
    encoding: "GSM_7BIT",
    length: 14,
    characterPerMessage: 160,
    remaining: 146,
    messages: 1,
  });
});

test("Test all GSM_7BIT chars", async () => {
  const message =
    " !\"#$%&'()*+,-./0123456789:;<=>?@abcdefghijklmnopqrstuvwxyz\n\rABCDEFGHIJKLMNOPQRSTUVWXYZ£¥§¿_ΔΦΓΛΩΠΨΣΘΞèéùìòÇØøÅåÆæßÉÄÖÑÜäöñüà¤¡";

  const response = count(message);
  expect(response).toEqual({
    encoding: "GSM_7BIT",
    length: 127,
    characterPerMessage: 160,
    remaining: 33,
    messages: 1,
  });
});

test("Test all GSM_7BIT_EXT chars", async () => {
  const message = "^{}\\[~]|€";

  const response = count(message);
  expect(response).toEqual({
    encoding: "GSM_7BIT_EXT",
    length: 18,
    characterPerMessage: 160,
    remaining: 142,
    messages: 1,
  });
});

test("Special chars are treated as unicode - no shift table are enabled", async () => {
  const message = "Â";

  const response = count(message);
  expect(response).toEqual({
    encoding: "UTF16",
    length: 1,
    characterPerMessage: 70,
    remaining: 69,
    messages: 1,
  });
});

test("Message with more than 306 char due to extended chars", async () => {
  const message = `Ultime Ore Al -56%.
Se non l'hai ancora fatto, non perdere la tua Ultima Occasione per prendere i tuoi fantastici Horizon In Edizione Limitata a Soli 34.99€ anzichè 80€
La Promo è valida fino a 00.00
Consegna Gratuita.
Ordinali Subito su https://ysms.me/u/3IAeLge

Per Rinunciare https://ysms.me/u/wNT2Bb3`;

  const response = count(message);
  expect(response).toEqual({
    encoding: "GSM_7BIT_EXT",
    length: 307,
    characterPerMessage: 153,
    remaining: 152,
    messages: 3,
  });
});
