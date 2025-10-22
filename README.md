# 🧪 AI QA Tasks for Quality Engineering 🤖

Welcome to **AI QA Tasks**! This repository provides a collection of markdown files designed to supercharge your quality assurance workflow with AI-powered IDEs and CLIs. Originally inspired by [snarktank/ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks), these tools work with any AI coding assistant including Cursor, Claude Code, Windsurf, and others.

By leveraging these structured prompts, you can systematically approach quality engineering from requirements analysis to comprehensive test automation, with built-in checkpoints for verification. Stop wrestling with ad-hoc testing approaches and start guiding your AI collaborator through structured QA processes!

## ✨ The Core QA Philosophy

Building comprehensive test coverage with AI can sometimes feel overwhelming. This workflow brings structure, clarity, and control to the QA process by:

1. **Requirements Analysis:** Converting PRDs, stories, and tickets into testable requirements
2. **Test Strategy Planning:** Creating comprehensive test plans covering all testing types
3. **Systematic Test Creation:** Generating unit, integration, API, performance, and E2E tests
4. **Coverage & Metrics:** Ensuring measurable quality gates and reporting
5. **Framework Integration:** Adapting tests to your specific tech stack and tooling

## 🎯 Workflow: From Requirements to Comprehensive Testing

Here's the step-by-step process using the `.md` files in this repository:

### 1️⃣ Create Test Requirements Document (TRD) from Requirements

Whether you have a PRD, Azure DevOps story, JIRA ticket, or other requirements, convert them into testable requirements:

```text
Use @create-trd-md.md
Here's the requirement document I want to analyze for testing: [Paste your PRD/Story/Ticket]
Tech stack: [Your stack - e.g., React, Node.js, PostgreSQL]
Current testing tools: [Your current setup - e.g., Jest, Cypress, Playwright]
```

### 2️⃣ Generate Comprehensive Test Strategy

Transform your TRD into a detailed test strategy covering all testing types:

```text
Use @generate-test-strategy-md.md with @[your-trd-file].md
Focus areas: [unit, integration, api, performance, e2e, accessibility, security]
```

### 3️⃣ Create Test Implementation Plan

Break down your test strategy into actionable tasks:

```text
Use @generate-test-tasks-md.md with @[your-test-strategy-file].md
```

### 4️⃣ Implement Tests Systematically

Execute your test plan step by step:

```text
Use @implement-test-task-md.md
Current task: [Reference specific task from your test plan]
```

### 5️⃣ Generate Test Coverage & Metrics Reports

Track and report on your testing progress:

```text
Use @generate-test-report-md.md
Test results directory: [path to your test results]
Coverage requirements: [your coverage thresholds]
```

## 📁 Repository Structure

```
/ai-qa-tasks/
├── README.md                         # This file
├── create-trd-md.md                  # Convert requirements to Test Requirements Document
├── generate-test-strategy-md.md      # Create comprehensive test strategy
├── generate-test-tasks-md.md         # Break strategy into implementation tasks
├── implement-test-task-md.md         # Execute individual test tasks
├── generate-test-report-md.md        # Create coverage and metrics reports
├── quick-start-guide.md
├── contributing-guide.md
├── examples/                         # Example outputs
│   ├── sample-trd-example.md
│   ├── sample-test-strategy.md
│   └── microservices-testing.md
├── templates/                        # Reusable templates
│   ├── api-test-template.md
│   ├── e2e-test-template.md
│   ├── performance-test-template.md
│   └── bug-report-template.md
└── docs/
    ├── best-practices.md
    ├── troubleshooting.md
    └── windsurf-setup.md
```

## 🌟 Benefits

- **Comprehensive Coverage:** Ensures all testing types are considered and planned
- **Requirements Traceability:** Links tests back to original requirements
- **Framework Agnostic:** Adapts to your specific tech stack and testing tools
- **Measurable Quality:** Built-in metrics and coverage tracking
- **Systematic Approach:** Prevents ad-hoc testing and ensures consistency
- **AI-Guided Implementation:** Step-by-step guidance for test creation
- **Documentation First:** Creates maintainable test documentation

## 🛠️ How to Use

### For Windsurf Users

Windsurf is fully supported with a comprehensive `.windsurfrules` file included in the repository!

1. **Open the project in Windsurf:** The `.windsurfrules` file is automatically detected
2. **Start using workflows:** Reference files with `@create-trd-md.md` syntax in Windsurf chat
3. **Follow guided workflows:** Windsurf will guide you through the 5-step QA process with proper conventions

For detailed setup instructions (local vs. global configuration), see [Windsurf Setup Guide](docs/windsurf-setup.md).

### For Cursor Users

1. **Clone or Download:** Get these `.md` files into your project or a central location where Cursor can access them
2. **Follow the Workflow:** Systematically use the `.md` files in Cursor's Agent chat as described in the 5-step workflow above
3. **Adapt and Iterate:** Modify the prompts to suit your specific testing needs and standards

### For Claude Code Users

#### Basic Setup

1. **Copy files to your repo:** Copy the `.md` files to a subdirectory in your project (e.g., `/ai-qa-tasks`)

2. **Reference in CLAUDE.md:** Add these lines to your project's `./CLAUDE.md` file:
   ```markdown
   # AI QA Tasks
   Use these files when I request structured QA assistance:
   /ai-qa-tasks/create-trd-md.md
   /ai-qa-tasks/generate-test-strategy-md.md
   /ai-qa-tasks/generate-test-tasks-md.md
   /ai-qa-tasks/implement-test-task-md.md
   /ai-qa-tasks/generate-test-report-md.md
   ```

#### Advanced Setup with Custom Commands

