# Contributing to AI QA Tasks

Thank you for your interest in contributing to AI QA Tasks! This repository thrives on community contributions that help improve testing workflows for teams using AI coding assistants.

## 🎯 How You Can Contribute

### 1. **Share Your Testing Workflows**
- Add framework-specific examples and templates
- Share successful prompt patterns you've discovered
- Contribute real-world case studies and examples

### 2. **Improve Documentation**
- Enhance existing workflow files with better examples
- Add clarity to instructions and usage guidelines
- Fix typos, broken links, or outdated information

### 3. **Add New Testing Categories**
- Performance testing workflows
- Security testing approaches
- Accessibility testing strategies
- Visual regression testing
- Chaos engineering practices

### 4. **Create Framework-Specific Content**
- Testing patterns for specific tech stacks
- AI prompt optimizations for different tools
- Integration examples with CI/CD platforms

## 🚀 Getting Started

### Fork and Clone
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/your-username/ai-qa-tasks.git
cd ai-qa-tasks

# Add upstream remote
git remote add upstream https://github.com/MatthewEngman/ai-qa-tasks.git
```

### Create a Branch
```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Or a documentation branch
git checkout -b docs/your-improvement
```

## 📝 Contribution Types

### Adding New Workflow Files
When creating new workflow markdown files:

1. **Follow the established pattern**:
   ```markdown
   # Workflow Title
   
   You are a [Role] who specializes in [Expertise]. Your task is to [Objective].
   
   ## Analysis Framework
   [How to analyze the input]
   
   ## Implementation Structure
   [Step-by-step approach]
   
   ## Code Examples
   [Concrete examples]
   
   ## Usage Instructions
   [How to use this workflow]
   ```

2. **Include comprehensive examples**
3. **Provide clear usage instructions**
4. **Test your workflow before submitting**

### Adding Examples
For new examples in the `/examples` directory:

1. **Use realistic scenarios** that developers commonly encounter
2. **Show complete workflows** from start to finish
3. **Include multiple tech stacks** when relevant
4. **Demonstrate best practices** in your examples

### Adding Templates
For new templates in the `/templates` directory:

1. **Create reusable patterns** that work across different contexts
2. **Include placeholder instructions** showing how to customize
3. **Provide usage examples** for each template
4. **Follow established naming conventions**

## 🎨 Style Guidelines

### Markdown Formatting
- Use clear, descriptive headers
- Include code blocks with appropriate language tags
- Use tables for structured data
- Add emojis sparingly for visual appeal
- Keep line lengths reasonable (under 120 characters)

### Code Examples
```javascript
// ✅ Good: Clear, commented, complete examples
describe('User Registration', () => {
  it('should validate email format', async () => {
    // Arrange: Set up test data
    const invalidEmail = 'not-an-email';
    
    // Act: Perform the action
    const result = validateEmail(invalidEmail);
    
    // Assert: Verify the outcome
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Invalid email format');
  });
});

// ❌ Avoid: Incomplete or unclear examples
it('test email', () => {
  expect(validateEmail('bad')).toBe(false);
});
```

### AI Prompt Guidelines
- **Be specific** about the role and expertise
- **Provide clear context** for analysis
- **Include structured output requirements**
- **Give concrete examples** of expected results
- **Add usage instructions** for the prompt

## 🧪 Testing Your Contributions

### Test Workflow Files
Before submitting new workflow files:

1. **Test with an AI assistant** (Cursor, Claude Code, etc.)
2. **Verify the output quality** meets the intended goals
3. **Check for completeness** of instructions and examples
4. **Ensure compatibility** with different tech stacks when applicable

### Test Examples and Templates
1. **Validate code examples** actually work in their intended environment
2. **Check for typos and formatting** issues
3. **Verify links and references** are correct
4. **Test with different scenarios** to ensure robustness

## 📋 Pull Request Process

### Before Submitting
- [ ] Test your changes thoroughly
- [ ] Run full test suite if applicable (`npm test`, `pytest`, etc.)
- [ ] Run linters and type checkers (`npm run lint`, `npm run type-check`)
- [ ] Update documentation if needed
- [ ] Add examples demonstrating your contribution
- [ ] Ensure your changes follow the style guidelines
- [ ] Update the README if you're adding new files
- [ ] Follow commit message conventions (see below)

### PR Description Template
```markdown
## Description
Brief description of what this PR adds or changes.

## Type of Change
- [ ] New workflow file
- [ ] Example/template addition
- [ ] Documentation improvement
- [ ] Bug fix
- [ ] Framework-specific addition

## Testing
Describe how you tested this change:
- AI assistant used: [Cursor/Claude Code/etc.]
- Framework tested: [React/Node.js/etc.]
- Scenarios tested: [List key scenarios]

