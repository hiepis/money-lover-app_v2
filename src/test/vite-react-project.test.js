/**
 * Vite React Project Setup Verification Tests
 * Tests to ensure Vite React project is properly created and configured
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Vite React Project Setup Verification', () => {
  const projectPath = path.join(process.cwd(), 'money-lover-app');

  describe('Project Structure Validation', () => {
    test('should have money-lover-app directory created', () => {
      expect(fs.existsSync(projectPath)).toBe(true);
      expect(fs.statSync(projectPath).isDirectory()).toBe(true);
    });

    test('should have essential project files', () => {
      const essentialFiles = [
        'package.json',
        'package-lock.json',
        'index.html',
        'vite.config.js',
        'eslint.config.js',
        'README.md'
      ];

      essentialFiles.forEach(file => {
        const filePath = path.join(projectPath, file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    test('should have correct source directory structure', () => {
      const srcPath = path.join(projectPath, 'src');
      expect(fs.existsSync(srcPath)).toBe(true);

      const essentialSrcFiles = [
        'App.jsx',
        'App.css',
        'main.jsx',
        'index.css'
      ];

      essentialSrcFiles.forEach(file => {
        const filePath = path.join(srcPath, file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    test('should have public directory with assets', () => {
      const publicPath = path.join(projectPath, 'public');
      expect(fs.existsSync(publicPath)).toBe(true);
      
      const viteSvgPath = path.join(publicPath, 'vite.svg');
      expect(fs.existsSync(viteSvgPath)).toBe(true);
    });

    test('should have node_modules directory', () => {
      const nodeModulesPath = path.join(projectPath, 'node_modules');
      expect(fs.existsSync(nodeModulesPath)).toBe(true);
      expect(fs.statSync(nodeModulesPath).isDirectory()).toBe(true);
    });
  });

  describe('Package.json Configuration', () => {
    let packageJson;

    beforeAll(() => {
      const packageJsonPath = path.join(projectPath, 'package.json');
      packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    });

    test('should have correct project metadata', () => {
      expect(packageJson.name).toBe('money-lover-app');
      expect(packageJson.version).toBe('1.0.0');
      expect(packageJson.description).toContain('Personal Expense Tracker');
      expect(packageJson.author).toBe('Money Lover Development Team');
      expect(packageJson.license).toBe('MIT');
    });

    test('should have required scripts', () => {
      const requiredScripts = ['dev', 'build', 'lint', 'preview'];
      
      requiredScripts.forEach(script => {
        expect(packageJson.scripts).toHaveProperty(script);
      });

      expect(packageJson.scripts.dev).toBe('vite');
      expect(packageJson.scripts.build).toBe('vite build');
      expect(packageJson.scripts.lint).toBe('eslint .');
      expect(packageJson.scripts.preview).toBe('vite preview');
    });

    test('should have React dependencies', () => {
      expect(packageJson.dependencies).toHaveProperty('react');
      expect(packageJson.dependencies).toHaveProperty('react-dom');
      
      // Verify React version is 18+ or 19+
      const reactVersion = packageJson.dependencies.react;
      expect(reactVersion).toMatch(/^\^(18|19)\./);
    });

    test('should have Vite and development dependencies', () => {
      const requiredDevDeps = [
        'vite',
        '@vitejs/plugin-react',
        'eslint',
        '@types/react',
        '@types/react-dom'
      ];

      requiredDevDeps.forEach(dep => {
        expect(packageJson.devDependencies).toHaveProperty(dep);
      });

      // Verify Vite version is 7+
      const viteVersion = packageJson.devDependencies.vite;
      expect(viteVersion).toMatch(/^\^[7-9]\./);
    });

    test('should have project keywords', () => {
      expect(Array.isArray(packageJson.keywords)).toBe(true);
      expect(packageJson.keywords).toContain('expense-tracker');
      expect(packageJson.keywords).toContain('react');
      expect(packageJson.keywords).toContain('vite');
    });
  });

  describe('Vite Configuration', () => {
    test('should have properly configured vite.config.js', () => {
      const viteConfigPath = path.join(projectPath, 'vite.config.js');
      expect(fs.existsSync(viteConfigPath)).toBe(true);

      const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
      expect(viteConfig).toContain('@vitejs/plugin-react');
      expect(viteConfig).toContain('port: 5173');
      expect(viteConfig).toContain('open: true');
      expect(viteConfig).toContain('sourcemap: true');
      expect(viteConfig).toContain("'@': '/src'");
    });
  });

  describe('HTML Configuration', () => {
    test('should have correct HTML title and structure', () => {
      const indexHtmlPath = path.join(projectPath, 'index.html');
      const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

      expect(htmlContent).toContain('Money Lover - Personal Expense Tracker');
      expect(htmlContent).toContain('<div id="root"></div>');
      expect(htmlContent).toContain('src="/src/main.jsx"');
      expect(htmlContent).toContain('viewport');
    });
  });

  describe('React Component Customization', () => {
    test('should have customized App.jsx component', () => {
      const appJsxPath = path.join(projectPath, 'src', 'App.jsx');
      const appContent = fs.readFileSync(appJsxPath, 'utf8');

      expect(appContent).toContain('Money Lover');
      expect(appContent).toContain('Personal Expense Tracker');
      expect(appContent).toContain('Foundation Setup Complete');
      expect(appContent).toContain('React 19 + Vite 7');
      expect(appContent).toContain('useState');
    });
  });

  describe('Build Process Validation', () => {
    let buildOutput;

    beforeAll(() => {
      const originalCwd = process.cwd();
      try {
        process.chdir(projectPath);
        buildOutput = execSync('npm run build', { encoding: 'utf8' });
      } finally {
        process.chdir(originalCwd);
      }
    });

    test('should build successfully without errors', () => {
      expect(buildOutput).toContain('built in');
      expect(buildOutput).toContain('✓');
      expect(buildOutput).not.toContain('error');
    });

    test('should create dist directory with optimized files', () => {
      const distPath = path.join(projectPath, 'dist');
      expect(fs.existsSync(distPath)).toBe(true);

      const distIndexPath = path.join(distPath, 'index.html');
      expect(fs.existsSync(distIndexPath)).toBe(true);

      // Check for assets directory
      const assetsPath = path.join(distPath, 'assets');
      expect(fs.existsSync(assetsPath)).toBe(true);
    });

    test('should generate source maps', () => {
      expect(buildOutput).toContain('map:');
      
      const distPath = path.join(projectPath, 'dist');
      const assetsPath = path.join(distPath, 'assets');
      
      if (fs.existsSync(assetsPath)) {
        const files = fs.readdirSync(assetsPath);
        const mapFiles = files.filter(file => file.endsWith('.map'));
        expect(mapFiles.length).toBeGreaterThan(0);
      }
    });

    test('should have reasonable bundle size', () => {
      expect(buildOutput).toMatch(/\d+\.\d+ kB/);
      
      // Extract bundle size from build output
      const sizeMatch = buildOutput.match(/(\d+\.\d+) kB.*│ gzip: (\d+\.\d+) kB/);
      if (sizeMatch) {
        const bundleSize = parseFloat(sizeMatch[1]);
        const gzipSize = parseFloat(sizeMatch[2]);
        
        // Bundle should be reasonable for a basic React app (React 19 is larger)
        expect(bundleSize).toBeLessThan(400); // Less than 400KB (React 19 baseline)
        expect(gzipSize).toBeLessThan(120);   // Less than 120KB gzipped (React 19 baseline)
      }
    });
  });

  describe('Development Environment', () => {
    test('should have working ESLint configuration', () => {
      const originalCwd = process.cwd();
      try {
        process.chdir(projectPath);
        
        // Run ESLint and expect no errors for our basic setup
        expect(() => {
          execSync('npm run lint', { stdio: 'ignore' });
        }).not.toThrow();
      } finally {
        process.chdir(originalCwd);
      }
    });

    test('should pass all npm scripts without errors', () => {
      const originalCwd = process.cwd();
      try {
        process.chdir(projectPath);
        
        // Test that scripts can be executed without errors
        expect(() => {
          execSync('npm run build', { stdio: 'ignore' });
        }).not.toThrow();

        expect(() => {
          execSync('npm run lint', { stdio: 'ignore' });
        }).not.toThrow();
      } finally {
        process.chdir(originalCwd);
      }
    });
  });

  describe('Project Environment Documentation', () => {
    test('should document project setup details', () => {
      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

      const projectSetupDoc = {
        projectName: packageJson.name,
        version: packageJson.version,
        reactVersion: packageJson.dependencies.react,
        viteVersion: packageJson.devDependencies.vite,
        nodeModulesSize: fs.existsSync(path.join(projectPath, 'node_modules')) ? 'Present' : 'Missing',
        buildOutputExists: fs.existsSync(path.join(projectPath, 'dist')),
        customizationApplied: true,
        setupDate: new Date().toISOString().split('T')[0]
      };

      expect(projectSetupDoc.projectName).toBe('money-lover-app');
      expect(projectSetupDoc.version).toBe('1.0.0');
      expect(projectSetupDoc.reactVersion).toMatch(/^\^19\./);
      expect(projectSetupDoc.viteVersion).toMatch(/^\^7\./);
      expect(projectSetupDoc.nodeModulesSize).toBe('Present');
      expect(projectSetupDoc.buildOutputExists).toBe(true);

      // Log project setup details for documentation
      console.log('Vite React Project Setup Documentation:', JSON.stringify(projectSetupDoc, null, 2));
    });
  });
});

/**
 * Integration and Performance Tests
 */
