import * as path from 'path';

const applicationPath = path.join(__dirname, '..');
const paths = {
  application: applicationPath,
  repoRoot: path.join(applicationPath, '..'),
  src: path.join(applicationPath, 'src'),
  dist: path.join(applicationPath, 'build'),
  public: path.join(applicationPath, 'public'),
  certificates: path.join(applicationPath, 'webpack', 'certificates'),
  // nodeModules: path.join(applicationPath, "node_modules"),
  // rootNodeModules: path.join(applicationPath, "..", "node_modules"),

  join: (...paths: string[]) => {
    return path.join(...paths);
  },
};

export { paths };
