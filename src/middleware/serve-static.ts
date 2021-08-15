// TODO
//   - It should be possible to configure the FS location, not just the name
//   - Better logging for 404
export default function serveStatic(directoryName) {
  return async function(ctx, next) {
    const parts = ctx.request.url.pathname.split('/').slice(1)

    if (parts[0] !== directoryName) {
      return next();
    }

    try {
      await ctx.send({
        root: `${Deno.cwd()}/src/${directoryName}`,
        path: parts.slice(1).join('/')
      });
    } catch (error) {
      console.error('404', ctx.request.url.pathname)
      next()
    }
  }
}
