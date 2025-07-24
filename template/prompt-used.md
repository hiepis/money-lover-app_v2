# init git repo
## Prompt
- Có thể tạo proj này lên github cho tôi. Tên money-lover-app

- tạo 1 branch dev và commit, Sau đó chuyển sang branch dev giúp tôi

# File 1-pdc.md
## prompt
Một ý tưởng ứng dụng đơn giản có thể thực hiện nhanh là "Trình theo dõi chi tiêu cá nhân cơ bản". 
Ứng dụng này tập trung vào một chức năng cốt lõi duy nhất: cho phép người dùng nhập các khoản chi tiêu hàng ngày một cách nhanh chóng và dễ dàng.
 
Các tính năng chính:
 
Giao diện nhập liệu tối giản: Chỉ cần một trường để nhập số tiền, một danh mục (ví dụ: Ăn uống, Di chuyển, Mua sắm) và một nút "Thêm".
Lịch sử chi tiêu: Hiển thị danh sách các khoản chi đã nhập theo thứ tự thời gian.
Tổng quan đơn giản: Hiển thị tổng số tiền đã chi tiêu trong ngày hoặc trong tháng.

Help me expand this into a full Product Description Concept.
Please clarify:
- What problem does it solve?
- Who are the users?
- What are the core user workflows and expectations?
- What is the scope for the first version (what’s included and not included)?
- Write the result as if explaining to a non-technical stakeholder."

Generate .md file 1-pdc in doc folder

Note: i want to make first working prototye version with mockup data or local only for verify all feature


# File 2-plan.md
## Prompt
create file 2-plan.md, follow #file:implementation-plan-template.md 
Based on the following Product Description Concept:
#file:1-pdc.md 
Please propose a high-level implementation plan, broken into clear phases or milestones.
For each phase, suggest:
- The high-level tech stack (web/mobile/backend, offline support, etc.). Draw a chart ascii
- Main features or modules
- Suggested implementation order
- What can be built or tested independently
- Avoid locking in specific technologies unless necessary. Keep it practical and milestone-focused.

- Select best technology(only 1) #file:2-plan.md 

- Tôi muốn chọn node.js để thực hiện prototype cho first version và sử dụng web app cho version sau. Cập nhật lại #file:2-plan.md cho phù hợp

# Phase 3 - Development plan

## Prompt - Create git milestones
please help me breakdown and add details and create md file per step or issues from #file:2-plan.md:54-95   into doc/3-dev/phase-1/Week*/*_Task*.md based on #file:dev_implementation_template.md   and add more details base on #file:1-pdc.md 

 ## Prompt - Create issues task (Phase tasks)
- Create tasks follow folder #file:Week1 on milestones Phase 1/Week 1 on github, keep all content in markdown format

## Prompt - Create sub-issue task
Create a separate GitHub issue and files in local folder in order (remember create subfolder) for each checklist item under section #file:3_Task_predefined_categories.md:8-22 #file:3_Task_predefined_categories.md 
Use the issue template from #file:issue_template.md 
Reference parent issue #3 in each issue.
Label each issue as sub-issue.
Do not assign issues automatically.
After creating each issue, provide the issue number and link.
If a required label does not exist, create it first.
Reference to #file:1-pdc.md  #file:2-plan.md for context
Add, commit and push all files to github

---
## Prompt - Rename file in order
can you rename md files in #file:5_Task_display_expense_history in order that follows task order from #file:5_Task_display_expense_history.md:8-23 ?

### If missing issue content

can you update github issue content from #24 to #34 that matches to each file from folder 3-dev/phase-1/Week1/2_Task_cli_expense_entry, keep all markdown content from file?

## Prompt - Resolve issues
- do this task, update checklist, update current file. Update issue content on github, close issue 
- do this task following #file:issue-workflow-template.md 


-----
## Prompt - Create journal file
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



