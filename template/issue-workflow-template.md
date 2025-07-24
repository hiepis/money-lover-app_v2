# Issue Workflow Template - MANDATORY PROCESS

## CRITICAL RULES - MUST FOLLOW EXACTLY

⚠️ **WARNING**: This workflow MUST be followed for every task/issue. No exceptions.
⚠️ **VALIDATION**: Each step must be completed and verified before proceeding to the next.
⚠️ **DOCUMENTATION**: All steps must be documented in the development journal.

---

## PHASE 1: TASK ANALYSIS & PREPARATION

### Step 1.1: Read and Understand Task
- [ ] **MANDATORY**: Read the complete task description from the task file
- [ ] **MANDATORY**: Understand the requirements and acceptance criteria
- [ ] **MANDATORY**: Identify all files that need to be created or modified
- [ ] **MANDATORY**: Review related GitHub issue for additional context
- [ ] **VALIDATION**: Can you explain the task in your own words?

### Step 1.2: Review Dependencies
- [ ] **MANDATORY**: Check if previous tasks are completed
- [ ] **MANDATORY**: Verify sample data or dependencies exist
- [ ] **MANDATORY**: Review related documentation (PDC, plan files)
- [ ] **VALIDATION**: Are all dependencies satisfied?

---

## PHASE 2: IMPLEMENTATION

### Step 2.1: Core Implementation
- [ ] **MANDATORY**: Implement the main functionality as described
- [ ] **MANDATORY**: Follow existing code patterns and conventions
- [ ] **MANDATORY**: Add comprehensive error handling
- [ ] **MANDATORY**: Include detailed comments and documentation
- [ ] **VALIDATION**: Does the implementation meet all requirements?

### Step 2.2: Create Comprehensive Unit Tests
- [ ] **MANDATORY**: Create test file in `src/test/` directory
- [ ] **MANDATORY**: Test all public functions/methods
- [ ] **MANDATORY**: Include edge cases and error conditions
- [ ] **MANDATORY**: Add test for empty/invalid data scenarios
- [ ] **MANDATORY**: Ensure 100% test coverage for new code
- [ ] **VALIDATION**: Do all tests pass? Are edge cases covered?

### Step 2.3: Run and Verify All Tests
- [ ] **MANDATORY**: Execute all test cases
- [ ] **MANDATORY**: Verify all tests pass (0 failures)
- [ ] **MANDATORY**: Fix any failing tests immediately
- [ ] **MANDATORY**: Document test results with specific metrics
- [ ] **VALIDATION**: Screenshot or output showing all tests passing

---

## PHASE 3: DOCUMENTATION & VALIDATION

### Step 3.1: Update Task Checklist
- [ ] **MANDATORY**: Mark all completed items in task file checklist
- [ ] **MANDATORY**: Add "Implementation Results" section with:
  - Files created/modified
  - Key metrics and statistics
  - Test results summary
  - Performance considerations
- [ ] **MANDATORY**: Save all changes to task file
- [ ] **VALIDATION**: Is the task file completely up-to-date?

### Step 3.2: Sync with GitHub Issue
- [ ] **MANDATORY**: Use `gh issue edit [issue-number] --body-file [task-file-path]`
- [ ] **MANDATORY**: Verify GitHub issue shows updated checklist
- [ ] **MANDATORY**: Ensure all markdown formatting is preserved
- [ ] **MANDATORY**: Confirm implementation results are visible on GitHub
- [ ] **VALIDATION**: Does GitHub issue reflect current task status?

### Step 3.3: Update README (if applicable)
- [ ] **CONDITIONAL**: Update README.md if new features/commands added
- [ ] **CONDITIONAL**: Update installation or usage instructions
- [ ] **CONDITIONAL**: Add new dependencies to documentation
- [ ] **VALIDATION**: Is README accurate and up-to-date?

---

## PHASE 4: VERSION CONTROL & INTEGRATION

