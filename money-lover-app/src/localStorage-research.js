/**
 * localStorage API Research and Testing
 * 
 * This file contains comprehensive research and testing of localStorage API
 * capabilities, limitations, and best practices for the Personal Expense Tracker.
 * 
 * Research conducted as part of Task 3.1 - Study localStorage API
 * GitHub Issue: #24
 */

console.log('🔬 localStorage API Research and Testing');
console.log('==========================================');

// ============================================================================
// 1. BROWSER localStorage API STUDY
// ============================================================================

console.log('\n📚 1. Browser localStorage API Study');
console.log('------------------------------------');

/**
 * Test localStorage availability and basic functionality
 */
function testLocalStorageAvailability() {
  console.log('\n🔍 Testing localStorage availability...');
  
  try {
    // Test if localStorage is available
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    
    console.log('✅ localStorage is available');
    console.log(`📊 localStorage.length: ${localStorage.length}`);
    
    // Test storage event support
    if (typeof StorageEvent !== 'undefined') {
      console.log('✅ Storage events supported');
    } else {
      console.log('❌ Storage events not supported');
    }
    
    return true;
  } catch (error) {
    console.log('❌ localStorage not available:', error.message);
    return false;
  }
}

/**
 * Test localStorage methods and their behavior
 */
function testLocalStorageMethods() {
  console.log('\n🔍 Testing localStorage methods...');
  
  // Test setItem
  try {
    localStorage.setItem('test_string', 'Hello World');
    localStorage.setItem('test_number', '42');
    localStorage.setItem('test_object', JSON.stringify({ name: 'Test', value: 123 }));
    console.log('✅ setItem() works correctly');
  } catch (error) {
    console.log('❌ setItem() failed:', error.message);
  }
  
  // Test getItem
  try {
    const string = localStorage.getItem('test_string');
    const number = localStorage.getItem('test_number');
    const object = JSON.parse(localStorage.getItem('test_object'));
    
    console.log('✅ getItem() works correctly');
    console.log(`   String: "${string}"`);
    console.log(`   Number: "${number}" (type: ${typeof number})`);
    console.log(`   Object:`, object);
  } catch (error) {
    console.log('❌ getItem() failed:', error.message);
  }
  
  // Test removeItem
  try {
    localStorage.removeItem('test_string');
    const removed = localStorage.getItem('test_string');
    console.log(`✅ removeItem() works correctly (result: ${removed})`);
  } catch (error) {
    console.log('❌ removeItem() failed:', error.message);
  }
  
  // Test key() method
  try {
    const keyCount = localStorage.length;
    console.log(`✅ key() method available, ${keyCount} keys in storage`);
    for (let i = 0; i < Math.min(keyCount, 3); i++) {
      console.log(`   Key ${i}: "${localStorage.key(i)}"`);
    }
  } catch (error) {
    console.log('❌ key() method failed:', error.message);
  }
  
  // Test clear
  const initialLength = localStorage.length;
  localStorage.setItem('temp_test', 'temporary');
  try {
    // Don't actually clear all storage, just test if method exists
    console.log(`✅ clear() method available (not executed to preserve data)`);
    localStorage.removeItem('temp_test');
  } catch (error) {
    console.log('❌ clear() method failed:', error.message);
  }
}

/**
 * Test JSON serialization performance and limitations
 */
function testJSONSerialization() {
  console.log('\n🔍 Testing JSON serialization...');
  
  const testData = {
    simple: 'string',
    number: 42,
    boolean: true,
    date: new Date().toISOString(),
    array: [1, 2, 3, 'test'],
    nested: {
      deep: {
        value: 'nested object'
      }
    },
    nullValue: null,
    undefinedValue: undefined // Will be lost in JSON
  };
  
  try {
    const serialized = JSON.stringify(testData);
    const deserialized = JSON.parse(serialized);
    
    console.log('✅ JSON serialization works');
    console.log(`📊 Original object keys: ${Object.keys(testData).length}`);
    console.log(`📊 Deserialized object keys: ${Object.keys(deserialized).length}`);
    console.log(`📊 Serialized size: ${serialized.length} characters`);
    
    // Check what was lost
    if (!deserialized.hasOwnProperty('undefinedValue')) {
      console.log('⚠️  undefined values are lost during JSON serialization');
    }
    
    // Test functions (will be lost)
    const testWithFunction = {
      name: 'test',
      method: function() { return 'hello'; }
    };
    
    const serializedFunction = JSON.stringify(testWithFunction);
    const deserializedFunction = JSON.parse(serializedFunction);
    
    if (!deserializedFunction.hasOwnProperty('method')) {
      console.log('⚠️  Function properties are lost during JSON serialization');
    }
    
  } catch (error) {
    console.log('❌ JSON serialization failed:', error.message);
  }
}

