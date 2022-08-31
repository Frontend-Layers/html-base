export default {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ]
}