### Step 4.1: Git Operations
- [ ] **MANDATORY**: `git add .` - Stage all changes
- [ ] **MANDATORY**: `git commit -m "[Detailed commit message]"` with:
  - Task number and description
  - List of files created/modified
  - Key features implemented
  - Test results summary
  - "Closes #[issue-number]"
- [ ] **MANDATORY**: `git push origin dev` - Push to development branch
- [ ] **VALIDATION**: Are all changes committed and pushed?

### Step 4.2: Create Development Journal
- [ ] **MANDATORY**: Create journal file following `development_journal_process.md`
- [ ] **MANDATORY**: Document complete implementation process
- [ ] **MANDATORY**: Include technical decisions and lessons learned
- [ ] **MANDATORY**: Record any issues encountered and solutions
- [ ] **MANDATORY**: Add performance metrics and validation results
- [ ] **VALIDATION**: Is the journal comprehensive and detailed?

### Step 4.3: Commit and Push Journal
- [ ] **MANDATORY**: `git add [journal-file]`
- [ ] **MANDATORY**: `git commit -m "Add [task] implementation journal"`
- [ ] **MANDATORY**: `git push origin dev`
- [ ] **VALIDATION**: Is journal committed and pushed to GitHub?

---

## PHASE 5: CLOSURE & VERIFICATION

### Step 5.1: Close GitHub Issue
- [ ] **MANDATORY**: Use `gh issue close [issue-number] --comment "[completion summary]"`
- [ ] **MANDATORY**: Include in comment:
  - ✅ Implementation results summary
  - ✅ Files created/modified list
  - ✅ Test results (X passed, 0 failed)
  - ✅ Commit hash reference
  - ✅ Next steps or dependencies
- [ ] **VALIDATION**: Is issue closed with comprehensive summary?

### Step 5.2: Final Verification
- [ ] **MANDATORY**: Verify all files are committed and pushed
- [ ] **MANDATORY**: Verify GitHub issue is closed and updated
- [ ] **MANDATORY**: Verify all tests are passing
- [ ] **MANDATORY**: Verify journal is created and committed
- [ ] **VALIDATION**: Is everything complete and documented?

---

## EMERGENCY PROCEDURES

### If Tests Fail:
1. **STOP** - Do not proceed to next phase
2. **DEBUG** - Identify root cause of failure
3. **FIX** - Implement solution
4. **RE-TEST** - Verify all tests pass
5. **DOCUMENT** - Record issue and solution in journal

### If Git Operations Fail:
1. **STOP** - Do not proceed
2. **RESOLVE** - Fix git conflicts or issues
3. **VERIFY** - Ensure clean git status
4. **RETRY** - Attempt operation again
5. **DOCUMENT** - Record resolution in journal

### If GitHub Sync Fails:
1. **VERIFY** - Check GitHub CLI authentication
2. **RETRY** - Attempt sync operation again
3. **MANUAL** - Update GitHub issue manually if needed
4. **DOCUMENT** - Record issue and resolution

---

## SUCCESS CRITERIA CHECKLIST

Before marking task as complete, verify:
- [ ] ✅ All functionality implemented and working
- [ ] ✅ All tests created and passing (0 failures)
- [ ] ✅ Task file updated with completed checklist
- [ ] ✅ GitHub issue synced with current task status
- [ ] ✅ All changes committed and pushed to GitHub
- [ ] ✅ Development journal created and committed
- [ ] ✅ GitHub issue closed with detailed summary
- [ ] ✅ No broken functionality or failing tests
- [ ] ✅ Documentation is accurate and up-to-date

**FINAL VALIDATION**: Can someone else pick up the next task with clear understanding of what was completed?

---

## WORKFLOW COMPLIANCE

⚠️ **MANDATORY COMPLIANCE**: This workflow must be followed exactly for every task.
⚠️ **NO SHORTCUTS**: Skipping steps will result in incomplete or broken implementations.
⚠️ **DOCUMENTATION REQUIRED**: Every step must be documented in the development journal.
⚠️ **VALIDATION REQUIRED**: Each phase must be validated before proceeding.

