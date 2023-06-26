export type Encoding = "GSM_7BIT" | "GSM_7BIT_EXT" | "UTF16";

const GSM_7BIT_REGEXP =
  /^[@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&'()*+,\-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà]*$/;
const GSM_7BIT_EXT_REGEXP =
  /^[@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&'()*+,\-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà^{}\\[~\]|€]*$/;
const GSM_7BIT_EXT_CHAR_REGEXP = /^[\^{}\\[~\]|€]$/;

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
  let length = text.length;

  if (encoding === "GSM_7BIT_EXT") {
    length += countGsm7bitExt(text);
  }

  let characterPerMessage = messageLength[encoding];
  if (length > characterPerMessage) {
    characterPerMessage = multiMessageLength[encoding];
  }

  const messages = Math.ceil(length / characterPerMessage);

  let inCurrentMessage = length;
  if (messages > 0) {
    inCurrentMessage = length - characterPerMessage * (messages - 1);
  }

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
  switch (false) {
    case text.match(GSM_7BIT_REGEXP) == null:
      return "GSM_7BIT";
    case text.match(GSM_7BIT_EXT_REGEXP) == null:
      return "GSM_7BIT_EXT";
    default:
      return "UTF16";
  }
};

const countGsm7bitExt = (text: string) => {
  const match = text.match(GSM_7BIT_EXT_CHAR_REGEXP);
  return match ? match.length : 0;
};
