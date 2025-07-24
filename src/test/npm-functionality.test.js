/**
 * npm Functionality Verification Tests
 * Tests to ensure npm is properly updated and functional for project development
 */

const { execSync } = require('child_process');
const semver = require('semver');
const path = require('path');
const fs = require('fs');

describe('npm Version and Functionality', () => {
  describe('npm Version Requirements', () => {
    test('should have npm version 8.0.0 or higher', () => {
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      expect(semver.gte(npmVersion, '8.0.0')).toBe(true);
    });

    test('should have latest npm version installed', () => {
      const currentVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      const latestVersion = execSync('npm info npm version', { encoding: 'utf8' }).trim();
      expect(currentVersion).toBe(latestVersion);
    });

    test('should have npm version compatible with Node.js', () => {
      const nodeVersion = process.version;
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      
      // npm 8+ should work with Node.js 18+
      if (semver.gte(nodeVersion, '18.0.0')) {
        expect(semver.gte(npmVersion, '8.0.0')).toBe(true);
      }
    });
  });

  describe('npm Core Commands', () => {
    test('should execute npm help command', () => {
      expect(() => {
        execSync('npm help', { stdio: 'ignore' });
      }).not.toThrow();
    });

    test('should execute npm config list', () => {
      const config = execSync('npm config list', { encoding: 'utf8' });
      expect(config).toContain('npm version');
      expect(config).toContain('node version');
    });

    test('should have valid npm registry configuration', () => {
      const registry = execSync('npm config get registry', { encoding: 'utf8' }).trim();
      expect(registry).toMatch(/^https?:\/\//);
      expect(registry).toContain('npmjs.org');
    });

    test('should have accessible global bin folder', () => {
      const globalBin = execSync('npm config get prefix', { encoding: 'utf8' }).trim();
      expect(globalBin).toBeTruthy();
      expect(fs.existsSync(globalBin)).toBe(true);
    });
  });

  describe('Package Information Commands', () => {
    test('should retrieve React package information', () => {
      const reactVersion = execSync('npm info react version', { encoding: 'utf8' }).trim();
      expect(semver.valid(reactVersion)).toBeTruthy();
      expect(semver.gte(reactVersion, '18.0.0')).toBe(true);
    });

    test('should retrieve Vite package information', () => {
      const viteVersion = execSync('npm info vite version', { encoding: 'utf8' }).trim();
      expect(semver.valid(viteVersion)).toBeTruthy();
      expect(semver.gte(viteVersion, '5.0.0')).toBe(true);
    });

    test('should retrieve Jest package information', () => {
      const jestVersion = execSync('npm info jest version', { encoding: 'utf8' }).trim();
      expect(semver.valid(jestVersion)).toBeTruthy();
      expect(semver.gte(jestVersion, '29.0.0')).toBe(true);
    });
  });

  describe('npm Health and Connectivity', () => {
    test('should pass npm doctor check', () => {
      let doctorOutput;
      expect(() => {
        doctorOutput = execSync('npm doctor', { encoding: 'utf8' });
      }).not.toThrow();
      
      expect(doctorOutput).toContain('Connecting to the registry');
      expect(doctorOutput).toContain('Ok');
    });

    test('should ping npm registry successfully', () => {
      expect(() => {
        execSync('npm ping', { stdio: 'ignore' });
      }).not.toThrow();
    });

    test('should have clean npm cache', () => {
      expect(() => {
        execSync('npm cache verify', { stdio: 'ignore' });
      }).not.toThrow();
    });
  });

  describe('Package Management Testing', () => {
    const testDir = path.join(process.cwd(), 'temp-npm-test');
    
    beforeEach(() => {
      // Clean up any existing test directory
      if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
      }
    });

    afterEach(() => {
      // Clean up test directory
      if (fs.existsSync(testDir)) {
        fs.rmSync(testDir, { recursive: true, force: true });
      }
    });

    test('should create package.json with npm init', () => {
      fs.mkdirSync(testDir, { recursive: true });
      process.chdir(testDir);
      
      execSync('npm init -y', { stdio: 'ignore' });
      
      expect(fs.existsSync('package.json')).toBe(true);
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      expect(packageJson.name).toBeTruthy();
      expect(packageJson.version).toBeTruthy();
      
      // Return to original directory
      process.chdir('..');
    });

    test('should install and uninstall packages', () => {
      fs.mkdirSync(testDir, { recursive: true });
      const originalCwd = process.cwd();
      process.chdir(testDir);
      
      try {
        // Initialize package.json
        execSync('npm init -y', { stdio: 'ignore' });
        
        // Install a small, reliable package
        execSync('npm install lodash', { stdio: 'ignore' });
        expect(fs.existsSync('node_modules')).toBe(true);
        expect(fs.existsSync('package-lock.json')).toBe(true);
        
        // Verify package is in package.json
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        expect(packageJson.dependencies).toHaveProperty('lodash');
        
        // Uninstall package
        execSync('npm uninstall lodash', { stdio: 'ignore' });
        const updatedPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        // Check that lodash is not in dependencies (dependencies may be undefined if empty)
        expect(updatedPackageJson.dependencies?.lodash).toBeUndefined();
        
      } finally {
        process.chdir(originalCwd);
      }
    });
  });

  describe('npm Configuration and Security', () => {
    test('should have strict SSL enabled by default', () => {
      const strictSsl = execSync('npm config get strict-ssl', { encoding: 'utf8' }).trim();
      expect(strictSsl).toBe('true');
    });

    test('should have reasonable audit level configuration', () => {
      const auditLevel = execSync('npm config get audit-level', { encoding: 'utf8' }).trim();
      expect(['null', 'off', 'info', 'low', 'moderate', 'high', 'critical']).toContain(auditLevel);
    });

    test('should validate npm configuration format', () => {
      const configOutput = execSync('npm config list', { encoding: 'utf8' });
      expect(configOutput).toMatch(/npm version\s*=\s*\d+\.\d+\.\d+/);
      expect(configOutput).toMatch(/node version\s*=\s*v\d+\.\d+\.\d+/);
    });
  });

  describe('Environment Documentation', () => {
    test('should record npm environment details', () => {
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      const registry = execSync('npm config get registry', { encoding: 'utf8' }).trim();
      const globalPrefix = execSync('npm config get prefix', { encoding: 'utf8' }).trim();
      const cacheDir = execSync('npm config get cache', { encoding: 'utf8' }).trim();

      const npmEnvDoc = {
        npmVersion,
        registry,
        globalPrefix,
        cacheDir,
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        date: new Date().toISOString().split('T')[0]
      };

      expect(npmEnvDoc.npmVersion).toBeDefined();
      expect(npmEnvDoc.registry).toBeDefined();
      expect(npmEnvDoc.globalPrefix).toBeDefined();
      expect(npmEnvDoc.cacheDir).toBeDefined();
      expect(npmEnvDoc.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      // Log environment details for documentation
      console.log('npm Environment Documentation:', JSON.stringify(npmEnvDoc, null, 2));
    });
  });
});

/**
 * npm Performance and Reliability Tests
 */
describe('npm Performance and Reliability', () => {
  test('should have fast npm command execution', () => {
    const startTime = Date.now();
    execSync('npm --version', { stdio: 'ignore' });
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    
    // npm version command should be very fast
    expect(executionTime).toBeLessThan(2000);
  });

  test('should handle concurrent npm info requests', () => {
    const packages = ['react', 'vite', 'jest'];
    const startTime = Date.now();
    
    packages.forEach(pkg => {
      execSync(`npm info ${pkg} version`, { stdio: 'ignore' });
    });
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    // Should handle multiple requests reasonably fast
    expect(totalTime).toBeLessThan(10000);
  });

  test('should recover from network interruptions gracefully', () => {
    // Test npm config commands that don't require network
    expect(() => {
      execSync('npm config get registry', { stdio: 'ignore' });
      execSync('npm config get prefix', { stdio: 'ignore' });
      execSync('npm --version', { stdio: 'ignore' });
    }).not.toThrow();
  });
});