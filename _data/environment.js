module.exports = function() {
  const env = process.env.BUILD_ENV || 'development';
  const is_production = env === 'production';

  console.log('[Environment]', { env, is_production });

  return {
    name: env,
    is_production
  }
}