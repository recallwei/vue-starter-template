// Fix the error when import the .vue file in .ts file.
declare module '*.vue' {
  import { type DefineComponent } from 'vue'

  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*'