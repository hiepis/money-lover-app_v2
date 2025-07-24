# Journal Creation Prompt Template

## Single Efficient Prompt for Developers

```
Create a comprehensive development journal file following the established template format for [TASK_NAME] (Issue #[ISSUE_NUMBER]). 

**Requirements:**
- File location: `docs/plan/version1/journal/[task_name]_implementation_journal.md`
- Follow the 5-phase structure: Analysis → Implementation → Testing → Documentation → Issue Closure
- Include all code snippets, technical decisions, and user experience improvements
- Document the complete development process from start to finish
- Reference the task requirements from the original issue and task files
- Include manual testing results and GitHub integration steps
- Prepare comprehensive issue closure summary

**Template Structure to Follow:**
1. **Overview Section**: Task description, date, status, implementation time
2. **Phase 1: Task Analysis**: Requirements analysis, technical scope, dependencies verified
3. **Phase 2: Implementation**: Core implementation details with code snippets and key changes
4. **Phase 3: Testing & Validation**: Unit tests, integration tests, manual testing results
5. **Phase 4: Documentation & GitHub Sync**: Documentation updates, commit details, file organization
6. **Phase 5: Issue Closure Preparation**: Requirements completion checklist, technical achievements, user experience improvements, ready for GitHub closure

**Include:**
- Exact code snippets for key implementations
- Technical architecture decisions and rationale
- Testing methodology and results (pass rates, coverage)
- User experience improvements and interface enhancements
- Error handling and edge case coverage
- Performance considerations and optimizations
- GitHub integration details (commits, issue references)
- Complete requirements verification checklist
- Comprehensive closure summary for GitHub issue

**Format:** Use professional markdown with clear headings, code blocks, checklists, and technical diagrams where appropriate. Ensure the journal serves as a complete historical trace for handoff, AI recovery, and technical follow-up.

Please create this journal file documenting the complete development process for [TASK_NAME].
```

## Usage Instructions for Developers

1. **Replace Placeholders:**
   - `[TASK_NAME]` → Actual task name (e.g., "task6_8_main_integration")
   - `[ISSUE_NUMBER]` → GitHub issue number

2. **Customize Context:**
   - Add specific task requirements from issue/task files
   - Include relevant technical constraints or dependencies
   - Specify any particular focus areas (UI, performance, testing, etc.)

3. **Example Usage:**
```
Create a comprehensive development journal file following the established template format for Task 7.1: Income Entry CLI Implementation (Issue #75). 

[... rest of template prompt ...]

Please create this journal file documenting the complete development process for Task 7.1: Income Entry CLI Implementation.
```

## Key Benefits

- **Single Prompt**: Complete journal creation in one request
- **Consistent Format**: Follows established 5-phase structure
- **Comprehensive Coverage**: Includes all required sections and technical details
- **Reusable**: Works for any task/feature development
- **Professional**: Maintains documentation standards and quality
- **GitHub Ready**: Includes issue closure preparation and commit tracking

## Template Compliance

This prompt ensures journals follow the established format seen in:
- `task6_8_main_integration_implementation_journal.md`
- `task6_5_empty_state_testing_implementation_journal.md`
- Other existing journal files in the project

The resulting journals will serve as complete historical traces for development handoff, AI context recovery, and technical follow-up as outlined in `development_journal_process.md`.
