module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@services': './src/services',
        '@project': './src',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
