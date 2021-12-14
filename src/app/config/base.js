
export const AppVersion = '1';
window.version = AppVersion;

export const RecaptchaSiteKey = '6LezK1YUAAAAADfj-NlrMQh_PETr7fzfYeRwCAaS';

export const AppConfig = {
    baseApiUrl: (endPoint) => {
        switch (process.env.NODE_ENV) {
            case 'production':
                return `https://app.wimdental.com/api/v1/api/${endPoint}`;
            default:
                return `http://127.0.0.1/api/${endPoint}`;
        }
    },
    wsServer: () => {
        switch (process.env.NODE_ENV) {
            case 'production':
                return "wss://api.wimdental.com:9304";
            default:
                return `ws://127.0.0.1:9304`;
        }
    },
    general: {
        appTitle: "WIM Administration",
        appLogo: '<span>WIM Administration</span>'

    },
};
