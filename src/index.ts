export type Encoding = "GSM_7BIT" | "GSM_7BIT_EXT" | "UTF16";

export const GSM_7BIT_REGEXP =
  /^[@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&'()*+,\-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà]*$/;
export const GSM_7BIT_EXT_REGEXP =
  /^[@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&'()*+,\-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà^{}\\[~\]|€]*$/;
export const GSM_7BIT_EXT_CHAR_REGEXP = /[\^{}\\[~\]|€]/g;

const messageLength: { [key in Encoding]: number } = {
  GSM_7BIT: 160,
  GSM_7BIT_EXT: 160,
  UTF16: 70,
};

const multiMessageLength: { [key in Encoding]: number } = {
  GSM_7BIT: 153,
  GSM_7BIT_EXT: 153,
  UTF16: 67,
};

export const count = (text: string) => {
  const encoding = detectEncoding(text);
  const length =
    encoding === "GSM_7BIT_EXT"
      ? text.length + (text.match(GSM_7BIT_EXT_CHAR_REGEXP) ?? []).length
      : text.length;

  let characterPerMessage = messageLength[encoding];
  if (length > characterPerMessage) {
    characterPerMessage = multiMessageLength[encoding];
  }

  const messages = Math.ceil(length / characterPerMessage);

  const inCurrentMessage =
    messages > 0 ? length - characterPerMessage * (messages - 1) : length;

  let remaining = characterPerMessage * messages - length;
  if (remaining === 0 && messages === 0) {
    remaining = characterPerMessage;
  }

  return {
    encoding,
    length,
    characterPerMessage,
    inCurrentMessage,
    remaining,
    messages,
  };
};

const detectEncoding = (text: string): Encoding => {
  if (text.match(GSM_7BIT_REGEXP) != null) {
    return "GSM_7BIT";
  }

  if (text.match(GSM_7BIT_EXT_REGEXP) != null) {
    return "GSM_7BIT_EXT";
  }

  return "UTF16";
};