For easier access, create custom slash commands in `.claude/commands/`:

1. **Create `.claude/commands/create-trd.md`:**
   ```markdown
   Please use the structured workflow in /ai-qa-tasks/create-trd-md.md to help me create a Test Requirements Document from the provided requirements.
   ```

2. **Create `.claude/commands/generate-test-strategy.md`:**
   ```markdown
   Please generate a comprehensive test strategy using /ai-qa-tasks/generate-test-strategy-md.md
   
   If not explicitly told which TRD to use, generate a list of TRDs and ask the user to select one under `/test-artifacts` or create a new one using `create-trd.md`:
   - assume it's stored under `/test-artifacts` and has a filename starting with `[n]-trd-` (e.g., `0001-trd-checkout-flow.md`)
   - it should not already have a corresponding test strategy in `/test-artifacts` (e.g., `0001-strategy-checkout-flow.md`)
   - **always** ask the user to confirm the TRD file name before proceeding
   
   Make sure to provide options in number lists so I can respond easily (if multiple options).
   ```

3. **Create `.claude/commands/implement-tests.md`:**
   ```markdown
   Please implement tests using /ai-qa-tasks/implement-test-task-md.md
   
   Follow the task completion protocol:
   1. Run full test suite before committing
   2. Verify coverage thresholds
   3. Run linters and type checkers
   4. Use conventional commit format
   ```

4. **Restart Claude Code:** After adding these files, restart Claude Code with `/exit`

5. **Use Commands:** You can now use commands like `/create-trd`, `/generate-test-strategy`, and `/implement-tests` to quickly start workflows

#### Global vs Project Setup

- **Project-level:** Place files in your project's `.claude/` directory (recommended for project-specific workflows)
- **Global-level:** Place files in your global Claude Code configuration directory to use across all projects

For more details, see the [Claude Code documentation on memory](https://docs.anthropic.com/en/docs/claude-code/memory) and [custom slash commands](https://docs.anthropic.com/en/docs/claude-code/common-workflows#create-personal-slash-commands).

## 💡 Tips for QA Success

- **Be Specific About Requirements:** The more context you provide about your application and testing needs, the better the AI's output
- **Include Your Tech Stack:** Always specify your testing frameworks, tools, and infrastructure
- **Define Quality Gates:** Set clear coverage thresholds and quality metrics upfront
- **Iterate on Test Design:** Review and refine test approaches before implementing
- **Consider All Test Types:** Don't skip any testing layer - each serves a purpose
- **Plan for Maintenance:** Structure tests for long-term maintainability
- **Use Capable AI Models:** For best results with complex QA workflows, use advanced AI models (Cursor Pro, Claude Code with Claude 3.5 Sonnet, etc.). Free or basic models may struggle with the structured instructions and comprehensive test generation required for quality assurance work.

## 🎯 Testing Types Covered

- **Unit Tests:** Component and function-level testing
- **Integration Tests:** Module and service integration testing
- **API Tests:** REST/GraphQL endpoint testing
- **Performance Tests:** Load, stress, and performance benchmarking
- **End-to-End Tests:** Full user journey testing
- **Accessibility Tests:** WCAG compliance and usability testing
- **Security Tests:** Vulnerability and penetration testing
- **Visual Regression Tests:** UI consistency testing

## 🔧 Supported Tech Stacks & Tools

The templates and prompts are designed to work with popular testing frameworks:

**Frontend:** Jest, Vitest, React Testing Library, Vue Test Utils, Cypress, Playwright, WebdriverIO

**Backend:** Jest, Mocha, Chai, Supertest, Newman, Artillery, K6

**Mobile:** Detox, Appium, XCTest, Espresso

**API:** Postman, Insomnia, REST Assured, Karate

**Performance:** K6, Artillery, JMeter, Lighthouse

**Visual:** Percy, Chromatic, BackstopJS

## 📊 Quality Metrics & Reporting

Each workflow includes generation of:

- Test coverage reports (line, branch, function coverage)
- Test execution summaries
- Performance benchmarks
- Accessibility audit results
- Security scan reports
- Traceability matrices (requirements to tests)

## 🤝 Contributing

Got ideas to improve these QA workflows or have new testing approaches? Contributions welcome!

- Open an issue to discuss changes or suggest new testing strategies
- Submit a pull request with your enhancements
- Share examples of successful QA implementations

## 📚 Additional Resources

- [Testing Best Practices](https://testing-library.com/docs/guiding-principles/)
- [Test Pyramid Concept](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Accessibility Testing Guide](https://www.w3.org/WAI/test-evaluate/)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)

## ✅ Validation and CI

Use the local script to mirror CI checks before pushing changes.

- __Local validation (Windows/PowerShell)__

```powershell
./scripts/validate.ps1 -Strict -FailOnLinkIssues
```

- __CI workflow__: `/.github/workflows/validate.yml`
  - Markdown linting (non-blocking; honors `.markdownlint.json`)
  - Markdown link check (continues on error; uses `.github/markdown-link-check-config.json` when present)
  - Spell check via `crate-ci/typos` (uses `.github/typos.toml` when present)
  - Examples validation for code completeness in `examples/` and `templates/`
  - Repository stats generation on `main` only (`STATS.md`)

- __Config files__ (optional but supported):
  - `.markdownlint.json`
  - `.github/markdown-link-check-config.json`
  - `.github/typos.toml`

![Validate](https://github.com/MatthewEngman/ai-qa-tasks/actions/workflows/validate.yml/badge.svg)

---

*This structured approach helps ensure comprehensive test coverage, maintains quality standards, and creates a reliable foundation for continuous integration and deployment.*
