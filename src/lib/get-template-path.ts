import {resolve} from "https://deno.land/std@0.104.0/path/mod.ts";

export default function getTemplatePath(viewname: string) {
  // return resolve('src/views', viewname, 'template.pug');
  return `${Deno.cwd()}/src/views/${viewname}/template.pug`;
}
