const { colors } = require("tailwindcss/defaulttheme");

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                teal: {
                    500: "#14B8A6",
                    600: "#0D9488",
                    700: "#0F766E",
                },
                crimson: "#EE4865",
                danger: colors.red[500],
                success: colors.green[500],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
