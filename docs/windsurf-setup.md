# Windsurf Setup Guide

This guide explains how to configure Windsurf to work optimally with the AI QA Tasks repository.

## What is Windsurf?

Windsurf is an AI-powered code editor that uses context from your project to provide intelligent assistance. The `.windsurfrules` file provides project-specific guidance to help Windsurf understand your repository's conventions, workflows, and best practices.

## Quick Setup

### Option 1: Local Setup (Recommended for Project-Specific Use)

Use this approach when you want the rules to apply only to this specific project.

1. **The `.windsurfrules` file is already in the repository root**
   - Located at: `/ai-qa-tasks/.windsurfrules`
   - Windsurf automatically detects and uses this file when you open the project

2. **Open the project in Windsurf**
   ```bash
   # Navigate to your project directory
   cd /path/to/ai-qa-tasks
   
   # Open in Windsurf
   windsurf .
   ```

3. **Verify the rules are active**
   - Windsurf will automatically load the `.windsurfrules` file
   - You can reference workflow files using `@filename.md` syntax
   - The AI will follow the conventions defined in the rules

### Option 2: Global Setup (For Use Across All Projects)

Use this approach if you want to use AI QA Tasks workflows across multiple projects.

1. **Copy the `.windsurfrules` file to your global Windsurf configuration**
   
   **On macOS/Linux**:
   ```bash
   # Create Windsurf config directory if it doesn't exist
   mkdir -p ~/.windsurf
   
   # Copy the rules file
   cp /path/to/ai-qa-tasks/.windsurfrules ~/.windsurf/global.windsurfrules
   ```
   
   **On Windows**:
   ```powershell
   # Create Windsurf config directory if it doesn't exist
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.windsurf"
   
   # Copy the rules file
   Copy-Item "C:\path\to\ai-qa-tasks\.windsurfrules" "$env:USERPROFILE\.windsurf\global.windsurfrules"
   ```

2. **Copy workflow files to a global location**
   ```bash
   # Create a directory for AI QA Tasks workflows
   mkdir -p ~/.ai-qa-tasks
   
   # Copy all workflow files
   cp /path/to/ai-qa-tasks/*.md ~/.ai-qa-tasks/
   cp -r /path/to/ai-qa-tasks/templates ~/.ai-qa-tasks/
   cp -r /path/to/ai-qa-tasks/examples ~/.ai-qa-tasks/
   ```

3. **Update references in your global rules file**
   - Edit `~/.windsurf/global.windsurfrules`
   - Update file paths to point to `~/.ai-qa-tasks/` instead of relative paths

## Local vs. Global: Which Should You Use?

### Use Local Setup When:
- ✅ You're contributing to the AI QA Tasks repository
- ✅ You want project-specific customizations
- ✅ You're working on a single project that uses these workflows
- ✅ You want to version control the rules with your project

### Use Global Setup When:
- ✅ You use AI QA Tasks workflows across multiple projects
- ✅ You want consistent QA guidance in all your work
- ✅ You don't want to copy files to each project
- ✅ You're using the workflows as a personal productivity tool

### Can You Use Both?
Yes! Windsurf will:
1. Load global rules first (if they exist)
2. Then load local `.windsurfrules` (if it exists)
3. Local rules take precedence over global rules for conflicts

This allows you to have:
- **Global rules**: General QA workflow guidance
- **Local rules**: Project-specific conventions and overrides

## Using the Windsurf Rules

### Basic Workflow

1. **Start a QA task in Windsurf chat**
   ```
   I need to create tests for the checkout flow feature
   ```

2. **Windsurf will guide you through the 5-step workflow**
   - Step 1: Create TRD using `@create-trd-md.md`
   - Step 2: Generate test strategy using `@generate-test-strategy-md.md`
   - Step 3: Create test tasks using `@generate-test-tasks-md.md`
   - Step 4: Implement tests using `@implement-test-task-md.md`
   - Step 5: Generate reports using `@generate-test-report-md.md`

3. **Reference workflow files directly**
   ```
   Use @create-trd-md.md to analyze this PRD: [paste requirements]
   Tech stack: React, Node.js, PostgreSQL
   Testing tools: Jest, Playwright, k6
   ```

### Advanced Usage

#### Using Templates
```
Use @api-test-template.md to create tests for the /users endpoint
Base URL: https://api.example.com/v1
Authentication: Bearer token
```

#### Referencing Examples
```
Show me an example TRD similar to @sample-trd-example.md for my payment processing feature
```

#### Custom Commands
You can create shortcuts for common workflows:
```
Create a TRD for user authentication with OAuth2 support
```

Windsurf will automatically:
- Reference the appropriate workflow file
- Ask for necessary context (tech stack, tools)
- Follow naming conventions
- Ensure traceability
- Validate completeness

## What the Rules Provide

The `.windsurfrules` file gives Windsurf context about:

### 1. Repository Structure
- Understanding of the 5-step QA workflow
- Location and purpose of workflow files, templates, and examples
- Directory organization and file placement

### 2. Naming Conventions
- Test artifact naming: `[n]-[type]-[feature-name].md`
- Workflow file patterns
- Template and example naming standards

### 3. Quality Standards
- Markdown formatting requirements
- Code example completeness (imports, structure, executability)
- Validation requirements before commits
- Commit message conventions (conventional commits)

### 4. Testing Framework Knowledge
- Supported frameworks by type (frontend, backend, mobile, performance)
- Framework selection guidance based on tech stack
- Best practices for each testing type

### 5. Workflow Guidance
- How to use each workflow file
- When to use templates vs. creating from scratch
- Traceability requirements between artifacts
- Quality gates and metrics standards