**Remember**: Quality and completeness are more important than speed. Follow this workflow religiously to ensure consistent, high-quality deliverables.

---

## PARENT ISSUE MANAGEMENT

### When to Close Parent Issues

⚠️ **CRITICAL**: Parent issues should only be closed when ALL sub-issues are completed.

### Step-by-Step Parent Issue Closure Process:

#### Step 1: Verify All Sub-Issues Are Closed
- [ ] **MANDATORY**: Check GitHub to confirm all sub-issues are closed
- [ ] **MANDATORY**: Verify all sub-task files have completed checklists
- [ ] **MANDATORY**: Ensure all implementation results are documented
- [ ] **VALIDATION**: Can you list all completed sub-issues with their commit hashes?

#### Step 2: Create Parent Issue Summary
- [ ] **MANDATORY**: Document complete feature implementation
- [ ] **MANDATORY**: List all sub-issues that were completed
- [ ] **MANDATORY**: Include overall metrics and statistics
- [ ] **MANDATORY**: Reference all related commits and pull requests
- [ ] **VALIDATION**: Does the summary provide complete feature overview?

#### Step 3: Update Parent Task Documentation
- [ ] **MANDATORY**: Update main task file with final results
- [ ] **MANDATORY**: Mark all sub-task items as completed
- [ ] **MANDATORY**: Add comprehensive implementation summary
- [ ] **MANDATORY**: Include integration testing results if applicable
- [ ] **VALIDATION**: Is parent task documentation complete?

#### Step 4: Close Parent Issue
- [ ] **MANDATORY**: Use `gh issue close [parent-issue-number] --comment "[comprehensive summary]"`
- [ ] **MANDATORY**: Include in parent closure comment:
  - ✅ **Feature Complete**: [Feature name] fully implemented
  - ✅ **Sub-Issues**: List all completed sub-issues (#XX, #XX, #XX)
  - ✅ **Files Created**: Complete list of all new files
  - ✅ **Files Modified**: Complete list of all modified files
  - ✅ **Test Coverage**: Total test cases and pass rate
  - ✅ **Integration**: How sub-components work together
  - ✅ **Next Steps**: What features or tasks can now be started
- [ ] **VALIDATION**: Does parent issue closure provide complete project context?

### Parent Issue Closure Template:

```markdown
🎉 **FEATURE COMPLETE**: [Feature Name]

✅ **Implementation Summary:**
- All sub-components implemented and tested
- Integration between components verified
- Documentation updated and comprehensive

✅ **Completed Sub-Issues:**
- #XX: [Sub-task 1 description] - [commit hash]
- #XX: [Sub-task 2 description] - [commit hash]
- #XX: [Sub-task 3 description] - [commit hash]

✅ **Files Created/Modified:**
- **New Files**: X files created (list key files)
- **Modified Files**: X files updated (list key files)
- **Test Files**: X test files with Y total test cases

✅ **Testing Results:**
- **Unit Tests**: X/X passing (100%)
- **Integration Tests**: X/X passing (100%)
- **Manual Testing**: All scenarios verified

✅ **Integration Status:**
- All sub-components integrate successfully
- Feature ready for end-to-end testing
- No breaking changes to existing functionality

✅ **Next Steps:**
- [Next feature/task] can now be started
- Dependencies satisfied for [related features]
- Ready for [integration/deployment phase]

Commit Range: [first-commit]..[last-commit]
Branch: dev
Total Commits: X
```

### Parent Issue Closure Validation:

Before closing parent issue, verify:
- [ ] ✅ ALL sub-issues are closed and documented
- [ ] ✅ Feature works end-to-end as designed
- [ ] ✅ All tests passing (unit + integration)
- [ ] ✅ Documentation is complete and accurate
- [ ] ✅ No breaking changes introduced
- [ ] ✅ Code is committed and pushed to repository
- [ ] ✅ Team/stakeholders can understand what was delivered

**FINAL PARENT VALIDATION**: Can someone else now use this complete feature without any additional implementation work?