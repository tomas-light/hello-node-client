import path from 'path';
import { getHashDigest, interpolateName } from 'loader-utils';
import { LoaderContext } from 'webpack';

const cssRegex = /\.css$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

function cssRule() {
  const dontDropUnusedCssImports = {
    // disable tree-shaking for regular (not module) scss files
    // `import 'myStyles.scss';`
    // because in such cases webpack sees, the import not used, and it trys to drop it
    sideEffects: true,
  };

  return {
    module: {
      rules: [
        {
          test: cssRegex,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
          ...dontDropUnusedCssImports,
        },
        {
          test: sassModuleRegex,
          ...dontDropUnusedCssImports,

          use: [
            // to inject the result into the DOM as a style block
            'style-loader',

            // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
            {
              loader: 'css-loader',
              options: {
                modules: {
                  getLocalIdent: namedModuleIdentifier(),
                },
              },
            },

            // future CSS syntax
            'postcss-loader',

            // to convert SASS to CSS
            'sass-loader',

            // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
            // { loader: "css-modules-typescript-loader" },
          ],
        },
      ],
    },
  };
}

function namedModuleIdentifier() {
  return <T>(
    context: LoaderContext<T>,
    identifier: string, // "[hash:base64:5]"
    className: string,
    options?: any
  ) => {
    const relativePath = path
      .relative(
        // "<path-to-repo>"
        context.rootContext,
        // "<path-to-repo>\src\myComponent\MyComponent.module.scss"
        context.resourcePath
      )
      // to "src\myComponent\MyComponent.module.scss"
      .replace(/\\+/g, '/');

    // Generate a hash to make the class name unique.
    const hash = getHashDigest(Buffer.from(`filePath:${relativePath}#className:${className}`), 'md5', 'base64', 5);

    return (
      interpolateName(
        context as any,
        // "MyComponent.module_myClassName_hash"
        `[name]_${className}_${hash}`,
        options
      )
        // "MyComponent.module_myClassName_hash" -> "MyComponent_myClassName_hash"
        .replace(/\.module_/, '_')
    );
  };
}

export { cssRule };
