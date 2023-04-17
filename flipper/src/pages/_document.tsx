import { Html, Head, Main, NextScript } from "next/document";
//_document edita todo los heads y body de todas las paginas

//extracto de los docs de nextjs
//The <Head /> component used in _document is not the same as next/head. The <Head />
//component used here should only be used for any <head> code that is common for all
//pages. For all other cases, such as <title> tags, we recommend using next/head in
//your pages or components.
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