### 6. Best Practices
- Testing principles (shift-left, test pyramid, determinism)
- Common pitfalls to avoid (flaky tests, hardcoded values)
- Security and compliance considerations
- CI/CD integration patterns

## Customizing the Rules

### For Your Project

If you want to customize the rules for your specific project:

1. **Edit the local `.windsurfrules` file**
   ```bash
   # Open in your editor
   code .windsurfrules
   ```

2. **Add project-specific sections**
   ```
   ## Project-Specific Conventions
   
   ### Our Testing Standards
   - Minimum code coverage: 90% (higher than default 80%)
   - All API tests must include contract tests
   - Performance tests required for all user-facing features
   
   ### Our Tech Stack
   - Frontend: React 18 with TypeScript
   - Backend: Node.js with Express
   - Database: PostgreSQL with Prisma
   - Testing: Jest, Playwright, k6, Pact
   ```

3. **Override default conventions**
   ```
   ## Custom File Naming
   
   We use a different naming convention:
   - TRDs: `trd-[JIRA-ID]-[feature-name].md`
   - Strategies: `strategy-[JIRA-ID]-[feature-name].md`
   ```

### For Your Organization

To create organization-wide rules:

1. **Create a base rules file**
   ```bash
   # Start with the provided .windsurfrules
   cp .windsurfrules ~/organization-qa-rules.windsurfrules
   ```

2. **Add organization-specific requirements**
   - Compliance standards (HIPAA, PCI DSS, SOC 2)
   - Mandatory testing types
   - Required quality gates
   - Approved frameworks and tools

3. **Distribute to team members**
   - Share via internal documentation
   - Include in onboarding materials
   - Version control in a shared repository

## Troubleshooting

### Windsurf Not Following the Rules

**Problem**: Windsurf doesn't seem to be using the rules file.

**Solutions**:
1. Verify the file is named exactly `.windsurfrules` (note the leading dot)
2. Check the file is in the project root directory
3. Restart Windsurf after adding/modifying the rules
4. Try explicitly mentioning the rules: "Following the .windsurfrules file, create a TRD for..."

### Rules Conflicting with Project Needs

**Problem**: The default rules don't match your project's conventions.

**Solutions**:
1. Edit the `.windsurfrules` file to add project-specific overrides
2. Add a "Project-Specific Conventions" section at the top
3. Be explicit in your prompts: "Ignore the default naming convention and use..."

### Workflow Files Not Found

**Problem**: Windsurf can't find workflow files when using `@filename.md`.

**Solutions**:
1. Ensure workflow files are in the project root or specified path
2. Use full paths if files are in subdirectories: `@templates/api-test-template.md`
3. For global setup, verify files are copied to the global location
4. Check file permissions (files must be readable)

### Rules Too Verbose

**Problem**: The rules file is overwhelming or too detailed.

**Solutions**:
1. Create a simplified version for your needs
2. Remove sections that don't apply to your project
3. Focus on the core workflow and naming conventions
4. Keep framework-specific details in separate documentation

## Validation

After setting up Windsurf rules, validate they're working:

### Test 1: Basic Workflow Reference
```
Use @create-trd-md.md to help me understand what information I need to provide
```

**Expected**: Windsurf should explain the TRD creation process and ask for requirements, tech stack, and testing tools.

### Test 2: Naming Convention
```
Create a TRD filename for a user authentication feature
```

**Expected**: Windsurf should suggest: `0001-trd-user-authentication.md` (or next available number)

### Test 3: Code Example Quality
```
Show me a Jest test example following the repository standards
```

**Expected**: Windsurf should provide a complete test with imports, describe/it blocks, and Arrange-Act-Assert pattern.

### Test 4: Commit Message Format
```
Help me write a commit message for adding a new E2E test template
```

**Expected**: Windsurf should suggest conventional commit format:
```
feat(templates): add E2E test template

- Includes Playwright examples
- Covers critical user journeys
- Provides setup and teardown patterns
```

## Best Practices

### Do's
✅ Reference workflow files explicitly with `@filename.md`  
✅ Provide complete context (tech stack, tools, requirements)  
✅ Follow the 5-step workflow sequentially  
✅ Validate generated artifacts before moving to next step  
✅ Run validation scripts before committing  
✅ Use conventional commit messages  

### Don'ts
❌ Skip steps in the workflow  
❌ Leave placeholder values in generated code  
❌ Commit without running validation  
❌ Mix different naming conventions  
❌ Create incomplete code examples  
❌ Ignore traceability requirements  

## Additional Resources

- **Repository README**: Overview of AI QA Tasks system
- **Quick Start Guide**: 10-minute hands-on tutorial
- **Contributing Guide**: Standards for contributions
- **Best Practices**: Testing principles and patterns
- **Troubleshooting**: Common issues and solutions
- **Framework Guides**: Tech-stack-specific guidance

## Getting Help

If you encounter issues with Windsurf setup:

1. **Check the documentation**
   - Review this setup guide
   - Read the main README.md
   - Consult docs/troubleshooting.md

2. **Verify your setup**
   - Confirm file locations and names
   - Check file permissions
   - Restart Windsurf

3. **Ask for help**
   - Open an issue on GitHub
   - Include your setup details (local vs. global)
   - Provide examples of unexpected behavior

4. **Community support**
   - Check existing GitHub issues
   - Join discussions
   - Share your solutions

---

**Remember**: The Windsurf rules are designed to make comprehensive QA testing more accessible and consistent. They guide the AI to follow best practices while adapting to your specific project needs.
