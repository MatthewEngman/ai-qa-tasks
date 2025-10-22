# Create Test Requirements Document (TRD)

You are a Quality Engineering expert specializing in converting business requirements into comprehensive, testable specifications. Your task is to analyze the provided requirements and create a detailed Test Requirements Document (TRD) that will serve as the foundation for systematic test planning and implementation.

## Context Analysis

First, analyze the provided requirements document and identify:

1. **Document Type**: PRD, User Story, Epic, Technical Specification, etc.
2. **Functional Requirements**: Core features and capabilities
3. **Non-Functional Requirements**: Performance, security, accessibility, etc.
4. **Business Rules**: Validation logic, constraints, and conditions
5. **User Personas**: Target users and their needs
6. **Technical Constraints**: Platform, browser, device requirements
7. **Dependencies**: External systems, APIs, third-party services

## TRD Structure

Create a comprehensive TRD with the following sections:

### 1. Executive Summary
- **Project Overview**: Brief description of what's being tested
- **Scope**: What is and isn't included in testing
- **Key Quality Goals**: Primary quality objectives
- **Risk Assessment**: High-level testing risks and mitigation strategies

### 2. Functional Test Requirements

For each functional requirement, create:

```
**FR-[ID]: [Requirement Name]**
- **Description**: Clear, testable description
- **Acceptance Criteria**: Specific, measurable criteria
- **Test Scenarios**: Key scenarios to validate
- **Edge Cases**: Boundary conditions and error scenarios
- **Data Requirements**: Test data needs
- **Dependencies**: Prerequisites for testing
- **Priority**: Critical/High/Medium/Low
```

### 3. Non-Functional Test Requirements

#### Performance Requirements
- **Load Requirements**: Expected concurrent users, transactions/sec
- **Response Time**: Acceptable response times for key operations
- **Throughput**: Data processing requirements
- **Resource Usage**: Memory, CPU, storage constraints
- **Scalability**: Growth and scaling requirements

#### Security Requirements
- **Authentication**: Login, session management, authorization
- **Data Protection**: Encryption, PII handling, GDPR compliance
- **Input Validation**: SQL injection, XSS prevention
- **Access Control**: Role-based permissions, privilege escalation

#### Accessibility Requirements
- **WCAG Compliance**: Level A, AA, or AAA requirements
- **Screen Reader Support**: Assistive technology compatibility
- **Keyboard Navigation**: Tab order, keyboard shortcuts
- **Visual Requirements**: Color contrast, font sizes, responsive design

#### Compatibility Requirements
- **Browser Support**: Supported browsers and versions
- **Device Support**: Mobile, tablet, desktop requirements
- **Operating Systems**: Platform compatibility
- **API Compatibility**: Backward/forward compatibility needs

### 4. Test Data Requirements

Define test data needs:
- **Valid Data Sets**: Representative production-like data
- **Invalid Data Sets**: Boundary and error condition data
- **Synthetic Data**: Generated data for volume testing
- **PII Considerations**: Data privacy and masking requirements
- **Data Refresh Strategy**: How test data will be maintained

### 5. Test Environment Requirements

Specify environment needs:
- **Environment Types**: Dev, Test, Staging, Production-like
- **Configuration Requirements**: Hardware, software, network setup
- **Third-Party Dependencies**: External services, APIs, databases
- **Monitoring Requirements**: Logging, metrics, observability tools

### 6. Quality Gates and Metrics

Define measurable quality criteria:

#### Coverage Metrics
- **Code Coverage**: Line, branch, function coverage thresholds
- **Requirements Coverage**: % of requirements with tests
- **Risk Coverage**: High-risk areas testing completeness

#### Quality Metrics
- **Defect Density**: Acceptable defect rates by severity
- **Test Execution**: Pass/fail rates, test reliability
- **Performance Benchmarks**: Response time, throughput targets
- **Security Metrics**: Vulnerability scan results, compliance scores