## Screenshots (if applicable)
Add screenshots of generated output or workflow results.

## Additional Notes
Any additional context or considerations for reviewers.
```

### Review Process
1. **Automated checks** run on all PRs
2. **Maintainer review** for content quality and consistency
3. **Community feedback** welcome on all contributions
4. **Merge** after approval and passing checks

## 🎯 Contribution Ideas

### High-Impact Contributions
- **Real-world case studies** showing complete workflow implementations
- **Framework-specific optimizations** for popular tech stacks
- **Integration guides** for popular CI/CD platforms
- **Performance testing workflows** with modern tools
- **Security testing approaches** following current best practices

### Documentation Improvements
- **Quick start guides** for specific frameworks
- **Troubleshooting guides** for common issues
- **Video tutorials** demonstrating workflows
- **Blog posts** about successful implementations

### Template Expansions
- **Mobile testing templates** for React Native, Flutter
- **Microservices testing** approaches
- **Database testing** strategies
- **Third-party integration** testing patterns

## 🏆 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub discussions** highlighting great contributions

## 💬 Getting Help

### Questions About Contributing?
- **Open a Discussion** on GitHub for general questions
- **Create an Issue** for specific problems or suggestions
- **Join the conversation** on existing issues and PRs

### Code of Conduct
- **Be respectful** and inclusive in all interactions
- **Provide constructive feedback** when reviewing others' work
- **Focus on the work**, not the person
- **Help newcomers** get started with contributing

## 🔄 Staying Updated

```bash
# Keep your fork synchronized
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## 📊 Contribution Guidelines Checklist

Before submitting any contribution:

- [ ] **Read through existing content** to understand patterns and style
- [ ] **Test your contribution** with at least one AI assistant
- [ ] **Follow the established file structure** and naming conventions
- [ ] **Include comprehensive examples** and usage instructions
- [ ] **Write clear commit messages** describing your changes
- [ ] **Reference any related issues** in your PR description
- [ ] **Be responsive to feedback** during the review process

## 📝 Commit Message Standards

We follow conventional commit format for consistency and automated changelog generation.

### Format
```bash
<type>(<scope>): <brief description>

- Detailed change 1
- Detailed change 2
- Additional context
```

### Types
- `feat`: New feature or workflow addition
- `fix`: Bug fix or correction
- `docs`: Documentation changes
- `test`: Adding or updating test examples
- `refactor`: Code restructuring without behavior change
- `chore`: Maintenance tasks, dependencies, configuration
- `style`: Formatting, whitespace, markdown fixes

### Scopes (Examples)
- `workflow`: Changes to workflow files
- `examples`: Changes to example files
- `templates`: Changes to template files
- `docs`: Changes to documentation
- `ci`: Changes to CI/CD configuration

### Examples

**Adding new workflow:**
```bash
git commit -m "feat(workflow): add visual regression testing workflow" \
  -m "- Adds comprehensive visual testing guidance" \
  -m "- Includes Chromatic and Percy examples" \
  -m "- Provides snapshot comparison strategies"
```

**Improving documentation:**
```bash
git commit -m "docs(readme): expand Claude Code setup instructions" \
  -m "- Adds detailed custom command configuration" \
  -m "- Includes project vs global setup options" \
  -m "- Provides troubleshooting tips"
```

**Adding examples:**
```bash
git commit -m "test(examples): add microservices testing example" \
  -m "- Demonstrates contract testing with Pact" \
  -m "- Shows service mesh testing patterns" \
  -m "- Includes observability integration"
```

**Fixing issues:**
```bash
git commit -m "fix(templates): correct API test template syntax" \
  -m "- Fixes async/await usage in examples" \
  -m "- Updates import statements" \
  -m "- Resolves #123"
```

### Quality Gates Before Commit

1. **Clean up**: Remove debug code, temporary files, commented sections
2. **Stage selectively**: Only stage files related to your change
3. **Verify changes**: Review `git diff --staged` before committing
4. **Test locally**: Ensure examples work and links are valid
5. **Commit with context**: Use conventional format with detailed body

## 🌟 Types of Contributors We're Looking For

- **QA Engineers** who can share testing best practices
- **Developers** with experience in test automation
- **DevOps Engineers** who can contribute CI/CD integration examples
- **Technical Writers** who can improve documentation clarity
- **Framework Experts** who can add specific technology guidance
- **AI Enthusiasts** who can optimize prompts and workflows

Your contributions help make comprehensive testing more accessible to development teams worldwide. Every improvement, no matter how small, makes a difference!

Thank you for contributing to AI QA Tasks! 🧪✨
