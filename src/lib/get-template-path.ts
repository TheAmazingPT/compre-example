export default function getTemplatePath(viewname: string) {
  return `${Deno.cwd()}/src/views/${viewname}/template.pug`;
}
