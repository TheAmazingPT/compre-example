export default function getTemplatePath(viewname: string) {
  return `${Deno.cwd()}/views/${viewname}/template.pug`;
}
