interface CookieOptions {
  path?: string;
  expires?: Date | number | string;
  [key: string]: string | number | Date | boolean | undefined;
}

export function setCookie(
  name: string,
  value: string,
  props: CookieOptions = {}
): void {
  const options: CookieOptions = {
    path: '/',
    ...props,
  };

  let exp = options.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = options.expires = d;
  }
  if (exp instanceof Date && exp.toUTCString) {
    options.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;

  for (const propName in options) {
    updatedCookie += `; ${propName}`;
    const propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { 'max-age': -1 });
}