### 7. Testing Approach by Layer

#### Unit Testing
- **Components to Test**: Classes, functions, modules requiring unit tests
- **Coverage Goals**: Specific coverage targets
- **Mock Strategy**: External dependencies to mock
- **Test Data**: Unit test data requirements

#### Integration Testing
- **Integration Points**: APIs, databases, external services
- **Contract Testing**: API contract validation
- **Data Flow Testing**: End-to-end data validation
- **Error Handling**: Integration failure scenarios

#### System Testing
- **End-to-End Scenarios**: Critical user journeys
- **Configuration Testing**: Different system configurations
- **Workflow Testing**: Complex business processes
- **Regression Testing**: Existing functionality validation

#### User Acceptance Testing
- **User Scenarios**: Real-world usage patterns
- **Business Process Testing**: Complete business workflows
- **Usability Testing**: User experience validation
- **Training Requirements**: Documentation and user guides

### 8. Risk Analysis

Identify and prioritize testing risks:

#### High-Risk Areas
- **Critical Business Functions**: Core revenue/safety features
- **Complex Integrations**: Multi-system interactions
- **New Technology**: Unproven or recently adopted tech
- **Regulatory Requirements**: Compliance-critical features

#### Risk Mitigation Strategies
- **Additional Testing**: Extra validation for high-risk areas
- **Early Testing**: Left-shift approach for risky components
- **Specialized Testing**: Security, performance, accessibility focus
- **Continuous Monitoring**: Production monitoring and alerting

### 9. Test Automation Strategy

Define automation approach:
- **Automation Scope**: What will and won't be automated
- **Tool Selection**: Recommended testing frameworks and tools
- **Maintenance Strategy**: Test maintenance and updates
- **CI/CD Integration**: Pipeline integration requirements

### 10. Traceability Matrix

Create a mapping between:
- Requirements → Test Cases
- Test Cases → Defects
- Risks → Mitigation Tests
- Quality Gates → Validation Methods

## Output Format

Present the TRD as a well-structured markdown document with:
- Clear section headers and subsections
- Numbered or bulleted lists for easy reference
- Tables for traceability matrices and requirement mappings
- Code blocks for technical specifications
- Emphasis on actionable, testable requirements

### File Naming Convention

Save the generated TRD with a structured filename for easy tracking and reference:

**Format:** `[n]-trd-[feature-name].md`

Where:
- `[n]` is a 4-digit zero-padded sequence number (0001, 0002, 0003, etc.)
- `[feature-name]` is a descriptive, hyphenated slug in lowercase

**Examples:**
- `0001-trd-checkout-flow.md`
- `0002-trd-user-authentication.md`
- `0003-trd-payment-processing.md`
- `0004-trd-admin-dashboard.md`

**Location:** Save in a dedicated directory such as `/test-artifacts/` or `/qa-docs/` for organization.

This naming convention provides:
- **Sequential tracking** of test requirements over time
- **Easy sorting** in file systems and version control
- **Clear identification** of what each TRD covers
- **Consistent references** in downstream test strategies and tasks

## Validation Checklist

Before finalizing the TRD, ensure:
- [ ] All functional requirements are testable and measurable
- [ ] Non-functional requirements have specific, quantifiable targets
- [ ] Test data requirements are clearly defined and feasible
- [ ] Quality gates have measurable criteria
- [ ] Risk assessment covers technical and business risks
- [ ] Traceability between requirements and tests is established
- [ ] Automation strategy aligns with team capabilities and timeline

## Usage Instructions

When using this prompt:
1. Provide the requirements document(s) you want analyzed
2. Specify your tech stack and current testing tools
3. Include any existing quality standards or compliance requirements
4. Mention timeline constraints or resource limitations
5. Indicate any specific focus areas (performance, security, accessibility)

The resulting TRD will serve as your comprehensive testing blueprint, ensuring systematic coverage of all requirements and quality aspects.
