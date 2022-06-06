export const SERVER = {
  BASE_URL:
    process.env.NODE_ENV === "production"
      ? `https://api.lemonpayapp.com`
      : "https://api.lemonpayapp.com",
};

export const SIZES = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const CLIENT = {
  DEVICE: {
    mobileS: `(min-width: ${SIZES.mobileS})`,
    mobileM: `(min-width: ${SIZES.mobileM})`,
    mobileL: `(min-width: ${SIZES.mobileL})`,
    tablet: `(min-width: ${SIZES.tablet})`,
    laptop: `(min-width: ${SIZES.laptop})`,
    laptopL: `(min-width: ${SIZES.laptopL})`,
    desktop: `(min-width: ${SIZES.desktop})`,
    desktopL: `(min-width: ${SIZES.desktop})`,
  },
};

export const CONFIG = { SERVER, CLIENT };
