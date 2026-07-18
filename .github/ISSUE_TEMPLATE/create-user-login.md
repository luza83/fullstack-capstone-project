---
name: Create User Login
about: Login is required to keep track of users and actions. Login includes registration,
  validation and logout.
title: ''
labels: ''
assignees: ''

---

**As a** user
**I need** to create an account
**So that** I can list and claim household items

### Details and Assumptions

* Users must register with a unique email address.
* A password is required to create an account.

### Acceptance Criteria

```gherkin
Given I am on the registration page
When I enter valid registration details and submit the form
Then my account is created successfully and I can sign in
```
