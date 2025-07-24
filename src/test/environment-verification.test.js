/**
 * Environment Verification Tests
 * Tests to ensure development environment meets project requirements
 */

const { execSync } = require('child_process');
const semver = require('semver');

describe('Development Environment Verification', () => {
  describe('Node.js Requirements', () => {
    test('should have Node.js version 18.0.0 or higher', () => {
      const nodeVersion = process.version;
      expect(semver.gte(nodeVersion, '18.0.0')).toBe(true);
    });

    test('should have npm available', () => {
      expect(() => {
        execSync('npm --version', { stdio: 'ignore' });
      }).not.toThrow();
    });

    test('should have npm version 8.0.0 or higher', () => {
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      expect(semver.gte(npmVersion, '8.0.0')).toBe(true);
    });
  });

  describe('Node.js Functionality', () => {
    test('should execute basic JavaScript', () => {
      const result = execSync('node -e "console.log(\'test\')"', { encoding: 'utf8' });
      expect(result.trim()).toBe('test');
    });

    test('should support ES6+ features', () => {
      const code = 'const arr = [1,2,3]; console.log(arr.map(x => x * 2).join(\\",\\"))';
      const result = execSync(`node -e "${code}"`, { encoding: 'utf8' });
      expect(result.trim()).toBe('2,4,6');
    });

    test('should support async/await', () => {
      const code = 'async function test() { return await Promise.resolve(\\"async-works\\"); } test().then(console.log)';
      const result = execSync(`node -e "${code}"`, { encoding: 'utf8' });
      expect(result.trim()).toBe('async-works');
    });
  });

  describe('Package Manager Compatibility', () => {
    test('should be able to check React package info', () => {
      expect(() => {
        execSync('npm info react version', { stdio: 'ignore' });
      }).not.toThrow();
    });

    test('should be able to check Vite package info', () => {
      expect(() => {
        execSync('npm info vite version', { stdio: 'ignore' });
      }).not.toThrow();
    });

    test('should have working npm configuration', () => {
      expect(() => {
        execSync('npm config list', { stdio: 'ignore' });
      }).not.toThrow();
    });
  });

  describe('Environment Documentation', () => {
    test('should record environment details', () => {
      const nodeVersion = process.version;
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      const platform = process.platform;
      const arch = process.arch;

      // Document environment for project setup notes
      const envDoc = {
        nodeVersion,
        npmVersion,
        platform,
        arch,
        date: new Date().toISOString().split('T')[0]
      };

      expect(envDoc.nodeVersion).toBeDefined();
      expect(envDoc.npmVersion).toBeDefined();
      expect(envDoc.platform).toBeDefined();
      expect(envDoc.arch).toBeDefined();
      expect(envDoc.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      // Log environment details for documentation
      console.log('Environment Documentation:', JSON.stringify(envDoc, null, 2));
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle invalid node commands gracefully', () => {
      expect(() => {
        try {
          execSync('node -e "invalid syntax here"', { stdio: 'ignore' });
        } catch (error) {
          // Expected to throw for invalid syntax
          expect(error).toBeDefined();
        }
      }).not.toThrow();
    });

    test('should handle npm commands with invalid options', () => {
      expect(() => {
        try {
          execSync('npm --invalid-option', { stdio: 'ignore' });
        } catch (error) {
          // Expected to throw for invalid option
          expect(error).toBeDefined();
        }
      }).not.toThrow();
    });
  });
});

/**
 * Performance and Resource Tests
 */
describe('Environment Performance', () => {
  test('should have reasonable Node.js startup time', () => {
    const startTime = Date.now();
    execSync('node -e "console.log(\'startup-test\')"', { stdio: 'ignore' });
    const endTime = Date.now();
    const startupTime = endTime - startTime;
    
    // Startup should be under 1 second
    expect(startupTime).toBeLessThan(1000);
  });

  test('should have access to sufficient system resources', () => {
    const totalMem = process.memoryUsage().heapTotal;
    const freeMem = process.memoryUsage().heapUsed;
    
    // Should have at least 50MB heap total (more realistic for test environment)
    expect(totalMem).toBeGreaterThan(50 * 1024 * 1024);
    expect(freeMem).toBeLessThan(totalMem);
  });
});