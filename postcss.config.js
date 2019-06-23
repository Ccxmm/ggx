module.exports = {

  plugins: {

      autoprefixer: {},

      "postcss-px2rem": {

          remUnit: 75,

          exclude: /node_modules|folder_name/i

      }

  }

}