const cssNanoProductionOptions = {
  preset: [
    'default',
    {discardComments: {removeAll: true}}
  ]
};

module.exports = ({env}) => ({
  plugins: {
		tailwindcss: {},
		'postcss-nested': {},
		autoprefixer: {},
		cssnano: env === 'production' ? cssNanoProductionOptions : false
  }
});