// ============================================================================
// 2. STORAGE LIMITATIONS RESEARCH
// ============================================================================

console.log('\n📚 2. Storage Limitations Research');
console.log('----------------------------------');

/**
 * Test storage quota and calculate current usage
 */
function testStorageQuota() {
  console.log('\n🔍 Testing storage quota...');
  
  // Calculate current usage
  let totalSize = 0;
  const usage = {};
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const keySize = key.length;
    const valueSize = value ? value.length : 0;
    const itemSize = keySize + valueSize;
    
    usage[key] = {
      keySize,
      valueSize,
      totalSize: itemSize
    };
    
    totalSize += itemSize;
  }
  
  console.log(`📊 Current localStorage usage: ${totalSize} characters`);
  console.log(`📊 Current localStorage usage: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(`📊 Items in storage: ${localStorage.length}`);
  
  // Test navigator.storage.estimate() if available
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate().then(estimate => {
      console.log('✅ Storage estimation API available');
      console.log(`📊 Quota: ${(estimate.quota / 1024 / 1024).toFixed(2)} MB`);
      console.log(`📊 Usage: ${(estimate.usage / 1024 / 1024).toFixed(2)} MB`);
      console.log(`📊 Available: ${((estimate.quota - estimate.usage) / 1024 / 1024).toFixed(2)} MB`);
    }).catch(error => {
      console.log('❌ Storage estimation failed:', error.message);
    });
  } else {
    console.log('❌ Storage estimation API not available');
    console.log('📝 Estimated quota limit: 5-10MB (browser dependent)');
  }
  
  return { totalSize, usage };
}

/**
 * Test quota exceeded error handling
 */
function testQuotaExceededHandling() {
  console.log('\n🔍 Testing quota exceeded handling...');
  
  try {
    // Create a large string to test quota
    const largeData = 'x'.repeat(1024 * 1024); // 1MB string
    const testKey = 'quota_test_large_data';
    
    // Try to store it (this might fail on quota exceeded)
    localStorage.setItem(testKey, largeData);
    console.log('✅ Large data stored successfully');
    
    // Clean up
    localStorage.removeItem(testKey);
    console.log('✅ Large data removed successfully');
    
  } catch (error) {
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      console.log('⚠️  Quota exceeded error caught:', error.message);
      console.log('📝 Error handling strategy needed for quota exceeded scenarios');
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }
}

/**
 * Test private/incognito browsing impact
 */
function testPrivateBrowsingImpact() {
  console.log('\n🔍 Testing private browsing impact...');
  
  // Note: Cannot definitively detect private browsing, but can test behavior
  const testKey = 'private_browsing_test';
  const testValue = 'test_value';
  
  try {
    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    
    if (retrieved === testValue) {
      console.log('✅ localStorage works in current browsing mode');
    } else {
      console.log('⚠️  localStorage retrieval inconsistent');
    }
    
    localStorage.removeItem(testKey);
    
  } catch (error) {
    console.log('⚠️  localStorage may be disabled in private browsing mode');
    console.log('📝 Fallback storage strategy needed');
  }
}

// ============================================================================
// 3. PERFORMANCE TESTING
// ============================================================================

console.log('\n📚 3. Performance Testing');
console.log('-------------------------');

/**
 * Test localStorage performance with different data sizes
 */
function testPerformance() {
  console.log('\n🔍 Testing localStorage performance...');
  
  const performanceResults = {};
  
  // Test different data sizes
  const testSizes = [
    { name: 'Small (1KB)', size: 1024 },
    { name: 'Medium (10KB)', size: 10 * 1024 },
    { name: 'Large (100KB)', size: 100 * 1024 }
  ];
  
  testSizes.forEach(test => {
    const data = 'x'.repeat(test.size);
    const key = `perf_test_${test.name}`;
    
    // Test write performance
    const writeStart = performance.now();
    try {
      localStorage.setItem(key, data);
      const writeEnd = performance.now();
      const writeTime = writeEnd - writeStart;
      
      // Test read performance
      const readStart = performance.now();
      const retrieved = localStorage.getItem(key);
      const readEnd = performance.now();
      const readTime = readEnd - readStart;
      
      performanceResults[test.name] = {
        writeTime: writeTime.toFixed(3),
        readTime: readTime.toFixed(3),
        success: retrieved.length === test.size
      };
      
      console.log(`📊 ${test.name}:`);
      console.log(`   Write: ${writeTime.toFixed(3)}ms`);
      console.log(`   Read: ${readTime.toFixed(3)}ms`);
      console.log(`   Success: ${retrieved.length === test.size}`);
      
      // Clean up
      localStorage.removeItem(key);
      
    } catch (error) {
      console.log(`❌ ${test.name} failed:`, error.message);
      performanceResults[test.name] = { error: error.message };
    }
  });
  
  return performanceResults;
}

/**
 * Test JSON parsing performance
 */
function testJSONPerformance() {
  console.log('\n🔍 Testing JSON parsing performance...');
  
  // Create test data structures
  const simpleObject = { name: 'test', value: 42 };
  const complexObject = {
    expenses: Array.from({ length: 100 }, (_, i) => ({
      id: `exp_${i}`,
      amount: Math.random() * 100,
      category: ['food', 'transport', 'entertainment'][i % 3],
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      description: `Expense ${i}`
    }))
  };
  
  // Test simple object
  const simpleStart = performance.now();
  const simpleString = JSON.stringify(simpleObject);
  const simpleParsed = JSON.parse(simpleString);
  const simpleEnd = performance.now();
  
  console.log(`📊 Simple object (${simpleString.length} chars):`);
  console.log(`   JSON round-trip: ${(simpleEnd - simpleStart).toFixed(3)}ms`);
  
  // Test complex object
  const complexStart = performance.now();
  const complexString = JSON.stringify(complexObject);
  const complexParsed = JSON.parse(complexString);
  const complexEnd = performance.now();
  
  console.log(`📊 Complex object (${complexString.length} chars):`);
  console.log(`   JSON round-trip: ${(complexEnd - complexStart).toFixed(3)}ms`);
  console.log(`   Contains ${complexObject.expenses.length} expense records`);
}

// ============================================================================
// 4. ERROR SCENARIOS TESTING
// ============================================================================

console.log('\n📚 4. Error Scenarios Testing');
console.log('-----------------------------');

/**
 * Test various error scenarios
 */
function testErrorScenarios() {
  console.log('\n🔍 Testing error scenarios...');
  
  // Test invalid JSON parsing
  try {
    const invalidJson = '{invalid json}';
    localStorage.setItem('invalid_json_test', invalidJson);
    const parsed = JSON.parse(localStorage.getItem('invalid_json_test'));
    console.log('❌ Should have failed on invalid JSON');
  } catch (error) {
    console.log('✅ Invalid JSON properly caught:', error.name);
    localStorage.removeItem('invalid_json_test');
  }
  
  // Test null/undefined handling
  try {
    localStorage.setItem('null_test', null);
    const nullValue = localStorage.getItem('null_test');
    console.log(`📊 null stored as: "${nullValue}" (type: ${typeof nullValue})`);
    localStorage.removeItem('null_test');
  } catch (error) {
    console.log('❌ null handling failed:', error.message);
  }
  
  // Test empty string handling
  try {
    localStorage.setItem('empty_test', '');
    const emptyValue = localStorage.getItem('empty_test');
    console.log(`📊 empty string retrieved as: "${emptyValue}" (length: ${emptyValue.length})`);
    localStorage.removeItem('empty_test');
  } catch (error) {
    console.log('❌ empty string handling failed:', error.message);
  }
  
  // Test non-existent key
  const nonExistent = localStorage.getItem('non_existent_key');
  console.log(`📊 Non-existent key returns: ${nonExistent} (type: ${typeof nonExistent})`);
}

// ============================================================================
// 5. PRACTICAL EXPENSE TRACKER TESTING
// ============================================================================

console.log('\n📚 5. Practical Expense Tracker Testing');
console.log('---------------------------------------');

/**
 * Test expense tracker specific scenarios
 */
function testExpenseTrackerScenarios() {
  console.log('\n🔍 Testing expense tracker specific scenarios...');
  
  // Test typical expense data structure
  const sampleExpense = {
    id: 'exp_001',
    amount: 25.50,
    categoryId: 'food-dining',
    description: 'Lunch at cafe',
    date: '2024-01-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const sampleCategory = {
    id: 'food-dining',
    name: 'Food & Dining',
    color: '#ef4444',
    icon: 'utensils',
    isDefault: true,
    createdAt: new Date().toISOString()
  };
  
  try {
    // Test storing individual records
    localStorage.setItem('sample_expense', JSON.stringify(sampleExpense));
    localStorage.setItem('sample_category', JSON.stringify(sampleCategory));
    
    // Test retrieving and parsing
    const retrievedExpense = JSON.parse(localStorage.getItem('sample_expense'));
    const retrievedCategory = JSON.parse(localStorage.getItem('sample_category'));
    
    console.log('✅ Individual record storage works');
    console.log(`📊 Expense record size: ${JSON.stringify(sampleExpense).length} chars`);
    console.log(`📊 Category record size: ${JSON.stringify(sampleCategory).length} chars`);
    
    // Test array storage (typical use case)
    const expenses = Array.from({ length: 50 }, (_, i) => ({
      ...sampleExpense,
      id: `exp_${i.toString().padStart(3, '0')}`,
      amount: Math.random() * 100,
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
    }));
    
    const categories = [
      sampleCategory,
      { ...sampleCategory, id: 'transport', name: 'Transportation', color: '#3b82f6', icon: 'car' },
      { ...sampleCategory, id: 'shopping', name: 'Shopping', color: '#8b5cf6', icon: 'shopping-bag' }
    ];
    
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('categories', JSON.stringify(categories));
    
    const expensesSize = JSON.stringify(expenses).length;
    const categoriesSize = JSON.stringify(categories).length;
    
    console.log('✅ Array storage works');
    console.log(`📊 50 expenses size: ${expensesSize} chars (${(expensesSize/1024).toFixed(2)} KB)`);
    console.log(`📊 3 categories size: ${categoriesSize} chars`);
    console.log(`📊 Total size: ${(expensesSize + categoriesSize)} chars (${((expensesSize + categoriesSize)/1024).toFixed(2)} KB)`);
    
    // Estimate storage capacity for real usage
    const avgExpenseSize = expensesSize / expenses.length;
    const estimated1000Expenses = avgExpenseSize * 1000;
    
    console.log(`📊 Estimated 1000 expenses: ${(estimated1000Expenses/1024).toFixed(2)} KB`);
    console.log(`📊 Estimated 5000 expenses: ${(estimated1000Expenses * 5/1024).toFixed(2)} KB`);
    
    // Clean up
    localStorage.removeItem('sample_expense');
    localStorage.removeItem('sample_category');
    localStorage.removeItem('expenses');
    localStorage.removeItem('categories');
    
  } catch (error) {
    console.log('❌ Expense tracker testing failed:', error.message);
  }
}

// ============================================================================
// 6. STORAGE MONITORING IMPLEMENTATION
// ============================================================================

/**
 * Storage monitoring utility
 */
const StorageMonitor = {
  getUsage() {
    let total = 0;
    const breakdown = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const size = (key.length + (value ? value.length : 0));
      breakdown[key] = size;
      total += size;
    }
    
    return {
      totalBytes: total,
      totalKB: (total / 1024).toFixed(2),
      breakdown,
      itemCount: localStorage.length
    };
  },
  
  getEstimatedQuota() {
    // Conservative estimate: 5MB
    return 5 * 1024 * 1024;
  },
  
  getUsagePercentage() {
    const usage = this.getUsage();
    const quota = this.getEstimatedQuota();
    return ((usage.totalBytes / quota) * 100).toFixed(2);
  },
  
  canStore(dataSize) {
    const usage = this.getUsage();
    const quota = this.getEstimatedQuota();
    const safeLimit = quota * 0.8; // Use 80% as safe limit
    return (usage.totalBytes + dataSize) <= safeLimit;
  }
};

// ============================================================================
// EXECUTE ALL TESTS
// ============================================================================

console.log('\n🚀 Executing localStorage Research Tests');
console.log('=========================================');

// Run all tests
const isAvailable = testLocalStorageAvailability();

if (isAvailable) {
  testLocalStorageMethods();
  testJSONSerialization();
  testStorageQuota();
  testQuotaExceededHandling();
  testPrivateBrowsingImpact();
  
  const performanceResults = testPerformance();
  testJSONPerformance();
  
  testErrorScenarios();
  testExpenseTrackerScenarios();
  
  // Final storage monitoring report
  console.log('\n📊 Final Storage Monitoring Report');
  console.log('----------------------------------');
  const finalUsage = StorageMonitor.getUsage();
  console.log(`Total usage: ${finalUsage.totalKB} KB (${finalUsage.itemCount} items)`);
  console.log(`Usage percentage: ${StorageMonitor.getUsagePercentage()}%`);
  console.log(`Can store 100KB: ${StorageMonitor.canStore(100 * 1024)}`);
  
} else {
  console.log('❌ localStorage not available - testing aborted');
}

console.log('\n✅ localStorage Research Complete');
console.log('=================================');

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    StorageMonitor,
    testLocalStorageAvailability,
    testStorageQuota,
    testPerformance
  };
}