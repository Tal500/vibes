# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`
**Created**: [DATE]
**Status**: Draft
**Input**: User description: "$ARGUMENTS"

## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Document Constitution Alignment (see section below)
8. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found beyond constitution alignment: ERROR "Remove tech details"
9. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no low-level APIs, component names, or code structure)
- ✅ Constitution alignment may reference required platform/tooling at a high level (e.g., "delivered as a SvelteKit 5 vibe page")
- 👥 Written for business stakeholders, not developers

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
[Describe the main user journey in plain language]

### Acceptance Scenarios
1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

### Edge Cases
- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Experience MUST [specific capability reinforcing the vibe]
- **FR-002**: Experience MUST [specific capability, e.g., "react to user input"]
- **FR-003**: Users MUST be able to [key interaction, e.g., "toggle mood settings"]
- **FR-004**: Experience MUST [data requirement, e.g., "persist vibe preferences"]
- **FR-005**: Experience MUST [behavior, e.g., "surface accessibility affordances"]

*Example of marking unclear requirements:*
- **FR-006**: Experience MUST integrate with [NEEDS CLARIFICATION: external service not specified]
- **FR-007**: Experience MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*
- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Constitution Alignment *(mandatory)*
Describe how the proposed feature upholds each core principle. Keep language outcome-focused.
- **Principle I – Vibe-Led Experience**: [How the narrative, visuals, and interactions deliver the vibe]
- **Principle II – SvelteKit 5 + TypeScript Foundation**: [Commitment to deliver via SvelteKit 5 experience without conflicting tech]
- **Principle III – Fluid Performance & Responsiveness**: [Performance expectations/business rationale]
- **Principle IV – Inclusive & Accessible Delight**: [Accessibility promises and user comfort considerations]
- **Principle V – Authentic Interactivity & Testing Discipline**: [Assurance that interactive demos and validation matter to stakeholders]

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] No implementation details beyond constitution alignment commitments
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [ ] User description parsed
- [ ] Key concepts extracted
- [ ] Ambiguities marked
- [ ] User scenarios defined
- [ ] Requirements generated
- [ ] Entities identified
- [ ] Constitution alignment documented
- [ ] Review checklist passed

---