describe('Vite React Project Integration', () => {
  const projectPath = path.join(process.cwd(), 'money-lover-app');

  test('should have fast build times', () => {
    const originalCwd = process.cwd();
    try {
      process.chdir(projectPath);
      
      const startTime = Date.now();
      execSync('npm run build', { stdio: 'ignore' });
      const endTime = Date.now();
      const buildTime = endTime - startTime;
      
      // Build should complete within reasonable time (less than 10 seconds)
      expect(buildTime).toBeLessThan(10000);
    } finally {
      process.chdir(originalCwd);
    }
  });

  test('should be ready for additional dependencies', () => {
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Verify foundation is ready for our planned dependencies
    expect(packageJson.type).toBe('module'); // ES modules support
    expect(packageJson.dependencies.react).toBeDefined();
    expect(packageJson.devDependencies.vite).toBeDefined();
    expect(packageJson.devDependencies.eslint).toBeDefined();
  });

  test('should have correct project foundation for expense tracker', () => {
    // Verify project is set up correctly for our specific use case
    const indexHtmlPath = path.join(projectPath, 'index.html');
    const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
    
    const appJsxPath = path.join(projectPath, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appJsxPath, 'utf8');

    expect(htmlContent).toContain('Money Lover - Personal Expense Tracker');
    expect(appContent).toContain('Money Lover');
    expect(appContent).toContain('Foundation Setup Complete');
  });
});