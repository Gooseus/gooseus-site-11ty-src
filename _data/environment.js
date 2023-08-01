module.exports = function() {
  const env = process.env.BUILD_ENV;
  const is_production = env === 'production';

  return {
    name: env,
    is_production
  }
}